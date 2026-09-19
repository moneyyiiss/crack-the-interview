export default {
  id: 'exceptions',
  title: 'Exception Handling',
  color: '#C2185B',
  topics: [
    {
      title: 'Exception Hierarchy: Throwable, Error, Exception',
      points: [
        'Throwable is the root of everything catchable in Java; it splits into Error and Exception.',
        'Error (OutOfMemoryError, StackOverflowError) represents serious JVM-level problems — not meant to be caught/recovered from in normal application code.',
        'Exception splits again into checked exceptions (must be declared/caught) and RuntimeException (unchecked).',
        'Catching Throwable or Error directly is almost always a code smell — you end up swallowing things like OutOfMemoryError that the application genuinely cannot recover from.',
      ],
      qa: [{ q: 'Should application code ever catch Error?', a: 'Almost never — an Error typically signals the JVM itself is in trouble (out of memory, stack overflow); catching and continuing usually just delays an inevitable crash in a more confusing way.' }],
      code: '// Throwable\n//  ├─ Error            (OutOfMemoryError, StackOverflowError) — don\'t catch these\n//  └─ Exception\n//      ├─ RuntimeException (unchecked)  — NullPointerException, ArithmeticException\n//      └─ everything else  (checked)    — IOException, SQLException',
      flow: { type: 'tree', root: 'Throwable', children: [
        { label: 'Error', sub: 'JVM-level, do not catch' },
        { label: 'Exception', sub: 'checked + RuntimeException' },
      ] },
    },
    {
      title: 'Checked vs Unchecked Exceptions',
      points: [
        'Checked exceptions (extend Exception, not RuntimeException) must be either caught or declared with throws — e.g. IOException, SQLException.',
        "Unchecked exceptions (extend RuntimeException) don't need to be declared — e.g. NullPointerException, ArrayIndexOutOfBoundsException, IllegalArgumentException.",
        'Hierarchy: Throwable → Exception / Error; Exception → RuntimeException (unchecked) + everything else (checked).',
      ],
      qa: [{ q: "Why does Java force you to handle checked exceptions but not unchecked ones?", a: "Checked exceptions represent recoverable, expected failure conditions (like a missing file) the caller should plan for; unchecked ones usually signal programming bugs that shouldn't need boilerplate everywhere." }],
      code: '// Checked — must be declared or caught (compiler enforces it): IOException, SQLException\nvoid readFile() throws IOException {\n    Files.readAllLines(Path.of("data.txt"));\n}\n\n// Unchecked — RuntimeException & subclasses, compiler doesn\'t force handling\nvoid divide(int a, int b) {\n    System.out.println(a / b);   // may throw ArithmeticException, uncaught is fine to compile\n}',
      flow: { type: 'compare', columns: [
        { title: 'Checked', points: ['Compiler-enforced', 'Must catch or declare', 'IOException, SQLException'] },
        { title: 'Unchecked', points: ['Not enforced', 'Usually a bug', 'NPE, ArithmeticException'] },
      ] },
    },
    {
      title: 'throw vs throws & Exception Propagation',
      points: [
        'throw is a statement that actually raises a specific exception instance: throw new IllegalArgumentException("bad input");',
        'throws is a method-signature declaration listing checked exceptions that method might propagate to its caller: void read() throws IOException.',
        'When an exception is thrown and not caught in the current method, it propagates up the call stack to the caller, and further up, until some method catches it or it reaches main() and crashes the program (printing the stack trace).',
        'A method can declare throws for multiple exceptions, comma-separated; a caller must then catch or re-declare each checked one.',
        'Propagation unwinds the stack — any finally blocks along the way still run before the exception continues upward.',
      ],
      qa: [{ q: 'If method A calls B calls C, and C throws a checked exception that neither B nor C catches, what happens?', a: "It propagates from C up to B (B must declare throws or the code won't compile), then from B up to A the same way, and if A doesn't catch it either, it propagates out of main() and the JVM prints the stack trace and terminates that thread." }],
      code: 'void c() throws IOException {\n    throw new IOException("disk error");   // throw = actually raising it\n}\nvoid b() throws IOException {           // throws = declaring it might propagate\n    c();\n}\nvoid a() {\n    try {\n        b();\n    } catch (IOException e) {\n        System.out.println("caught at the top: " + e.getMessage());\n    }\n}',
      flow: { type: 'pipeline', steps: ['c() throws it', 'propagates to b()', 'propagates to a()', 'caught in try/catch'] },
    },
    {
      title: 'try-catch-finally & try-with-resources',
      points: [
        'finally always runs — even if the try or catch block returns or throws — except if the JVM exits (System.exit()) or crashes.',
        'Multiple catch blocks are checked top to bottom — put more specific exception types before more general ones, or it won\'t compile.',
        "try-with-resources (Java 7+) auto-closes any resource implementing AutoCloseable, even if an exception occurs — no manual finally { close() } needed.",
        'Multi-catch: catch (IOException | SQLException e) handles either type in one block.',
        "If both try and finally throw, the exception from finally 'wins' and suppresses the original — a common gotcha.",
      ],
      qa: [{ q: 'What happens if finally has a return statement?', a: 'It overrides any return/exception from the try or catch block — generally considered bad practice because it silently swallows the original result.' }],
      code: 'try (BufferedReader br = new BufferedReader(new FileReader("f.txt"))) {\n    System.out.println(br.readLine());\n} catch (IOException e) {\n    System.out.println("failed: " + e.getMessage());\n} finally {\n    System.out.println("always runs — cleanup goes here");\n}\n// try-with-resources auto-closes br (AutoCloseable) even if an exception is thrown',
      flow: { type: 'pipeline', steps: ['try block', 'exception? -> catch', 'finally (always)', 'continue / propagate'] },
    },
    {
      title: 'Custom Exceptions & Best Practices',
      points: [
        'Create a custom exception by extending Exception (checked) or RuntimeException (unchecked), and always provide constructors that pass the message/cause to super().',
        'Wrap and rethrow with the original cause preserved: throw new ServiceException("failed", originalException); — never swallow the original stack trace.',
        "Don't catch generic Exception/Throwable unless truly necessary — it hides bugs and makes debugging harder.",
        'Prefer specific exceptions over generic ones (IllegalArgumentException over RuntimeException) so callers can react meaningfully.',
        "Avoid using exceptions for normal control flow — they're relatively expensive and meant for exceptional situations.",
      ],
      qa: [],
      code: 'class InsufficientFundsException extends Exception {          // checked\n    public InsufficientFundsException(String msg) { super(msg); }\n}\nclass Account {\n    double balance;\n    void withdraw(double amt) throws InsufficientFundsException {\n        if (amt > balance) throw new InsufficientFundsException("Need " + amt + ", have " + balance);\n        balance -= amt;\n    }\n}\n// Best practice: extend RuntimeException for programmer errors, Exception for recoverable ones',
      flow: { type: 'tree', root: 'Exception', children: [
        { label: 'InsufficientFundsException', sub: 'checked, extends Exception' },
        { label: 'InvalidOrderException', sub: 'unchecked, extends RuntimeException' },
      ] },
    },
    {
      title: 'Exception Chaining & Custom Hierarchies',
      points: [
        'Exception chaining preserves the original cause when you wrap one exception in another: throw new ServiceException("failed", originalException); — the original is retrievable later via getCause().',
        'Design custom exception hierarchies to mirror your domain: a base ApplicationException, with subclasses like ValidationException, NotFoundException, each carrying relevant context fields.',
        "Prefer unchecked (extends RuntimeException) custom exceptions for most modern APIs — checked exceptions tend to leak implementation details up through every calling layer's throws clause.",
        "printStackTrace() prints the full chain ('Caused by: ...') so you can trace back to the original failure, not just the outer wrapper.",
        "Never catch an exception just to log it and do nothing else ('swallowing') — at minimum rethrow it or wrap it with added context.",
      ],
      qa: [{ q: 'Why wrap an exception instead of just letting the original propagate as-is?', a: 'Wrapping lets you translate a low-level exception (e.g. SQLException) into a meaningful domain-specific one (e.g. UserNotFoundException) for callers, while getCause() still preserves the original for debugging — a cleaner API without losing diagnostic detail.' }],
      code: 'try {\n    connectToDb();\n} catch (SQLException e) {\n    throw new ServiceException("DB layer failed", e);   // e becomes the "caused by"\n}\n// e.getCause() on the new exception returns the original SQLException\n// Keeps the full root-cause stack trace instead of losing it',
      flow: { type: 'pipeline', steps: ['SQLException (root cause)', 'wrapped in ServiceException', 'getCause() retrieves original'] },
    },
    {
      title: 'finally vs finalize() vs try-finally Gotchas',
      points: [
        'finally is a block tied to try/catch that always executes (barring JVM crash/exit) — used for guaranteed cleanup (closing resources, releasing locks).',
        'finalize() (deprecated since Java 9, removed for use in Java 18+) was a method the GC could call before reclaiming an object — unreliable timing, replaced by try-with-resources or the Cleaner API.',
        "A return inside try along with a return inside finally is a classic gotcha — the finally's return silently overrides the try's return value.",
        "Modifying a variable inside finally after a return was already prepared in try doesn't change an already-captured primitive return value, but can still affect a mutable object's fields since it's the same reference.",
        "try-with-resources is the modern replacement for try/finally-close() — shorter, and correctly suppresses secondary exceptions instead of masking the original.",
      ],
      qa: [{ q: 'If try returns 1 and finally returns 2, what does the method return?', a: "2 — a return statement inside finally always overrides any return (or even an uncaught exception) from the try/catch block, which is exactly why it's considered a bug-prone pattern to avoid." }],
      code: 'try {\n    return 1;\n} finally {\n    System.out.println("finally always runs, even after a return");\n}\n\n// finalize() — called by the GC before reclaiming an object, deprecated since Java 9,\n// removed in Java 18. NEVER rely on it for cleanup; use try-with-resources instead.\n\ntry { throw new RuntimeException("A"); }\nfinally { throw new RuntimeException("B"); }   // B wins — swallows A silently, a real gotcha',
      flow: { type: 'compare', columns: [
        { title: 'finally', points: ['Guaranteed cleanup block', 'Runs on return/throw/normal exit'] },
        { title: 'finalize()', points: ['Deprecated / removed', 'Unreliable GC timing', 'Never rely on it'] },
      ] },
    },
  ],
};
