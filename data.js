// Java Interview Prep — full content dataset
const CATEGORIES = [
  {
    id: "intro",
    title: "Introduction",
    color: "#2F5FDE",
    topics: [
      {
        title: "What is Java",
        points: [
          "Java is a class-based, object-oriented, platform-independent language — source compiles to bytecode (.class), which the JVM runs on any OS.",
          "“Write once, run anywhere”: the same .class file runs on Windows, Linux, macOS as long as a JVM is installed there.",
          "Statically typed and compiled (unlike Python/JS) — many errors are caught before the program ever runs.",
          "Automatic memory management via garbage collection — no manual malloc/free like C/C++.",
          "Widely used for backend/enterprise systems, Android apps, and large-scale distributed systems.",
        ],
        qa: [
          { q: "Is Java 100% platform-independent?", a: "The JVM itself is platform-specific (a different JVM binary per OS); the bytecode it runs is what's portable." },
          { q: "Is Java compiled or interpreted?", a: "Both — javac compiles source to bytecode, then the JVM interprets/JIT-compiles that bytecode at runtime." },
        ],
      },
      {
        title: "JDK, JRE & JVM",
        points: [
          "JVM (Java Virtual Machine) — runs the bytecode; provides memory management, garbage collection, security.",
          "JRE (Java Runtime Environment) — JVM + core libraries; enough to run Java programs, not to compile them.",
          "JDK (Java Development Kit) — JRE + compiler (javac), debugger, and dev tools; needed to write and build Java programs.",
          "Relationship: JDK ⊃ JRE ⊃ JVM.",
          "Since Java 9, JRE isn't shipped separately by default — you install a JDK even just to run programs.",
        ],
        qa: [
          { q: "Can you run a .class file with only a JRE?", a: "Yes, JRE is sufficient to run compiled bytecode; you need the JDK only to compile source." },
        ],
      },
      {
        title: "How Java Code Runs",
        points: [
          "javac MyClass.java → produces MyClass.class (bytecode).",
          "java MyClass → JVM's class loader loads the class, bytecode verifier checks it's safe, then the interpreter/JIT executes it.",
          "JIT (Just-In-Time) compiler converts hot bytecode paths into native machine code at runtime for speed.",
          "main() method signature must be exactly: public static void main(String[] args) — this is the JVM's fixed entry point.",
        ],
        qa: [
          { q: "Why must main be static?", a: "So the JVM can call it without first creating an object of the class." },
        ],
      },
    ],
  },
  {
    id: "basics",
    title: "Java Basics",
    color: "#0E8F6E",
    topics: [
      {
        title: "Data Types & Variables",
        points: [
          "8 primitive types: byte, short, int, long, float, double, char, boolean — stored directly, not as objects.",
          "int is 4 bytes, long is 8 bytes, double is 8 bytes (default for decimals), float needs an 'f' suffix (3.14f).",
          "Everything else (String, arrays, custom classes) is a reference type — the variable holds a memory address, not the value itself.",
          "Default values: 0 / 0.0 / false / '\\u0000' for fields (not for local variables — those must be explicitly initialized).",
          "final variable = assign-once constant; convention is ALL_CAPS for static final constants.",
        ],
        qa: [
          { q: "Why does a local variable give a compile error if unused before initializing?", a: "Java requires definite assignment for locals — unlike fields, they get no default value, so the compiler forces you to set them first." },
        ],
      },
      {
        title: "Operators",
        points: [
          "== compares primitives by value, but compares objects by reference (memory address), not content.",
          "Integer division truncates: 7 / 2 == 3; use 7 / 2.0 or cast to get 3.5.",
          "&& and || short-circuit (skip the right side if the result is already known); & and | always evaluate both sides.",
          "instanceof checks runtime type and safely handles null (returns false, never throws).",
          "Ternary a ? b : c is an expression, not a statement — useful for compact assignments.",
        ],
        qa: [
          { q: "Why does 'abc' == new String(\"abc\") return false?", a: "== compares references; new String(...) always creates a new object on the heap, separate from the interned literal." },
        ],
      },
      {
        title: "Control Flow",
        points: [
          "if/else, for, while, do-while behave like C; do-while always runs the body at least once.",
          "Enhanced for-loop (for (Type x : collection)) can't modify the collection's structure while iterating — throws ConcurrentModificationException.",
          "switch supports int, String (since Java 7), and enum; falls through to the next case unless you add break.",
          "Modern switch expressions (Java 14+) use arrow syntax (case X -> ...) and don't fall through by default.",
          "break exits the nearest loop/switch; continue skips to the next iteration; labeled break/continue can target an outer loop.",
        ],
        qa: [
          { q: "What happens if you forget break in a classic switch?", a: "Execution 'falls through' into the next case's code until it hits a break or the switch ends." },
        ],
      },
      {
        title: "Arrays",
        points: [
          "Fixed size once created; declared as int[] arr = new int[5]; or int[] arr = {1,2,3};",
          "Arrays are objects — arr.length is a field (no parentheses), unlike String's length().",
          "Multi-dimensional arrays are really arrays of arrays: int[][] grid = new int[3][4];",
          "Arrays.sort(), Arrays.toString(), Arrays.equals() are common helper methods from java.util.Arrays.",
          "Array covariance: Object[] arr = new String[3]; compiles, but storing a non-String into it throws ArrayStoreException at runtime.",
        ],
        qa: [
          { q: "Why can't you resize an array?", a: "An array's length is fixed at creation and baked into its memory allocation; to 'resize' you copy elements into a new, larger array." },
        ],
      },
      {
        title: "Wrapper Classes & Autoboxing",
        points: [
          "Each primitive has a wrapper class: int→Integer, char→Character, boolean→Boolean, etc.",
          "Autoboxing/unboxing: the compiler automatically converts int ↔ Integer where needed.",
          "Integer caches values -128 to 127 — Integer a = 100; Integer b = 100; gives a == b true, but 200 gives false (different objects).",
          "Unboxing a null wrapper (Integer x = null; int y = x;) throws NullPointerException.",
          "Wrapper classes are immutable, like String.",
        ],
        qa: [
          { q: "Why does Integer.valueOf(100) == Integer.valueOf(100) return true but valueOf(200) doesn't?", a: "The Integer cache (-128 to 127) reuses cached objects; outside that range, each valueOf() call creates a fresh object." },
        ],
      },
    ],
  },
  {
    id: "oop",
    title: "OOP in Java",
    color: "#B5451B",
    topics: [
      {
        title: "Classes & Objects",
        points: [
          "A class is a blueprint; an object is an instance created with new, living on the heap.",
          "Fields hold state, methods define behavior; a constructor initializes a new object.",
          "Objects are accessed via references — assigning obj2 = obj1 copies the reference, not the object.",
          "The this keyword refers to the current object — used to disambiguate fields from parameters of the same name.",
        ],
        qa: [],
      },
      {
        title: "The Four Pillars",
        points: [
          "Encapsulation — bundling data with the methods that operate on it, hiding internal state behind private fields + public getters/setters.",
          "Inheritance — a subclass (extends) reuses and extends a superclass's fields/methods.",
          "Polymorphism — one interface, many implementations; achieved via method overriding (runtime) and overloading (compile-time).",
          "Abstraction — exposing only essential behavior via abstract classes/interfaces, hiding implementation details.",
        ],
        qa: [
          { q: "Give a one-line example of each pillar.", a: "Encapsulation: private balance with getBalance(). Inheritance: class Dog extends Animal. Polymorphism: Animal a = new Dog(); a.sound(); calls Dog's version. Abstraction: an interface Shape with area() that each shape implements differently." },
        ],
      },
      {
        title: "Constructors",
        points: [
          "Same name as the class, no return type; called automatically when you use new.",
          "If you write no constructor, Java provides a no-arg default constructor for free — but only if you define zero constructors of your own.",
          "Constructor overloading — multiple constructors with different parameter lists.",
          "this(...) calls another constructor in the same class; super(...) calls the parent's constructor — either must be the first line if used.",
          "Constructors are not inherited by subclasses.",
        ],
        qa: [
          { q: "If you define a parameterized constructor, does the no-arg constructor still exist?", a: "No — the compiler only auto-generates the no-arg constructor when you define none yourself." },
        ],
      },
      {
        title: "this vs super",
        points: [
          "this refers to the current object; super refers to the immediate parent class.",
          "super.method() calls the parent's version of an overridden method.",
          "super() (first line of a constructor) calls the parent's constructor — added implicitly by the compiler if you don't write it.",
          "this() and super() can't both be the first statement — you can only use one of them per constructor.",
        ],
        qa: [],
      },
      {
        title: "Overloading vs Overriding",
        points: [
          "Overloading — same method name, different parameter list, same class; resolved at compile time (static/early binding).",
          "Overriding — subclass redefines a parent's method with the same signature; resolved at runtime based on the actual object type (dynamic/late binding).",
          "Overriding rules: same signature, covariant return type allowed, access modifier can't be more restrictive, can't override a static or final method.",
          "@Override annotation isn't mandatory but catches mistakes at compile time (e.g. a typo'd method name that would otherwise just overload).",
        ],
        qa: [
          { q: "Can you overload by changing only the return type?", a: "No — the method signature (name + parameter types) must differ; return type alone isn't enough to distinguish overloads." },
        ],
      },
      {
        title: "Abstract Class vs Interface",
        points: [
          "Abstract class can have both abstract and concrete methods, constructors, and instance fields; a class can extend only one.",
          "Interface (pre-Java 8) could only have abstract methods and constants; since Java 8, it can also have default and static methods.",
          "A class can implement multiple interfaces — this is how Java achieves a form of multiple inheritance.",
          "Use abstract class when subclasses share common state/code; use interface to define a contract/capability across unrelated classes.",
          "Since Java 9, interfaces can also have private methods (helpers for default methods).",
        ],
        qa: [
          { q: "Why can't interfaces have instance fields (only constants)?", a: "Any field declared in an interface is implicitly public static final — interfaces define a contract, not shared mutable state." },
        ],
      },
      {
        title: "Static vs Instance",
        points: [
          "static members belong to the class itself — one shared copy across all objects.",
          "Instance members belong to each object separately — every object gets its own copy.",
          "static methods can't access instance (non-static) members directly, and can't use this/super.",
          "static blocks run once when the class is first loaded, before any object is created — used for one-time setup.",
          "Static methods are resolved at compile time (no runtime polymorphism) — you can't truly 'override' a static method, only hide it.",
        ],
        qa: [],
      },
      {
        title: "Access Modifiers",
        points: [
          "private — visible only within the same class.",
          "default (no modifier) — visible within the same package.",
          "protected — visible within the same package, plus subclasses (even in other packages).",
          "public — visible everywhere.",
          "Visibility from narrowest to widest: private < default < protected < public.",
        ],
        qa: [],
      },
      {
        title: "equals(), hashCode() & toString()",
        points: [
          "Default equals() (from Object) compares references, like ==; override it to compare by content/value.",
          "The contract: if a.equals(b) is true, then a.hashCode() must equal b.hashCode() — breaking this corrupts HashMap/HashSet behavior.",
          "hashCode() doesn't need to be unique per object, just consistent with equals().",
          "toString() default prints ClassName@hashCodeHex; override it for a readable representation, e.g. in logs.",
          "IDEs and Lombok's @EqualsAndHashCode / records auto-generate correct equals/hashCode pairs.",
        ],
        qa: [
          { q: "What breaks if you override equals() but not hashCode()?", a: "Two 'equal' objects can end up with different hash codes, so a HashSet/HashMap may treat them as distinct — you get duplicate entries or failed lookups." },
        ],
      },
      {
        title: "Composition vs Inheritance",
        points: [
          "Inheritance ('is-a') — a subclass extends a superclass; tightly couples the two classes.",
          "Composition ('has-a') — a class holds a reference to another class and delegates to it; more flexible, easier to change later.",
          "\"Favor composition over inheritance\" — deep inheritance hierarchies get fragile; composition lets you swap implementations at runtime.",
          "Example: instead of class ElectricCar extends Car, give Car an Engine field (composition) so the engine type can vary independently.",
        ],
        qa: [],
      },
    ],
  },
  {
    id: "strings",
    title: "Strings",
    color: "#7C3AED",
    topics: [
      {
        title: "String Immutability & the String Pool",
        points: [
          "String objects are immutable — every 'modifying' operation (concat, replace, substring) returns a new String, the original is untouched.",
          "String literals live in the String pool (part of the heap since Java 7); \"abc\" == \"abc\" is true because both point to the same pooled object.",
          "new String(\"abc\") forces a new object outside the pool, so it won't == the literal even though .equals() is true.",
          "intern() manually adds/reuses a string in the pool.",
          "Immutability makes String thread-safe by default and safe to use as a HashMap key (hash never changes).",
        ],
        qa: [
          { q: "Why is String immutable by design?", a: "Safety (can't be altered after being shared, e.g. as a HashMap key or security-sensitive value like a file path), thread-safety with no extra locking, and it enables the String pool to safely share instances." },
        ],
      },
      {
        title: "StringBuilder vs StringBuffer vs String",
        points: [
          "String — immutable; use for values that rarely change.",
          "StringBuilder — mutable, NOT thread-safe, faster; use for building strings in a loop or single-threaded code.",
          "StringBuffer — mutable, thread-safe (synchronized methods), slower; use only when multiple threads modify the same buffer.",
          "Concatenating with + in a loop is O(n²) because each + on String creates a new object; StringBuilder.append() is O(n) amortized.",
          "The compiler actually turns simple String + chains into a StringBuilder automatically, but this optimization doesn't apply inside loops.",
        ],
        qa: [
          { q: "Why is 'name = name + i' inside a loop considered bad practice?", a: "Each iteration creates a brand-new String object and discards the old one, so total work grows quadratically with iterations — use StringBuilder instead." },
        ],
      },
    ],
  },
  {
    id: "exceptions",
    title: "Exception Handling",
    color: "#C2185B",
    topics: [
      {
        title: "Checked vs Unchecked Exceptions",
        points: [
          "Checked exceptions (extend Exception, not RuntimeException) must be either caught or declared with throws — e.g. IOException, SQLException.",
          "Unchecked exceptions (extend RuntimeException) don't need to be declared — e.g. NullPointerException, ArrayIndexOutOfBoundsException, IllegalArgumentException.",
          "Error (e.g. OutOfMemoryError, StackOverflowError) represents serious JVM-level problems — not meant to be caught/recovered from.",
          "Hierarchy: Throwable → Exception / Error; Exception → RuntimeException (unchecked) + everything else (checked).",
        ],
        qa: [
          { q: "Why does Java force you to handle checked exceptions but not unchecked ones?", a: "Checked exceptions represent recoverable, expected failure conditions (like a missing file) the caller should plan for; unchecked ones usually signal programming bugs that shouldn't need boilerplate everywhere." },
        ],
      },
      {
        title: "try-catch-finally & try-with-resources",
        points: [
          "finally always runs — even if the try or catch block returns or throws — except if the JVM exits (System.exit()) or crashes.",
          "Multiple catch blocks are checked top to bottom — put more specific exception types before more general ones, or it won't compile.",
          "try-with-resources (Java 7+) auto-closes any resource implementing AutoCloseable, even if an exception occurs — no manual finally { close() } needed.",
          "Multi-catch: catch (IOException | SQLException e) handles either type in one block.",
          "If both try and finally throw, the exception from finally 'wins' and suppresses the original — a common gotcha.",
        ],
        qa: [
          { q: "What happens if finally has a return statement?", a: "It overrides any return/exception from the try or catch block — generally considered bad practice because it silently swallows the original result." },
        ],
      },
      {
        title: "Custom Exceptions & Best Practices",
        points: [
          "Create a custom exception by extending Exception (checked) or RuntimeException (unchecked), and always provide constructors that pass the message/cause to super().",
          "Wrap and rethrow with the original cause preserved: throw new ServiceException(\"failed\", originalException); — never swallow the original stack trace.",
          "Don't catch generic Exception/Throwable unless truly necessary — it hides bugs and makes debugging harder.",
          "Prefer specific exceptions over generic ones (IllegalArgumentException over RuntimeException) so callers can react meaningfully.",
          "Avoid using exceptions for normal control flow — they're relatively expensive and meant for exceptional situations.",
        ],
        qa: [],
      },
    ],
  },
  {
    id: "collections",
    title: "Collections Framework",
    color: "#1565C0",
    topics: [
      {
        title: "Collection Hierarchy Overview",
        points: [
          "Collection interface branches into List, Set, Queue; Map is separate (not a Collection — it stores key-value pairs).",
          "List — ordered, allows duplicates (ArrayList, LinkedList, Vector).",
          "Set — no duplicates (HashSet, LinkedHashSet, TreeSet).",
          "Queue/Deque — FIFO/LIFO structures (ArrayDeque, PriorityQueue, LinkedList).",
          "Map — key→value pairs, keys unique (HashMap, LinkedHashMap, TreeMap, Hashtable).",
        ],
        qa: [],
      },
      {
        title: "List Implementations",
        points: [
          "ArrayList — backed by a resizable array; O(1) get by index, O(n) insert/delete in the middle, grows by 1.5x when full.",
          "LinkedList — doubly-linked list; O(1) insert/delete at ends, O(n) get by index; implements both List and Deque.",
          "Vector — legacy, synchronized version of ArrayList (rarely used now, prefer Collections.synchronizedList or CopyOnWriteArrayList).",
          "Use ArrayList by default; use LinkedList only when you genuinely need frequent insert/remove at both ends.",
        ],
        qa: [
          { q: "Why is ArrayList generally preferred over LinkedList in practice?", a: "Contiguous array storage means better cache locality and faster random access; LinkedList's per-node overhead and pointer-chasing rarely pay off unless you specifically need cheap head/tail insertions." },
        ],
      },
      {
        title: "Set Implementations",
        points: [
          "HashSet — backed by a HashMap internally; O(1) average add/contains, no ordering guarantee.",
          "LinkedHashSet — HashSet + a linked list to preserve insertion order.",
          "TreeSet — backed by a Red-Black tree (TreeMap internally); keeps elements sorted, O(log n) operations.",
          "Sets rely on equals()/hashCode() (or compareTo() for TreeSet) to detect duplicates.",
        ],
        qa: [],
      },
      {
        title: "Map Implementations",
        points: [
          "HashMap — array of buckets + linked list/tree per bucket; O(1) average get/put, allows one null key.",
          "LinkedHashMap — HashMap + predictable iteration order (insertion order, or access order if configured — useful for LRU caches).",
          "TreeMap — Red-Black tree, keeps keys sorted, O(log n) operations, no null keys.",
          "Hashtable — legacy, synchronized, no null keys/values (mostly replaced by ConcurrentHashMap).",
          "Since Java 8, a HashMap bucket converts from a linked list to a tree when it gets too long (8+ entries), improving worst-case lookup from O(n) to O(log n).",
        ],
        qa: [
          { q: "How does HashMap resolve collisions?", a: "By chaining — each bucket holds a linked list (or, since Java 8, a balanced tree once a bucket gets long) of entries that hashed to the same index." },
        ],
      },
      {
        title: "Comparable vs Comparator",
        points: [
          "Comparable — implemented by the class itself; defines the 'natural ordering' via compareTo(); only one per class.",
          "Comparator — a separate object implementing compare(a, b); lets you define multiple, external sorting strategies without touching the class.",
          "Collections.sort(list) uses Comparable by default; Collections.sort(list, comparator) or list.sort(comparator) uses a custom Comparator.",
          "Since Java 8, chain comparators easily: Comparator.comparing(Person::getAge).thenComparing(Person::getName).",
        ],
        qa: [
          { q: "When would you use Comparator instead of Comparable?", a: "When you need multiple different sort orders for the same class, or when you can't modify the class's source (e.g. it's from a third-party library)." },
        ],
      },
      {
        title: "Fail-Fast vs Fail-Safe Iterators",
        points: [
          "Fail-fast (ArrayList, HashMap, etc.) — throws ConcurrentModificationException if the collection is structurally modified while iterating (except via the iterator's own remove()).",
          "Fail-safe (CopyOnWriteArrayList, ConcurrentHashMap) — iterates over a snapshot/clone, so concurrent modification doesn't throw, but the iterator may not reflect the very latest changes.",
          "Fail-fast detection uses an internal modCount counter checked on each next() call — it's a best-effort safety net, not a hard guarantee.",
          "To safely remove elements while iterating a normal list, use Iterator.remove() or removeIf(), not list.remove() inside a for-each.",
        ],
        qa: [],
      },
    ],
  },
  {
    id: "concurrency",
    title: "Multithreading & Concurrency",
    color: "#EF6C00",
    topics: [
      {
        title: "Thread Basics & Lifecycle",
        points: [
          "Create a thread by extending Thread (override run()) or, preferably, implementing Runnable and passing it to a Thread (avoids single-inheritance limits).",
          "Calling start() creates a new OS-backed thread and eventually runs run(); calling run() directly just executes it on the current thread — no concurrency.",
          "Lifecycle states: NEW → RUNNABLE → (BLOCKED / WAITING / TIMED_WAITING) → TERMINATED.",
          "join() makes the calling thread wait until the target thread finishes.",
          "Thread.sleep() pauses the current thread without releasing any locks it holds.",
        ],
        qa: [
          { q: "What happens if you call run() instead of start()?", a: "It just runs as a normal method call on the current thread — no new thread is spawned, so there's no concurrency benefit." },
        ],
      },
      {
        title: "synchronized & Locks",
        points: [
          "synchronized method/block ensures only one thread can execute that critical section on a given object/lock at a time — prevents race conditions.",
          "Every object has an intrinsic lock (monitor); synchronized(obj) { ... } acquires obj's lock for the block's duration.",
          "ReentrantLock (java.util.concurrent.locks) offers more control — tryLock(), fair ordering, interruptible waits — but you must explicitly unlock() in a finally block.",
          "'Reentrant' means the same thread can re-acquire a lock it already holds without deadlocking itself.",
          "Deadlock happens when two threads each hold a lock the other needs — avoid by always acquiring multiple locks in the same global order.",
        ],
        qa: [
          { q: "What's a race condition?", a: "When multiple threads access shared mutable state without proper synchronization, and the final result depends on unpredictable timing/interleaving of their operations." },
        ],
      },
      {
        title: "wait/notify vs the Executor Framework",
        points: [
          "wait()/notify()/notifyAll() are low-level, must be called inside a synchronized block on the same object, and are easy to get wrong (spurious wakeups, missed signals).",
          "ExecutorService (from java.util.concurrent) manages a pool of reusable threads — submit tasks via submit()/execute() instead of manually creating Thread objects.",
          "Executors.newFixedThreadPool(n), newCachedThreadPool(), newSingleThreadExecutor() are common factory methods; always call shutdown() when done.",
          "Future<T> represents a pending result from submit(); call get() to block and retrieve it (or a timeout-based get(timeout, unit)).",
          "In modern code, prefer the Executor framework (or higher-level constructs like CompletableFuture) over raw wait/notify.",
        ],
        qa: [],
      },
      {
        title: "volatile & Atomic Classes",
        points: [
          "volatile guarantees visibility — writes by one thread are immediately visible to others — but does NOT guarantee atomicity of compound operations like count++.",
          "AtomicInteger, AtomicLong, etc. (java.util.concurrent.atomic) provide lock-free, thread-safe compound operations (incrementAndGet(), compareAndSet()) using CAS (compare-and-swap).",
          "Use volatile for simple flags (e.g. a boolean 'running' checked by multiple threads); use Atomic classes for counters updated concurrently.",
          "CAS (compare-and-swap) is a CPU-level instruction: atomically updates a value only if it still matches an expected old value.",
        ],
        qa: [
          { q: "Why isn't 'volatile int count; count++;' thread-safe?", a: "count++ is really read-modify-write (three separate steps); volatile only makes each individual read/write visible across threads, it doesn't make the whole sequence atomic — two threads can interleave and lose an update." },
        ],
      },
      {
        title: "Common Concurrency Interview Traps",
        points: [
          "ArrayList vs Vector vs CopyOnWriteArrayList — only the last two are thread-safe, and CopyOnWriteArrayList is optimized for many reads/few writes.",
          "HashMap vs Hashtable vs ConcurrentHashMap — HashMap isn't thread-safe, Hashtable is fully synchronized (slow), ConcurrentHashMap uses fine-grained locking for much better concurrent throughput.",
          "'synchronized' on a static method locks the Class object, not an instance — different from synchronizing an instance method.",
          "Thread pool sizing: CPU-bound tasks ≈ number of cores; I/O-bound tasks can use many more threads since they spend time waiting.",
        ],
        qa: [],
      },
    ],
  },
  {
    id: "generics",
    title: "Generics",
    color: "#00897B",
    topics: [
      {
        title: "What & Why: Generics",
        points: [
          "Generics let classes, interfaces, and methods work with any reference type while enforcing type safety at compile time — e.g. List<String> only accepts Strings.",
          "Before generics (pre-Java 5), collections stored plain Object, so you had to manually cast on retrieval — and a wrong cast only failed at runtime with ClassCastException.",
          "Type parameters use conventional single-letter names: T (Type), E (Element), K/V (Key/Value), R (Result).",
          "Generics eliminate explicit casting and catch type-mismatch bugs at compile time instead of runtime.",
          "You cannot use primitive types as type arguments (List<int> is invalid) — use the wrapper class instead (List<Integer>).",
        ],
        qa: [
          { q: "What problem do generics solve that existed before Java 5?", a: "Unsafe casting: collections held raw Objects, so retrieving an element required a manual cast that could throw ClassCastException at runtime if the wrong type had been inserted somewhere. Generics catch that mismatch at compile time instead." },
        ],
      },
      {
        title: "Generic Classes & Methods",
        points: [
          "Generic class: class Box<T> { T value; T get() { return value; } } — T is replaced with a real type when you use Box<String>.",
          "You can have multiple type parameters: class Pair<K, V> { K key; V value; }",
          "Generic method: declare the type parameter before the return type — public <T> T firstOf(List<T> list) { return list.get(0); }",
          "A generic method's type parameter is independent of any class-level type parameter, and can be inferred from the arguments at the call site.",
          "Since Java 7, the diamond operator <> lets you skip repeating the type on the right: Map<String, List<Integer>> m = new HashMap<>();",
        ],
        qa: [],
      },
      {
        title: "Bounded Types & Wildcards",
        points: [
          "Bounded type parameter: <T extends Number> restricts T to Number or its subclasses — lets you call Number methods like doubleValue() on T.",
          "Upper-bounded wildcard: List<? extends Number> — can read Numbers out, but can't safely add anything (except null) since the exact subtype is unknown.",
          "Lower-bounded wildcard: List<? super Integer> — can safely add Integers in, but reading gives you only Object back.",
          "PECS mnemonic: Producer Extends, Consumer Super — use extends when you're only reading from a structure, super when you're only writing to it.",
          "Unbounded wildcard List<?> means 'a list of some unknown type' — useful when you only need methods that don't depend on the type, like size().",
        ],
        qa: [
          { q: "Why can't you add an element to a List<? extends Number>?", a: "The compiler only knows it's 'some subtype of Number' but not which one — adding an Integer to a list that's actually a List<Double> would be unsafe, so the compiler disallows all adds except null." },
        ],
      },
      {
        title: "Type Erasure",
        points: [
          "Generics are a compile-time-only feature — the compiler erases type parameters after checking, replacing T with Object (or its bound) in the compiled bytecode.",
          "This is why you can't do new T[10], new T(), or T.class inside a generic class — there's no runtime type information about T left to work with.",
          "It's also why you can't overload methods that differ only by generic type: process(List<String>) and process(List<Integer>) collide after erasure into the same process(List) signature.",
          "Type erasure exists for backward compatibility — it let generics be added in Java 5 without breaking older, non-generic bytecode.",
          "instanceof can't check a parameterized type at runtime (list instanceof List<String> is illegal) — only the raw type (list instanceof List) is checkable.",
        ],
        qa: [
          { q: "Why can't you create a generic array like new T[10]?", a: "After type erasure, the JVM has no idea what T actually was at runtime, so it can't safely allocate an array of the right component type or enforce ArrayStoreException checks — the language simply disallows it." },
        ],
      },
      {
        title: "Generics with Collections & Common Questions",
        points: [
          "List<String> list = new ArrayList<>(); — the compiler enforces at every add() call that only Strings go in, so no runtime cast is ever needed on get().",
          "Raw types (List list = new ArrayList();, no <>) still compile for legacy compatibility but generate unchecked warnings and lose all type safety.",
          "Generic classes can also be bounded by multiple interfaces: <T extends Comparable<T> & Serializable>.",
          "Static members of a generic class cannot use the class's type parameter, because static members exist independently of any particular T.",
        ],
        qa: [
          { q: "Why can't a static method use its class's type parameter T directly?", a: "Static members belong to the class itself, not to any specific parameterized instance (Box<String> vs Box<Integer>) — since T only gets a concrete value when an instance is created, a static context has no T to refer to." },
        ],
      },
    ],
  },
  {
    id: "io",
    title: "File Handling & I/O",
    color: "#5D4037",
    topics: [
      {
        title: "java.io Basics: Streams & Readers/Writers",
        points: [
          "Byte streams (InputStream/OutputStream) handle raw binary data — e.g. FileInputStream, FileOutputStream — used for images, audio, any non-text file.",
          "Character streams (Reader/Writer) handle text with proper encoding — e.g. FileReader, FileWriter — avoid these for anything but plain text.",
          "Buffered wrappers (BufferedReader, BufferedWriter, BufferedInputStream) reduce the number of actual disk I/O calls by batching reads/writes — always wrap raw streams with these for performance.",
          "BufferedReader.readLine() reads one line of text at a time (without the newline) — the standard way to read a text file line by line.",
          "Always close streams (or use try-with-resources) — an unclosed stream leaks a file handle / OS resource.",
        ],
        qa: [
          { q: "When would you use a byte stream instead of a character stream?", a: "For any non-text file (images, audio, serialized binary data) — character streams apply text encoding/decoding, which would corrupt raw binary data." },
        ],
      },
      {
        title: "Reading & Writing Files: Common Patterns",
        points: [
          "Modern, simple approach: Files.readAllLines(Path.of(\"file.txt\")) or Files.readString(path) for whole-file text reads (java.nio.file).",
          "Files.write(path, lines) or Files.writeString(path, content) for simple whole-file writes.",
          "try-with-resources is the standard pattern for streams: try (BufferedReader br = new BufferedReader(new FileReader(\"f.txt\"))) { ... } — auto-closes even on exception.",
          "For huge files, prefer streaming (Files.lines(path), which returns a lazy Stream<String>) over loading everything into memory with readAllLines.",
          "Reading a file that doesn't exist throws FileNotFoundException (a checked exception) — must be caught or declared.",
        ],
        qa: [],
      },
      {
        title: "java.nio & the Files/Path API",
        points: [
          "java.nio.file (since Java 7, the 'NIO.2' API) replaced much of the older java.io.File with a cleaner Path + Files combination.",
          "Path.of(\"folder\", \"file.txt\") (or Paths.get(...)) builds a path in an OS-independent way.",
          "Files provides static utility methods: exists(), createFile(), delete(), copy(), move(), size(), and more — no need to instantiate anything.",
          "Files.walk(path) / Files.list(path) let you traverse a directory tree as a Stream<Path>.",
          "NIO also supports non-blocking channel-based I/O (FileChannel, Selector) for high-throughput scenarios — rarely needed outside frameworks.",
        ],
        qa: [
          { q: "What's the main advantage of java.nio.file.Files over the older java.io.File?", a: "File's methods return booleans on failure with little detail (e.g. delete() just returns false); Files throws specific, informative exceptions, and offers a richer, more consistent API (symbolic links, file attributes, streaming directory walks)." },
        ],
      },
      {
        title: "Serialization",
        points: [
          "Serialization converts an object into a byte stream (to save to a file, send over a network, or cache) via ObjectOutputStream.writeObject().",
          "The class must implement the marker interface Serializable (no methods to implement — it just signals intent to the JVM).",
          "transient fields are skipped during serialization (e.g. for passwords, or derived/cacheable data that shouldn't be persisted).",
          "serialVersionUID (a static final long) lets the JVM verify a serialized object's class version matches the one currently loaded — mismatches throw InvalidClassException on deserialization.",
          "Deserializing untrusted data is a well-known security risk — never deserialize input from an untrusted source without safeguards.",
        ],
        qa: [
          { q: "What happens if a field is marked transient?", a: "It's skipped during serialization and comes back as the type's default value (null, 0, false, etc.) after deserialization — used for sensitive or non-persistable data." },
        ],
      },
      {
        title: "Common I/O Interview Questions",
        points: [
          "Difference between FileReader and BufferedReader — FileReader reads raw characters directly (slow, many small reads); BufferedReader wraps it to batch reads and adds readLine().",
          "Difference between File and Path/Files — File is the legacy, more limited API; Path + Files (NIO.2) is the modern recommended approach with better error handling.",
          "How to read a file line by line efficiently — wrap in a BufferedReader, loop with readLine() until it returns null, or use Files.lines() for a lazy Stream.",
          "Why try-with-resources is preferred over manual close() in finally — it's more concise, closes resources in reverse order automatically, and correctly propagates the original exception even if close() itself also throws.",
        ],
        qa: [],
      },
    ],
  },
  {
    id: "jvm",
    title: "JVM & Memory Management",
    color: "#455A64",
    topics: [
      {
        title: "JVM Architecture",
        points: [
          "Class Loader Subsystem — loads, links (verify/prepare/resolve), and initializes .class files into memory.",
          "Runtime Data Areas — Method Area, Heap, Stack (one per thread), PC Registers, Native Method Stack.",
          "Execution Engine — interpreter + JIT compiler that actually run the bytecode; includes the Garbage Collector.",
          "Native Interface (JNI) — lets Java code call native (C/C++) libraries when needed.",
          "The JVM specification is fixed; the actual implementation (HotSpot, OpenJ9, GraalVM) can differ in performance characteristics.",
        ],
        qa: [],
      },
      {
        title: "Memory Areas: Heap, Stack & Metaspace",
        points: [
          "Heap — shared across all threads; stores all objects and arrays; this is what the Garbage Collector manages.",
          "Stack — one per thread; stores method call frames, local variables, and partial results; a variable here holds primitives directly or object references (the object itself is still on the heap).",
          "Metaspace (replaced PermGen since Java 8) — stores class metadata (method bytecode, field/method info); grows automatically off native memory instead of a fixed max.",
          "Heap is further divided into Young Generation (Eden + two Survivor spaces) and Old Generation — new objects start in Eden and get promoted to Old Gen if they survive enough GC cycles.",
          "StackOverflowError happens when a thread's stack runs out of space — commonly from uncontrolled/infinite recursion.",
        ],
        qa: [
          { q: "Where does a local Object variable's reference live vs the object itself?", a: "The reference (the pointer/address) lives on the stack frame of the method that declared it; the actual object it points to always lives on the heap." },
        ],
      },
      {
        title: "Garbage Collection Basics",
        points: [
          "GC automatically reclaims memory occupied by objects no longer reachable from any live reference (the 'root set': stack variables, static fields, etc.).",
          "Generational hypothesis: most objects die young — so GC focuses more effort on the small, fast-collected Young Generation than the larger Old Generation.",
          "Minor GC cleans the Young Generation (fast, frequent); Major/Full GC cleans the Old Generation (slower, less frequent, causes longer pauses).",
          "You can't force GC to run — System.gc() is only a hint/suggestion to the JVM, not a guarantee.",
          "finalize() (deprecated since Java 9) used to run before an object was collected — modern code should use try-with-resources / Cleaner instead.",
        ],
        qa: [
          { q: "Why does GC focus so much on the Young Generation?", a: "Empirically, most objects are short-lived (loop variables, temporary objects); collecting a small region frequently is far cheaper than scanning the whole heap, so the generational approach optimizes for the common case." },
        ],
      },
      {
        title: "GC Algorithms & Common Questions",
        points: [
          "Serial GC — single-threaded, simplest, good for small apps/single-core environments.",
          "Parallel GC — multiple threads for collection, focuses on throughput; was the default in older Java versions.",
          "G1 (Garbage First) — default since Java 9; splits the heap into regions, aims to meet a target pause-time goal while balancing throughput.",
          "ZGC / Shenandoah — very low-pause (sub-millisecond) collectors designed for huge heaps, available in modern JDKs.",
          "Memory leak in Java — even with GC, objects can 'leak' if something (e.g. a static collection, an unclosed listener) keeps holding a reference to objects that are logically no longer needed.",
        ],
        qa: [
          { q: "Can a Java program have a memory leak even with automatic garbage collection?", a: "Yes — GC only reclaims objects that are unreachable. If a live reference (e.g. in a static list, cache, or forgotten listener) keeps pointing to an object you're done with, it stays reachable and is never collected, even though it's effectively dead weight." },
        ],
      },
    ],
  },
  {
    id: "java8",
    title: "Java 8+ Features",
    color: "#8E24AA",
    topics: [
      {
        title: "Lambda Expressions & Functional Interfaces",
        points: [
          "Lambda syntax: (parameters) -> expression or (parameters) -> { statements; } — a compact way to implement a functional interface inline.",
          "A functional interface has exactly one abstract method (e.g. Runnable, Comparator, or any custom @FunctionalInterface) — lambdas are shorthand for anonymous implementations of these.",
          "Built-in functional interfaces (java.util.function): Function<T,R> (takes T, returns R), Predicate<T> (takes T, returns boolean), Consumer<T> (takes T, returns nothing), Supplier<T> (takes nothing, returns T).",
          "Method references (ClassName::methodName) are an even shorter form of a lambda when it just calls one existing method, e.g. list.forEach(System.out::println).",
          "Lambdas can capture variables from the enclosing scope, but those variables must be effectively final (never reassigned after being captured).",
        ],
        qa: [
          { q: "Why must a variable captured by a lambda be effectively final?", a: "The lambda may run later or on another thread, potentially after the enclosing method has returned; capturing by value (not reference) avoids inconsistent/undefined state, so Java requires the captured variable to never change after being set." },
        ],
      },
      {
        title: "Stream API",
        points: [
          "A Stream represents a pipeline of operations over a source (collection, array, I/O) — it doesn't store data itself.",
          "Intermediate operations (filter, map, sorted, distinct) are lazy and return a new Stream — nothing actually runs until a terminal operation is called.",
          "Terminal operations (collect, forEach, reduce, count, anyMatch) trigger execution and produce a final result — a stream can only be consumed once.",
          "collect(Collectors.toList()) / toList() (Java 16+) gathers stream results back into a collection; Collectors.groupingBy() groups elements by a key function.",
          "Streams can run in parallel via parallelStream() — useful for large datasets and CPU-bound work, but adds overhead that can hurt performance on small collections.",
        ],
        qa: [
          { q: "Why can a Stream only be consumed once?", a: "A Stream models a one-shot pipeline of operations, not a reusable data structure — once a terminal operation runs, the stream is considered 'closed', and reusing it throws IllegalStateException." },
        ],
      },
      {
        title: "Optional",
        points: [
          "Optional<T> is a container that may or may not hold a non-null value — designed to make the possibility of 'no value' explicit in method signatures, instead of returning null.",
          "Create with Optional.of(value) (throws if null), Optional.ofNullable(value) (safe for possibly-null values), or Optional.empty().",
          "isPresent()/isEmpty() check for a value; get() throws if empty (avoid calling it directly); orElse(default) and orElseGet(supplier) provide safe fallbacks.",
          "map() and filter() let you chain transformations without manual null checks: opt.map(String::toUpperCase).orElse(\"NONE\").",
          "Optional is meant for return types, not fields or method parameters — using it everywhere adds unnecessary wrapping overhead.",
        ],
        qa: [
          { q: "Why is Optional recommended as a return type but discouraged as a field type?", a: "As a return type, it forces callers to explicitly handle the 'might be empty' case instead of risking a silent NullPointerException; as a field, it just adds an extra wrapper object with no such enforcement benefit, and Optional isn't Serializable." },
        ],
      },
      {
        title: "Default & Static Methods in Interfaces",
        points: [
          "default methods (Java 8+) let an interface provide a method body — existing implementing classes automatically inherit it without breaking.",
          "This was introduced specifically to let the JDK add new methods to existing interfaces (like forEach() to Collection) without breaking every class that already implemented them.",
          "static methods on an interface belong to the interface itself, not to implementing classes — called as Interface.staticMethod(), similar to a utility class method.",
          "If a class implements two interfaces with conflicting default methods of the same signature, the class must explicitly override that method to resolve the ambiguity (or it won't compile).",
        ],
        qa: [],
      },
      {
        title: "Other Modern Features (var, records, switch expressions)",
        points: [
          "var (Java 10+) — local variable type inference; the compiler infers the type from the right-hand side (var list = new ArrayList<String>();) — still statically typed, just less to type.",
          "Records (Java 16+) — a compact way to declare an immutable data-carrier class: record Point(int x, int y) {} auto-generates the constructor, getters, equals(), hashCode(), and toString().",
          "Switch expressions (Java 14+) — case L -> value; syntax that returns a value directly and doesn't fall through, unlike the classic statement form.",
          "Text blocks (Java 15+) — \"\"\"multi-line string\"\"\" for cleanly writing multi-line strings (e.g. JSON, SQL) without escape characters.",
          "Sealed classes (Java 17+) — a class/interface can restrict exactly which other classes are allowed to extend/implement it, via permits.",
        ],
        qa: [],
      },
    ],
  },
  {
    id: "interview",
    title: "Interview Practice",
    color: "#D81B60",
    topics: [
      {
        title: "Top 'Explain the Difference' Traps",
        points: [
          "== vs equals() — reference comparison vs content comparison (override equals() for value comparison).",
          "abstract class vs interface — abstract class can hold state + constructors, one per subclass; interface is a pure contract, multiple per class.",
          "ArrayList vs LinkedList — array-backed random access vs linked-list-backed cheap insert/delete at ends.",
          "final vs finally vs finalize — final locks a variable/method/class; finally always runs after try/catch; finalize() was a (deprecated) pre-GC hook.",
          "throw vs throws — throw actually raises an exception instance; throws declares that a method might raise one, in its signature.",
          "Checked vs unchecked exceptions — must-handle compile-time-enforced vs optional runtime exceptions.",
        ],
        qa: [],
      },
      {
        title: "Common Coding-Round Patterns",
        points: [
          "String/array manipulation — reverse a string, check palindrome, find duplicates, two-pointer/sliding-window problems.",
          "Collections usage — count word frequency with a HashMap, find the first non-repeating character, group anagrams with groupingBy.",
          "Recursion basics — factorial, Fibonacci, and explaining base case + recursive case clearly out loud.",
          "OOP design — model a real-world system (e.g. 'design a parking lot' or 'design a library system') with classes, relationships, and the right pillar (inheritance vs composition) applied.",
          "Be ready to explain your solution's time and space complexity (Big-O) — interviewers often care about this more than getting the syntax perfect.",
        ],
        qa: [],
      },
      {
        title: "Core Java Questions You'll Almost Certainly Get",
        points: [
          "\"What happens when you don't override hashCode() but do override equals()?\" — See OOP: equals/hashCode section; breaks HashMap/HashSet behavior.",
          "\"Why is String immutable?\" — Security, thread-safety, and enabling the String pool. (See Strings section.)",
          "\"Explain the JVM memory model.\" — Heap vs Stack vs Metaspace. (See JVM section.)",
          "\"HashMap vs ConcurrentHashMap vs Hashtable.\" — Thread-safety and locking granularity differences. (See Concurrency section.)",
          "\"What is the diamond problem, and how does Java avoid it?\" — Multiple inheritance of state is disallowed (single class inheritance); multiple inheritance of behavior via interfaces requires explicit override when default methods conflict.",
        ],
        qa: [],
      },
      {
        title: "Behavioral + Technical Mix: How to Answer Well",
        points: [
          "Structure your answer: definition first, then a short example, then a relevant gotcha/interview trap if one exists — interviewers notice when you volunteer the 'why', not just the 'what'.",
          "If you don't fully remember something, say what you do know and reason through it out loud — interviewers often care more about your thought process than a perfect memorized answer.",
          "Relate answers to real code you've written where possible ('I used ConcurrentHashMap in a caching layer because...') — concrete experience stands out over textbook definitions.",
          "For system/OOP design questions, ask clarifying questions first (scale? persistence? concurrency?) before diving into a class diagram.",
        ],
        qa: [],
      },
      {
        title: "Final Quick-Revision Cheat Sheet",
        points: [
          "JDK ⊃ JRE ⊃ JVM. Bytecode is portable, the JVM isn't.",
          "== is reference equality for objects; equals() is content equality (override with matching hashCode()).",
          "String is immutable; StringBuilder is mutable & fast; StringBuffer is mutable & thread-safe.",
          "ArrayList = fast random access; LinkedList = fast insert/delete at ends; HashMap = O(1) average, unordered; TreeMap = sorted, O(log n).",
          "Checked exceptions must be handled/declared; unchecked (RuntimeException) don't need to be.",
          "synchronized/ReentrantLock for mutual exclusion; volatile for visibility only (not atomicity); Atomic classes for lock-free atomic counters.",
          "Generics give compile-time type safety but are erased at runtime (type erasure) — no new T[], no T.class.",
          "Streams are lazy until a terminal operation runs, and can only be consumed once.",
          "Young Gen (Eden + Survivor) for new objects, Old Gen for long-lived ones; GC only reclaims unreachable objects.",
        ],
        qa: [],
      },
    ],
  },
];
