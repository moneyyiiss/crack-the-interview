const CATEGORIES = [
  {
    "id": "intro",
    "title": "Introduction",
    "color": "#2F5FDE",
    "topics": [
      {
        "title": "What is Java",
        "points": [
          "Java is a class-based, object-oriented, platform-independent language — source compiles to bytecode (.class), which the JVM runs on any OS.",
          "“Write once, run anywhere”: the same .class file runs on Windows, Linux, macOS as long as a JVM is installed there.",
          "Statically typed and compiled (unlike Python/JS) — many errors are caught before the program ever runs.",
          "Automatic memory management via garbage collection — no manual malloc/free like C/C++.",
          "Widely used for backend/enterprise systems, Android apps, and large-scale distributed systems."
        ],
        "qa": [
          {
            "q": "Is Java 100% platform-independent?",
            "a": "The JVM itself is platform-specific (a different JVM binary per OS); the bytecode it runs is what's portable."
          },
          {
            "q": "Is Java compiled or interpreted?",
            "a": "Both — javac compiles source to bytecode, then the JVM interprets/JIT-compiles that bytecode at runtime."
          }
        ],
        "code": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, Java!\");\n    }\n}\n// javac Main.java  -> compiles to Main.class (bytecode)\n// java Main         -> JVM loads & runs it, anywhere Java runs"
      },
      {
        "title": "JDK, JRE & JVM",
        "points": [
          "JVM (Java Virtual Machine) — runs the bytecode; provides memory management, garbage collection, security.",
          "JRE (Java Runtime Environment) — JVM + core libraries; enough to run Java programs, not to compile them.",
          "JDK (Java Development Kit) — JRE + compiler (javac), debugger, and dev tools; needed to write and build Java programs.",
          "Relationship: JDK ⊃ JRE ⊃ JVM.",
          "Since Java 9, JRE isn't shipped separately by default — you install a JDK even just to run programs."
        ],
        "qa": [
          {
            "q": "Can you run a .class file with only a JRE?",
            "a": "Yes, JRE is sufficient to run compiled bytecode; you need the JDK only to compile source."
          }
        ],
        "code": "// JDK  = JRE + development tools (javac, javadoc, jar, debugger)\n// JRE  = JVM + core class libraries (java.lang, java.util, ...)\n// JVM  = the engine that loads .class files and executes bytecode\n\n// You code against the JDK, ship the JRE (or a custom runtime\n// image built with jlink), and the JVM is what actually runs it."
      },
      {
        "title": "How Java Code Runs",
        "points": [
          "javac MyClass.java → produces MyClass.class (bytecode).",
          "java MyClass → JVM's class loader loads the class, bytecode verifier checks it's safe, then the interpreter/JIT executes it.",
          "JIT (Just-In-Time) compiler converts hot bytecode paths into native machine code at runtime for speed.",
          "main() method signature must be exactly: public static void main(String[] args) — this is the JVM's fixed entry point."
        ],
        "qa": [
          {
            "q": "Why must main be static?",
            "a": "So the JVM can call it without first creating an object of the class."
          }
        ],
        "code": "// 1. Source code\nclass Greeter { void hi(){ System.out.println(\"hi\"); } }\n\n// 2. javac compiles it to platform-independent bytecode\n//    -> Greeter.class\n\n// 3. JVM's class loader reads the .class file into memory\n\n// 4. Bytecode verifier checks it's safe\n\n// 5. Interpreter runs it line by line; the JIT compiler\n//    recompiles \"hot\" methods straight to native machine code"
      },
      {
        "title": "Java Editions, Versions & Release Cadence",
        "points": [
          "Three editions: Java SE (Standard Edition, the core language), Java EE / Jakarta EE (enterprise: servlets, JPA — now under the Eclipse Foundation), Java ME (Micro Edition, embedded/mobile — largely legacy today).",
          "Since Java 9, a strict 6-month release cadence: a new feature version ships every March and September, whether or not big features are ready.",
          "LTS (Long-Term Support) releases — Java 8, 11, 17, 21 — get years of vendor support; non-LTS versions are best for trying new features early, not for long-lived production systems.",
          "Java is open-sourced primarily under OpenJDK; Oracle JDK and OpenJDK builds have been functionally near-identical since Java 11.",
          "'Java version' vs 'source/target language level' — you can compile against an older language level while still running on a newer JVM, for compatibility."
        ],
        "qa": [
          {
            "q": "Why do most companies standardize on an LTS version like Java 17 rather than the latest release?",
            "a": "LTS versions get multiple years of security patches and vendor support, while non-LTS versions stop receiving updates as soon as the next release ships six months later — production systems need that longer support window."
          }
        ],
        "code": "// Naming: Java 8, 11, 17, 21 ... (the old \"1.8\" style is gone since 9)\n// LTS (Long-Term Support) releases: 8, 11, 17, 21 — safe defaults for prod\n// Non-LTS releases ship every 6 months with preview/incubator features\n\n// Checking the running version:\npublic class VersionCheck {\n    public static void main(String[] args) {\n        System.out.println(Runtime.version());       // e.g. 21.0.2\n        System.out.println(System.getProperty(\"java.version\"));\n    }\n}"
      }
    ]
  },
  {
    "id": "basics",
    "title": "Java Basics",
    "color": "#0E8F6E",
    "topics": [
      {
        "title": "Data Types & Variables",
        "points": [
          "8 primitive types: byte, short, int, long, float, double, char, boolean — stored directly, not as objects.",
          "int is 4 bytes, long is 8 bytes, double is 8 bytes (default for decimals), float needs an 'f' suffix (3.14f).",
          "Everything else (String, arrays, custom classes) is a reference type — the variable holds a memory address, not the value itself.",
          "Default values: 0 / 0.0 / false / '\\u0000' for fields (not for local variables — those must be explicitly initialized).",
          "final variable = assign-once constant; convention is ALL_CAPS for static final constants."
        ],
        "qa": [
          {
            "q": "Why does a local variable give a compile error if unused before initializing?",
            "a": "Java requires definite assignment for locals — unlike fields, they get no default value, so the compiler forces you to set them first."
          }
        ],
        "code": "int age = 27;                  // primitive — value stored directly\nlong views = 4_500_000_000L;    // 8 bytes, needs the L suffix\ndouble price = 49.99;           // default type for decimal literals\nfloat rate = 3.5f;               // needs the f suffix, or it's a double\n\nString name = \"Riya\";           // reference type — variable holds an address\nint[] scores = {90, 85, 77};    // arrays are reference types too",
        "diagram": "<div class=\"diagram-row\">\n  <div class=\"diagram-col\">\n    <div class=\"diagram-label\">Stack</div>\n    <div class=\"diagram-chip\">age = 27</div>\n    <div class=\"diagram-chip\">name = 0x7f3a</div>\n  </div>\n  <div class=\"diagram-arrow\">&#8594;</div>\n  <div class=\"diagram-col\">\n    <div class=\"diagram-label\">Heap</div>\n    <div class=\"diagram-chip diagram-chip-dashed\">\"Riya\" object<div class=\"diagram-sub\">@0x7f3a</div></div>\n  </div>\n</div>"
      },
      {
        "title": "Operators",
        "points": [
          "== compares primitives by value, but compares objects by reference (memory address), not content.",
          "Integer division truncates: 7 / 2 == 3; use 7 / 2.0 or cast to get 3.5.",
          "&& and || short-circuit (skip the right side if the result is already known); & and | always evaluate both sides.",
          "instanceof checks runtime type and safely handles null (returns false, never throws).",
          "Ternary a ? b : c is an expression, not a statement — useful for compact assignments."
        ],
        "qa": [
          {
            "q": "Why does 'abc' == new String(\"abc\") return false?",
            "a": "== compares references; new String(...) always creates a new object on the heap, separate from the interned literal."
          }
        ],
        "code": "int a = 7, b = 2;\nSystem.out.println(a / b);       // 3  — integer division truncates\nSystem.out.println(a / 2.0);     // 3.5 — one operand promoted to double\n\nSystem.out.println(a == 7 && b == 2);  // && short-circuits\nSystem.out.println(a instanceof Number); // compile error: a is int, not Object\n\nint x = 5;\nint y = (x > 0) ? 1 : -1;   // ternary is an expression, not a statement"
      },
      {
        "title": "Control Flow",
        "points": [
          "if/else, for, while, do-while behave like C; do-while always runs the body at least once.",
          "Enhanced for-loop (for (Type x : collection)) can't modify the collection's structure while iterating — throws ConcurrentModificationException.",
          "switch supports int, String (since Java 7), and enum; falls through to the next case unless you add break.",
          "Modern switch expressions (Java 14+) use arrow syntax (case X -> ...) and don't fall through by default.",
          "break exits the nearest loop/switch; continue skips to the next iteration; labeled break/continue can target an outer loop."
        ],
        "qa": [
          {
            "q": "What happens if you forget break in a classic switch?",
            "a": "Execution 'falls through' into the next case's code until it hits a break or the switch ends."
          }
        ],
        "code": "for (int i = 0; i < 3; i++) { }              // classic for\nfor (int n : new int[]{1,2,3}) { }           // enhanced for (read-only view)\n\nint i = 0;\nwhile (i < 3) { i++; }\n\ndo {\n    System.out.println(\"runs at least once\");\n} while (false);\n\nswitch (day) {\n    case \"SAT\", \"SUN\" -> System.out.println(\"weekend\");   // Java 14+ arrow form\n    default -> System.out.println(\"weekday\");\n}"
      },
      {
        "title": "Arrays",
        "points": [
          "Fixed size once created; declared as int[] arr = new int[5]; or int[] arr = {1,2,3};",
          "Arrays are objects — arr.length is a field (no parentheses), unlike String's length().",
          "Multi-dimensional arrays are really arrays of arrays: int[][] grid = new int[3][4];",
          "Arrays.sort(), Arrays.toString(), Arrays.equals() are common helper methods from java.util.Arrays.",
          "Array covariance: Object[] arr = new String[3]; compiles, but storing a non-String into it throws ArrayStoreException at runtime."
        ],
        "qa": [
          {
            "q": "Why can't you resize an array?",
            "a": "An array's length is fixed at creation and baked into its memory allocation; to 'resize' you copy elements into a new, larger array."
          }
        ],
        "code": "int[] nums = new int[5];              // fixed size, default 0s\nint[] filled = {10, 20, 30};          // literal init\nint[][] grid = new int[3][3];         // 2D array = array of arrays\n\nSystem.out.println(nums.length);      // length is a field, not a method\nSystem.out.println(Arrays.toString(filled));   // [10, 20, 30]\n\nint[] copy = Arrays.copyOf(filled, filled.length);\nArrays.sort(filled);"
      },
      {
        "title": "Wrapper Classes & Autoboxing",
        "points": [
          "Each primitive has a wrapper class: int→Integer, char→Character, boolean→Boolean, etc.",
          "Autoboxing/unboxing: the compiler automatically converts int ↔ Integer where needed.",
          "Integer caches values -128 to 127 — Integer a = 100; Integer b = 100; gives a == b true, but 200 gives false (different objects).",
          "Unboxing a null wrapper (Integer x = null; int y = x;) throws NullPointerException.",
          "Wrapper classes are immutable, like String."
        ],
        "qa": [
          {
            "q": "Why does Integer.valueOf(100) == Integer.valueOf(100) return true but valueOf(200) doesn't?",
            "a": "The Integer cache (-128 to 127) reuses cached objects; outside that range, each valueOf() call creates a fresh object."
          }
        ],
        "code": "Integer boxed = 100;          // autoboxing: int -> Integer\nint unboxed = boxed;          // unboxing: Integer -> int\n\nInteger a = 127, b = 127;\nSystem.out.println(a == b);   // true  — cached range -128..127\n\nInteger c = 200, d = 200;\nSystem.out.println(c == d);   // false — outside cache, different objects\nSystem.out.println(c.equals(d)); // true — always compare wrapper *values* this way"
      },
      {
        "title": "Type Casting & Conversion",
        "points": [
          "Widening (implicit) conversion — smaller type to larger, safe, done automatically: int to long, float to double.",
          "Narrowing (explicit) conversion — larger type to smaller, needs an explicit cast, can lose data/precision: (int) 3.99 gives 3, (byte) 130 overflows and wraps.",
          "Casting between object references only works along the same inheritance line, checked at compile time for unrelated types — use instanceof before a downcast to avoid ClassCastException.",
          "Autoboxing/unboxing is a separate concept from casting — it converts between a primitive and its wrapper class, not between unrelated types.",
          "String to number: Integer.parseInt() / Double.parseDouble(); number to String: String.valueOf() or simple concatenation with \"\"."
        ],
        "qa": [
          {
            "q": "What happens when you narrow-cast a double that's too large for an int?",
            "a": "It doesn't throw — an out-of-range double clamps to Integer.MIN_VALUE/MAX_VALUE, while a normal in-range double just has its fractional part truncated."
          }
        ],
        "code": "double d = 9.99;\nint i = (int) d;                 // narrowing — explicit cast, truncates to 9\n\nint small = 130;\nbyte b = (byte) small;           // narrowing overflow -> wraps to -126\n\nlong l = 100;\ndouble auto = l;                 // widening — happens automatically, no cast needed\n\nObject o = \"hello\";\nString s = (String) o;           // reference downcast — throws ClassCastException if wrong"
      },
      {
        "title": "Keywords, Identifiers & Naming Conventions",
        "points": [
          "Java has 50+ reserved keywords (class, if, static, ...) that can't be used as identifiers; true, false, null are literals, not keywords, but are still reserved.",
          "Identifiers can contain letters, digits, _ and $, but can't start with a digit; case-sensitive (Age and age are different variables).",
          "Conventions (enforced by tooling, not the compiler): classes/interfaces in PascalCase, methods/variables in camelCase, constants in UPPER_SNAKE_CASE, packages all lowercase.",
          "var, yield, record, sealed, permits are 'contextual keywords' — reserved only in specific positions, so they don't break old code that already used them as identifiers.",
          "Package names conventionally use reverse domain notation (com.company.project) to avoid naming collisions across libraries."
        ],
        "qa": [
          {
            "q": "Why is 'var' called a contextual keyword instead of a full keyword?",
            "a": "It's only treated specially in that specific local-variable-declaration position; existing code that had a variable, method, or class literally named 'var' before Java 10 still compiles fine, since 'var' isn't reserved everywhere."
          }
        ],
        "code": "// reserved keywords can't be identifiers: class, static, final, this, ...\n// identifiers: start with a letter, _ or $; case-sensitive; no reserved words\n\nfinal double PI_LIKE = 3.14159;      // ALL_CAPS convention for constants\nclass OrderItem { }                   // PascalCase for classes\nint totalPriceInCents;                // camelCase for variables & methods\nstatic final int MAX_RETRIES = 3;     // static + final = class-level constant"
      }
    ]
  },
  {
    "id": "oop",
    "title": "OOP in Java",
    "color": "#B5451B",
    "topics": [
      {
        "title": "Classes & Objects",
        "points": [
          "A class is a blueprint; an object is an instance created with new, living on the heap.",
          "Fields hold state, methods define behavior; a constructor initializes a new object.",
          "Objects are accessed via references — assigning obj2 = obj1 copies the reference, not the object.",
          "The this keyword refers to the current object — used to disambiguate fields from parameters of the same name."
        ],
        "qa": [],
        "code": "class Car {                    // blueprint\n    String model;\n    void drive() { System.out.println(model + \" is driving\"); }\n}\n\nCar myCar = new Car();         // object — an instance living on the heap\nmyCar.model = \"Tesla\";\nmyCar.drive();                 // \"Tesla is driving\""
      },
      {
        "title": "The Four Pillars",
        "points": [
          "Encapsulation — bundling data with the methods that operate on it, hiding internal state behind private fields + public getters/setters.",
          "Inheritance — a subclass (extends) reuses and extends a superclass's fields/methods.",
          "Polymorphism — one interface, many implementations; achieved via method overriding (runtime) and overloading (compile-time).",
          "Abstraction — exposing only essential behavior via abstract classes/interfaces, hiding implementation details."
        ],
        "qa": [
          {
            "q": "Give a one-line example of each pillar.",
            "a": "Encapsulation: private balance with getBalance(). Inheritance: class Dog extends Animal. Polymorphism: Animal a = new Dog(); a.sound(); calls Dog's version. Abstraction: an interface Shape with area() that each shape implements differently."
          }
        ],
        "code": "class Animal {\n    private String name;                 // Encapsulation — hide state\n    Animal(String n){ name = n; }\n    void speak(){ System.out.println(name + \" makes a sound\"); }  // to be overridden\n}\nclass Dog extends Animal {                // Inheritance\n    Dog(String n){ super(n); }\n    @Override void speak(){ System.out.println(\"Woof!\"); }         // Polymorphism\n}\nabstract class Shape { abstract double area(); }                    // Abstraction",
        "diagram": "<div class=\"diagram-row diagram-row-4\">\n  <div class=\"diagram-col\"><div class=\"diagram-block\">Encapsulation<div class=\"diagram-sub\">hide state</div></div></div>\n  <div class=\"diagram-col\"><div class=\"diagram-block\">Inheritance<div class=\"diagram-sub\">is-a</div></div></div>\n  <div class=\"diagram-col\"><div class=\"diagram-block\">Polymorphism<div class=\"diagram-sub\">many forms</div></div></div>\n  <div class=\"diagram-col\"><div class=\"diagram-block\">Abstraction<div class=\"diagram-sub\">hide detail</div></div></div>\n</div>"
      },
      {
        "title": "Constructors",
        "points": [
          "Same name as the class, no return type; called automatically when you use new.",
          "If you write no constructor, Java provides a no-arg default constructor for free — but only if you define zero constructors of your own.",
          "Constructor overloading — multiple constructors with different parameter lists.",
          "this(...) calls another constructor in the same class; super(...) calls the parent's constructor — either must be the first line if used.",
          "Constructors are not inherited by subclasses."
        ],
        "qa": [
          {
            "q": "If you define a parameterized constructor, does the no-arg constructor still exist?",
            "a": "No — the compiler only auto-generates the no-arg constructor when you define none yourself."
          }
        ],
        "code": "class Point {\n    int x, y;\n    Point() { this(0, 0); }               // constructor chaining with this(...)\n    Point(int x, int y) { this.x = x; this.y = y; }\n}\n// new Point() and new Point(3,4) both work\n// a class with NO constructors gets a free no-arg default constructor"
      },
      {
        "title": "this vs super",
        "points": [
          "this refers to the current object; super refers to the immediate parent class.",
          "super.method() calls the parent's version of an overridden method.",
          "super() (first line of a constructor) calls the parent's constructor — added implicitly by the compiler if you don't write it.",
          "this() and super() can't both be the first statement — you can only use one of them per constructor."
        ],
        "qa": [],
        "code": "class Animal {\n    String type = \"Animal\";\n    void info(){ System.out.println(\"I am an \" + type); }\n}\nclass Cat extends Animal {\n    String type = \"Cat\";\n    void info(){\n        System.out.println(this.type);    // \"Cat\"  — this = current object\n        System.out.println(super.type);   // \"Animal\" — super = parent's version\n        super.info();                     // calls the parent's method explicitly\n    }\n}"
      },
      {
        "title": "Overloading vs Overriding",
        "points": [
          "Overloading — same method name, different parameter list, same class; resolved at compile time (static/early binding).",
          "Overriding — subclass redefines a parent's method with the same signature; resolved at runtime based on the actual object type (dynamic/late binding).",
          "Overriding rules: same signature, covariant return type allowed, access modifier can't be more restrictive, can't override a static or final method.",
          "@Override annotation isn't mandatory but catches mistakes at compile time (e.g. a typo'd method name that would otherwise just overload)."
        ],
        "qa": [
          {
            "q": "Can you overload by changing only the return type?",
            "a": "No — the method signature (name + parameter types) must differ; return type alone isn't enough to distinguish overloads."
          }
        ],
        "code": "class Calc {\n    // Overloading — same name, different parameter list, resolved at COMPILE time\n    int add(int a, int b) { return a + b; }\n    double add(double a, double b) { return a + b; }\n}\nclass Base { void greet(){ System.out.println(\"Base\"); } }\nclass Sub extends Base {\n    @Override void greet(){ System.out.println(\"Sub\"); }   // Overriding — resolved at RUNTIME\n}\nnew Sub().greet();   // \"Sub\" — dynamic dispatch picks the actual object's method"
      },
      {
        "title": "Abstract Class vs Interface",
        "points": [
          "Abstract class can have both abstract and concrete methods, constructors, and instance fields; a class can extend only one.",
          "Interface (pre-Java 8) could only have abstract methods and constants; since Java 8, it can also have default and static methods.",
          "A class can implement multiple interfaces — this is how Java achieves a form of multiple inheritance.",
          "Use abstract class when subclasses share common state/code; use interface to define a contract/capability across unrelated classes.",
          "Since Java 9, interfaces can also have private methods (helpers for default methods)."
        ],
        "qa": [
          {
            "q": "Why can't interfaces have instance fields (only constants)?",
            "a": "Any field declared in an interface is implicitly public static final — interfaces define a contract, not shared mutable state."
          }
        ],
        "code": "interface Flyable {                 // 100% abstract contract (can have default methods too)\n    void fly();\n    default void land(){ System.out.println(\"landing...\"); }\n}\nabstract class Vehicle {            // can hold state + partial implementation\n    int speed;\n    abstract void move();\n    void honk(){ System.out.println(\"beep\"); }\n}\n// A class can implement MANY interfaces but extend only ONE abstract class"
      },
      {
        "title": "Static vs Instance",
        "points": [
          "static members belong to the class itself — one shared copy across all objects.",
          "Instance members belong to each object separately — every object gets its own copy.",
          "static methods can't access instance (non-static) members directly, and can't use this/super.",
          "static blocks run once when the class is first loaded, before any object is created — used for one-time setup.",
          "Static methods are resolved at compile time (no runtime polymorphism) — you can't truly 'override' a static method, only hide it."
        ],
        "qa": [],
        "code": "class Counter {\n    static int totalCounters = 0;   // shared across ALL instances\n    int id;                         // unique per instance\n    Counter(){ id = ++totalCounters; }\n    static void report(){ System.out.println(totalCounters + \" counters made\"); }\n    // static methods can't use 'this' or access instance fields directly\n}"
      },
      {
        "title": "Access Modifiers",
        "points": [
          "private — visible only within the same class.",
          "default (no modifier) — visible within the same package.",
          "protected — visible within the same package, plus subclasses (even in other packages).",
          "public — visible everywhere.",
          "Visibility from narrowest to widest: private < default < protected < public."
        ],
        "qa": [],
        "code": "public class Account {\n    private double balance;          // only this class\n    protected String bankCode;       // this class + subclasses + same package\n    String branch;                   // (package-private) same package only\n    public String accountId;         // everyone\n\n    private Account(){ }             // even a constructor can be restricted\n}"
      },
      {
        "title": "equals(), hashCode() & toString()",
        "points": [
          "Default equals() (from Object) compares references, like ==; override it to compare by content/value.",
          "The contract: if a.equals(b) is true, then a.hashCode() must equal b.hashCode() — breaking this corrupts HashMap/HashSet behavior.",
          "hashCode() doesn't need to be unique per object, just consistent with equals().",
          "toString() default prints ClassName@hashCodeHex; override it for a readable representation, e.g. in logs.",
          "IDEs and Lombok's @EqualsAndHashCode / records auto-generate correct equals/hashCode pairs."
        ],
        "qa": [
          {
            "q": "What breaks if you override equals() but not hashCode()?",
            "a": "Two 'equal' objects can end up with different hash codes, so a HashSet/HashMap may treat them as distinct — you get duplicate entries or failed lookups."
          }
        ],
        "code": "class Point {\n    int x, y;\n    @Override public boolean equals(Object o) {\n        if (this == o) return true;\n        if (!(o instanceof Point p)) return false;\n        return x == p.x && y == p.y;\n    }\n    @Override public int hashCode() { return Objects.hash(x, y); }   // MUST override alongside equals\n    @Override public String toString() { return \"Point(\" + x + \",\" + y + \")\"; }\n}\n// Rule: equal objects MUST have equal hashCodes, or HashMap/HashSet break silently"
      },
      {
        "title": "Composition vs Inheritance",
        "points": [
          "Inheritance ('is-a') — a subclass extends a superclass; tightly couples the two classes.",
          "Composition ('has-a') — a class holds a reference to another class and delegates to it; more flexible, easier to change later.",
          "\"Favor composition over inheritance\" — deep inheritance hierarchies get fragile; composition lets you swap implementations at runtime.",
          "Example: instead of class ElectricCar extends Car, give Car an Engine field (composition) so the engine type can vary independently."
        ],
        "qa": [],
        "code": "// Composition — \"has-a\", built from other objects, more flexible\nclass Engine { void start(){ System.out.println(\"vroom\"); } }\nclass Car {\n    private final Engine engine = new Engine();   // Car HAS an Engine\n    void start(){ engine.start(); }\n}\n\n// Inheritance — \"is-a\", tighter coupling to the parent's implementation\nclass SportsCar extends Car { }   // SportsCar IS-A Car\n\n// Guideline: \"favor composition over inheritance\" — easier to change later"
      },
      {
        "title": "Polymorphism In Depth (Compile-time vs Runtime)",
        "points": [
          "Compile-time (static) polymorphism = method overloading — the compiler picks which method to call based on the argument types it sees at compile time.",
          "Runtime (dynamic) polymorphism = method overriding — the JVM decides which overridden version to run based on the object's actual type at runtime, via dynamic method dispatch.",
          "A reference variable's declared type controls which methods/fields are visible at compile time; the object's actual type controls which overridden method body runs.",
          "Field access and static methods are NOT polymorphic — they're resolved using the reference's declared type, not the object's actual type (a common trick question).",
          "Polymorphism lets you write code against an abstraction (List<String> list = new ArrayList<>();) so the concrete implementation can change without touching the calling code."
        ],
        "qa": [
          {
            "q": "If a subclass hides (not overrides) a field with the same name, which value do you get through a parent-typed reference?",
            "a": "The parent's field — fields aren't polymorphic. Only overridden instance methods use the object's actual runtime type; fields and static methods are resolved by the reference's declared (compile-time) type."
          }
        ],
        "code": "class Shape { double area(){ return 0; } }\nclass Circle extends Shape {\n    double r;\n    Circle(double r){ this.r = r; }\n    @Override double area(){ return Math.PI * r * r; }   // runtime (dynamic) polymorphism\n}\nShape s = new Circle(2);\ns.area();   // JVM looks up Circle's area() at runtime, not Shape's\n\n// compile-time polymorphism = method overloading (picked by the compiler)\nvoid print(int x){}\nvoid print(String x){}   // decided at compile time based on argument type"
      },
      {
        "title": "Object Cloning (Shallow vs Deep Copy)",
        "points": [
          "Implement Cloneable (a marker interface, like Serializable) and override clone() (inherited from Object, protected by default) to support copying an object.",
          "Object.clone() does a shallow copy by default — primitive fields are copied by value, but reference fields (arrays, objects) still point to the same underlying objects as the original.",
          "Deep copy means recursively cloning every referenced object too, so the copy is fully independent — usually done manually inside your overridden clone(), or via serialization as a blunt workaround.",
          "Calling clone() without implementing Cloneable throws CloneNotSupportedException.",
          "Many teams avoid clone() entirely (Joshua Bloch calls it 'broken') and use a copy constructor or a static factory method instead for clearer, safer copying."
        ],
        "qa": [
          {
            "q": "If you shallow-copy an object that holds a List field, and then modify that list through the copy, what happens to the original?",
            "a": "The original is affected too — a shallow copy only duplicates the reference to the list, not the list itself, so both objects still point to the exact same List instance in memory."
          }
        ],
        "code": "class Point implements Cloneable {\n    int x, y;\n    int[] tags;   // reference field — the trap\n    @Override protected Object clone() throws CloneNotSupportedException {\n        Point copy = (Point) super.clone();     // shallow copy — fields copied as-is\n        copy.tags = tags.clone();               // manually deep-copy reference fields\n        return copy;\n    }\n}\n// Shallow copy: nested objects are SHARED between original and copy\n// Deep copy: nested objects are independently duplicated too"
      },
      {
        "title": "Inner Classes & Anonymous Classes",
        "points": [
          "Non-static (inner) class — tied to an instance of the outer class, can access the outer instance's private members directly, created via outer.new Inner().",
          "Static nested class — doesn't need an outer instance; behaves like a regular top-level class just namespaced inside another. Most nested classes should default to static unless they truly need the outer instance.",
          "Local class — defined inside a method body, visible only within that method, can capture effectively-final local variables.",
          "Anonymous class — a one-off, unnamed class defined and instantiated in a single expression, commonly used (pre-lambda) to implement a listener or Runnable inline: new Runnable() { public void run() { ... } }.",
          "Since Java 8, lambdas replace most anonymous-class use cases for functional interfaces — more concise and don't create a new .class file per usage."
        ],
        "qa": [
          {
            "q": "Why does an inner (non-static) class need an outer instance to be created, but a static nested class doesn't?",
            "a": "A non-static inner class implicitly holds a reference to its enclosing instance (so it can reach the outer object's fields), so it can only exist tied to one; a static nested class holds no such reference, so it's independent, just like a normal top-level class."
          }
        ],
        "code": "class Outer {\n    int outerField = 10;\n    class Inner {                          // non-static inner class — needs an Outer instance\n        void show(){ System.out.println(outerField); }\n    }\n    static class StaticNested { }          // doesn't need an Outer instance\n\n    Runnable makeTask(){\n        return new Runnable() {            // anonymous class — one-off implementation\n            @Override public void run(){ System.out.println(\"running: \" + outerField); }\n        };\n    }\n}\nOuter.Inner inner = new Outer().new Inner();   // note the unusual syntax"
      }
    ]
  },
  {
    "id": "strings",
    "title": "Strings",
    "color": "#7C3AED",
    "topics": [
      {
        "title": "String Immutability & the String Pool",
        "points": [
          "String objects are immutable — every 'modifying' operation (concat, replace, substring) returns a new String, the original is untouched.",
          "String literals live in the String pool (part of the heap since Java 7); \"abc\" == \"abc\" is true because both point to the same pooled object.",
          "new String(\"abc\") forces a new object outside the pool, so it won't == the literal even though .equals() is true.",
          "intern() manually adds/reuses a string in the pool.",
          "Immutability makes String thread-safe by default and safe to use as a HashMap key (hash never changes)."
        ],
        "qa": [
          {
            "q": "Why is String immutable by design?",
            "a": "Safety (can't be altered after being shared, e.g. as a HashMap key or security-sensitive value like a file path), thread-safety with no extra locking, and it enables the String pool to safely share instances."
          }
        ],
        "code": "String a = \"cat\";                    // goes into the String pool\nString b = \"cat\";                    // reuses the SAME pooled object\nString c = new String(\"cat\");        // forces a NEW object on the heap\n\nSystem.out.println(a == b);          // true  — same pooled reference\nSystem.out.println(a == c);          // false — different objects\nSystem.out.println(a.equals(c));     // true  — same content\n\n// Strings are immutable: every \"modifying\" call returns a NEW String\nString s = \"hello\";\ns.toUpperCase();          // does nothing to s!\ns = s.toUpperCase();      // this is how you actually keep the change"
      },
      {
        "title": "StringBuilder vs StringBuffer vs String",
        "points": [
          "String — immutable; use for values that rarely change.",
          "StringBuilder — mutable, NOT thread-safe, faster; use for building strings in a loop or single-threaded code.",
          "StringBuffer — mutable, thread-safe (synchronized methods), slower; use only when multiple threads modify the same buffer.",
          "Concatenating with + in a loop is O(n²) because each + on String creates a new object; StringBuilder.append() is O(n) amortized.",
          "The compiler actually turns simple String + chains into a StringBuilder automatically, but this optimization doesn't apply inside loops."
        ],
        "qa": [
          {
            "q": "Why is 'name = name + i' inside a loop considered bad practice?",
            "a": "Each iteration creates a brand-new String object and discards the old one, so total work grows quadratically with iterations — use StringBuilder instead."
          }
        ],
        "code": "String result = \"\";\nfor (int i = 0; i < 5; i++) result += i;     // BAD: creates a new String each loop\n\nStringBuilder sb = new StringBuilder();       // fast, mutable, single-threaded\nfor (int i = 0; i < 5; i++) sb.append(i);\nString result2 = sb.toString();\n\n// StringBuffer = same API as StringBuilder but synchronized (thread-safe, slower)\n// Rule of thumb: String for constants, StringBuilder for building in a loop"
      },
      {
        "title": "Common String Methods Cheat Sheet",
        "points": [
          "length(), charAt(i), substring(start, end), indexOf(), contains(), replace(), split(regex), trim()/strip() (strip() is Unicode-aware, added in Java 11).",
          "equals() vs equalsIgnoreCase() — content comparison, case-sensitive vs not; compareTo() gives lexicographic ordering (negative/zero/positive).",
          "String.format(\"%s is %d\", name, age) / formatted() (Java 15+) for template-style formatting, similar to printf.",
          "String.join(\", \", list) concatenates with a delimiter; String.valueOf(obj) safely converts almost anything to a String.",
          "isEmpty() checks length == 0; isBlank() (Java 11+) also treats whitespace-only strings as blank."
        ],
        "qa": [
          {
            "q": "What's the difference between trim() and strip()?",
            "a": "trim() only removes characters <= U+0020 (basically ASCII whitespace); strip() (Java 11+) is Unicode-aware and correctly removes any character Java considers whitespace, including some non-ASCII space characters trim() misses."
          }
        ],
        "code": "String s = \"  Hello, World!  \";\ns.trim();                    // \"Hello, World!\"  (also .strip(), unicode-aware)\ns.toLowerCase();             // \"  hello, world!  \"\ns.substring(2, 7);           // \"Hello\"\ns.contains(\"World\");         // true\ns.replace(\",\", \";\");         // \"  Hello; World!  \"\ns.split(\",\");                // [\"  Hello\", \" World!  \"]\nString.join(\"-\", \"a\",\"b\",\"c\"); // \"a-b-c\"\ns.indexOf(\"World\");           // position of first match, -1 if absent"
      },
      {
        "title": "String Formatting & Basic Regex",
        "points": [
          "String.matches(regex) checks if the whole string matches a pattern; Pattern.compile(regex).matcher(str) is the reusable, more efficient way when checking the same pattern repeatedly.",
          "split(regex) treats its argument as a regex, not a literal string — split(\".\") on \"a.b.c\" needs escaping (split(\"\\\\.\")) since . is a regex metacharacter.",
          "Common regex building blocks: \\d (digit), \\w (word char), \\s (whitespace), + (one or more), * (zero or more), ? (optional), ^ / $ (start/end anchors).",
          "Text blocks (Java 15+), triple-quoted strings, are handy for multi-line regex, SQL, or JSON without escaping every quote and newline.",
          "Matcher.group() extracts the matched text; group(1), group(2) extract captured sub-groups from parentheses in the pattern."
        ],
        "qa": [
          {
            "q": "Why does \"a.b.c\".split(\".\") return an empty array instead of splitting on the literal dots?",
            "a": "split() treats its argument as a regex, and '.' as a regex means 'any character' — so it matches every character, leaving nothing; you need split(\"\\\\.\") to match a literal dot."
          }
        ],
        "code": "String formatted = String.format(\"Name: %s, Age: %d, GPA: %.2f\", \"Ana\", 22, 8.756);\n// \"Name: Ana, Age: 22, GPA: 8.76\"\n\nSystem.out.printf(\"%-10s|%5d%n\", \"id\", 7);   // left-pad / right-align width control\n\nString text = \"order-2024-item-99\";\nboolean matches = text.matches(\"order-\\\\d{4}-item-\\\\d+\");   // basic regex match\nString digitsOnly = text.replaceAll(\"[^0-9]\", \"\");            // \"202499\""
      }
    ]
  },
  {
    "id": "exceptions",
    "title": "Exception Handling",
    "color": "#C2185B",
    "topics": [
      {
        "title": "Checked vs Unchecked Exceptions",
        "points": [
          "Checked exceptions (extend Exception, not RuntimeException) must be either caught or declared with throws — e.g. IOException, SQLException.",
          "Unchecked exceptions (extend RuntimeException) don't need to be declared — e.g. NullPointerException, ArrayIndexOutOfBoundsException, IllegalArgumentException.",
          "Error (e.g. OutOfMemoryError, StackOverflowError) represents serious JVM-level problems — not meant to be caught/recovered from.",
          "Hierarchy: Throwable → Exception / Error; Exception → RuntimeException (unchecked) + everything else (checked)."
        ],
        "qa": [
          {
            "q": "Why does Java force you to handle checked exceptions but not unchecked ones?",
            "a": "Checked exceptions represent recoverable, expected failure conditions (like a missing file) the caller should plan for; unchecked ones usually signal programming bugs that shouldn't need boilerplate everywhere."
          }
        ],
        "code": "// Checked — must be declared or caught (compiler enforces it): IOException, SQLException\nvoid readFile() throws IOException {\n    Files.readAllLines(Path.of(\"data.txt\"));\n}\n\n// Unchecked — RuntimeException & subclasses, compiler doesn't force handling\nvoid divide(int a, int b) {\n    System.out.println(a / b);   // may throw ArithmeticException, uncaught is fine to compile\n}"
      },
      {
        "title": "try-catch-finally & try-with-resources",
        "points": [
          "finally always runs — even if the try or catch block returns or throws — except if the JVM exits (System.exit()) or crashes.",
          "Multiple catch blocks are checked top to bottom — put more specific exception types before more general ones, or it won't compile.",
          "try-with-resources (Java 7+) auto-closes any resource implementing AutoCloseable, even if an exception occurs — no manual finally { close() } needed.",
          "Multi-catch: catch (IOException | SQLException e) handles either type in one block.",
          "If both try and finally throw, the exception from finally 'wins' and suppresses the original — a common gotcha."
        ],
        "qa": [
          {
            "q": "What happens if finally has a return statement?",
            "a": "It overrides any return/exception from the try or catch block — generally considered bad practice because it silently swallows the original result."
          }
        ],
        "code": "try (BufferedReader br = new BufferedReader(new FileReader(\"f.txt\"))) {\n    System.out.println(br.readLine());\n} catch (IOException e) {\n    System.out.println(\"failed: \" + e.getMessage());\n} finally {\n    System.out.println(\"always runs — cleanup goes here\");\n}\n// try-with-resources auto-closes br (AutoCloseable) even if an exception is thrown"
      },
      {
        "title": "Custom Exceptions & Best Practices",
        "points": [
          "Create a custom exception by extending Exception (checked) or RuntimeException (unchecked), and always provide constructors that pass the message/cause to super().",
          "Wrap and rethrow with the original cause preserved: throw new ServiceException(\"failed\", originalException); — never swallow the original stack trace.",
          "Don't catch generic Exception/Throwable unless truly necessary — it hides bugs and makes debugging harder.",
          "Prefer specific exceptions over generic ones (IllegalArgumentException over RuntimeException) so callers can react meaningfully.",
          "Avoid using exceptions for normal control flow — they're relatively expensive and meant for exceptional situations."
        ],
        "qa": [],
        "code": "class InsufficientFundsException extends Exception {          // checked\n    public InsufficientFundsException(String msg) { super(msg); }\n}\nclass Account {\n    double balance;\n    void withdraw(double amt) throws InsufficientFundsException {\n        if (amt > balance) throw new InsufficientFundsException(\"Need \" + amt + \", have \" + balance);\n        balance -= amt;\n    }\n}\n// Best practice: extend RuntimeException for programmer errors, Exception for recoverable ones"
      },
      {
        "title": "Exception Chaining & Custom Hierarchies",
        "points": [
          "Exception chaining preserves the original cause when you wrap one exception in another: throw new ServiceException(\"failed\", originalException); — the original is retrievable later via getCause().",
          "Design custom exception hierarchies to mirror your domain: a base ApplicationException, with subclasses like ValidationException, NotFoundException, each carrying relevant context fields.",
          "Prefer unchecked (extends RuntimeException) custom exceptions for most modern APIs — checked exceptions tend to leak implementation details up through every calling layer's throws clause.",
          "printStackTrace() prints the full chain ('Caused by: ...') so you can trace back to the original failure, not just the outer wrapper.",
          "Never catch an exception just to log it and do nothing else ('swallowing') — at minimum rethrow it or wrap it with added context."
        ],
        "qa": [
          {
            "q": "Why wrap an exception instead of just letting the original propagate as-is?",
            "a": "Wrapping lets you translate a low-level exception (e.g. SQLException) into a meaningful domain-specific one (e.g. UserNotFoundException) for callers, while getCause() still preserves the original for debugging — a cleaner API without losing diagnostic detail."
          }
        ],
        "code": "try {\n    connectToDb();\n} catch (SQLException e) {\n    throw new ServiceException(\"DB layer failed\", e);   // e becomes the \"caused by\"\n}\n// e.getCause() on the new exception returns the original SQLException\n// Keeps the full root-cause stack trace instead of losing it"
      },
      {
        "title": "finally vs finalize() vs try-finally Gotchas",
        "points": [
          "finally is a block tied to try/catch that always executes (barring JVM crash/exit) — used for guaranteed cleanup (closing resources, releasing locks).",
          "finalize() (deprecated since Java 9, removed for use in Java 18+) was a method the GC could call before reclaiming an object — unreliable timing, replaced by try-with-resources or the Cleaner API.",
          "A return inside try along with a return inside finally is a classic gotcha — the finally's return silently overrides the try's return value.",
          "Modifying a variable inside finally after a return was already prepared in try doesn't change an already-captured primitive return value, but can still affect a mutable object's fields since it's the same reference.",
          "try-with-resources is the modern replacement for try/finally-close() — shorter, and correctly suppresses secondary exceptions instead of masking the original."
        ],
        "qa": [
          {
            "q": "If try returns 1 and finally returns 2, what does the method return?",
            "a": "2 — a return statement inside finally always overrides any return (or even an uncaught exception) from the try/catch block, which is exactly why it's considered a bug-prone pattern to avoid."
          }
        ],
        "code": "try {\n    return 1;\n} finally {\n    System.out.println(\"finally always runs, even after a return\");\n}\n\n// finalize() — called by the GC before reclaiming an object, deprecated since Java 9,\n// removed in Java 18. NEVER rely on it for cleanup; use try-with-resources instead.\n\ntry { throw new RuntimeException(\"A\"); }\nfinally { throw new RuntimeException(\"B\"); }   // B wins — swallows A silently, a real gotcha"
      }
    ]
  },
  {
    "id": "collections",
    "title": "Collections Framework",
    "color": "#1565C0",
    "topics": [
      {
        "title": "Collection Hierarchy Overview",
        "points": [
          "Collection interface branches into List, Set, Queue; Map is separate (not a Collection — it stores key-value pairs).",
          "List — ordered, allows duplicates (ArrayList, LinkedList, Vector).",
          "Set — no duplicates (HashSet, LinkedHashSet, TreeSet).",
          "Queue/Deque — FIFO/LIFO structures (ArrayDeque, PriorityQueue, LinkedList).",
          "Map — key→value pairs, keys unique (HashMap, LinkedHashMap, TreeMap, Hashtable)."
        ],
        "qa": [],
        "code": "// Collection\n//  ├─ List   (ordered, duplicates allowed)  -> ArrayList, LinkedList\n//  ├─ Set    (no duplicates)                -> HashSet, LinkedHashSet, TreeSet\n//  └─ Queue  (FIFO / priority)              -> ArrayDeque, PriorityQueue\n// Map is a SEPARATE hierarchy (not a Collection) -> HashMap, TreeMap, LinkedHashMap\n\nList<String> names = new ArrayList<>();\nMap<String,Integer> ages = new HashMap<>();",
        "diagram": "<div class=\"diagram-tree\">\n  <div class=\"diagram-tree-root\">Collection</div>\n  <div class=\"diagram-tree-children\">\n    <div class=\"diagram-tree-node\">List<div class=\"diagram-sub\">ArrayList, LinkedList</div></div>\n    <div class=\"diagram-tree-node\">Set<div class=\"diagram-sub\">HashSet, TreeSet</div></div>\n    <div class=\"diagram-tree-node\">Queue<div class=\"diagram-sub\">ArrayDeque, PriorityQueue</div></div>\n  </div>\n</div>"
      },
      {
        "title": "List Implementations",
        "points": [
          "ArrayList — backed by a resizable array; O(1) get by index, O(n) insert/delete in the middle, grows by 1.5x when full.",
          "LinkedList — doubly-linked list; O(1) insert/delete at ends, O(n) get by index; implements both List and Deque.",
          "Vector — legacy, synchronized version of ArrayList (rarely used now, prefer Collections.synchronizedList or CopyOnWriteArrayList).",
          "Use ArrayList by default; use LinkedList only when you genuinely need frequent insert/remove at both ends."
        ],
        "qa": [
          {
            "q": "Why is ArrayList generally preferred over LinkedList in practice?",
            "a": "Contiguous array storage means better cache locality and faster random access; LinkedList's per-node overhead and pointer-chasing rarely pay off unless you specifically need cheap head/tail insertions."
          }
        ],
        "code": "List<String> a = new ArrayList<>();   // backed by array, fast random access O(1)\na.get(0);                             // O(1)\na.add(0, \"x\");                        // O(n) — shifts everything right\n\nList<String> l = new LinkedList<>();  // doubly-linked list\nl.addFirst(\"x\"); l.addLast(\"y\");      // O(1) at the ends\nl.get(5);                             // O(n) — must walk the list"
      },
      {
        "title": "Set Implementations",
        "points": [
          "HashSet — backed by a HashMap internally; O(1) average add/contains, no ordering guarantee.",
          "LinkedHashSet — HashSet + a linked list to preserve insertion order.",
          "TreeSet — backed by a Red-Black tree (TreeMap internally); keeps elements sorted, O(log n) operations.",
          "Sets rely on equals()/hashCode() (or compareTo() for TreeSet) to detect duplicates."
        ],
        "qa": [],
        "code": "Set<String> hs = new HashSet<>();          // O(1) avg, no order guaranteed\nSet<String> lhs = new LinkedHashSet<>();   // preserves insertion order\nSet<String> ts = new TreeSet<>();          // sorted order, O(log n), needs Comparable\n\nts.add(\"banana\"); ts.add(\"apple\");\nSystem.out.println(ts);   // [apple, banana] — always sorted"
      },
      {
        "title": "Map Implementations",
        "points": [
          "HashMap — array of buckets + linked list/tree per bucket; O(1) average get/put, allows one null key.",
          "LinkedHashMap — HashMap + predictable iteration order (insertion order, or access order if configured — useful for LRU caches).",
          "TreeMap — Red-Black tree, keeps keys sorted, O(log n) operations, no null keys.",
          "Hashtable — legacy, synchronized, no null keys/values (mostly replaced by ConcurrentHashMap).",
          "Since Java 8, a HashMap bucket converts from a linked list to a tree when it gets too long (8+ entries), improving worst-case lookup from O(n) to O(log n)."
        ],
        "qa": [
          {
            "q": "How does HashMap resolve collisions?",
            "a": "By chaining — each bucket holds a linked list (or, since Java 8, a balanced tree once a bucket gets long) of entries that hashed to the same index."
          }
        ],
        "code": "Map<String,Integer> hm = new HashMap<>();        // O(1) avg, no order guarantee\nMap<String,Integer> lhm = new LinkedHashMap<>();  // preserves insertion order\nMap<String,Integer> tm = new TreeMap<>();         // sorted by key, O(log n)\n\nhm.put(\"a\", 1);\nhm.getOrDefault(\"b\", 0);         // 0, safe default\nhm.computeIfAbsent(\"c\", k -> 0); // insert 0 only if \"c\" is missing\nhm.merge(\"a\", 1, Integer::sum);  // hm.get(\"a\") becomes 2"
      },
      {
        "title": "Comparable vs Comparator",
        "points": [
          "Comparable — implemented by the class itself; defines the 'natural ordering' via compareTo(); only one per class.",
          "Comparator — a separate object implementing compare(a, b); lets you define multiple, external sorting strategies without touching the class.",
          "Collections.sort(list) uses Comparable by default; Collections.sort(list, comparator) or list.sort(comparator) uses a custom Comparator.",
          "Since Java 8, chain comparators easily: Comparator.comparing(Person::getAge).thenComparing(Person::getName)."
        ],
        "qa": [
          {
            "q": "When would you use Comparator instead of Comparable?",
            "a": "When you need multiple different sort orders for the same class, or when you can't modify the class's source (e.g. it's from a third-party library)."
          }
        ],
        "code": "class Person implements Comparable<Person> {   // one NATURAL ordering baked into the class\n    String name; int age;\n    public int compareTo(Person o) { return Integer.compare(age, o.age); }\n}\nCollections.sort(people);   // uses compareTo\n\nComparator<Person> byName = (p1, p2) -> p1.name.compareTo(p2.name);  // as many as you want\npeople.sort(byName.thenComparing(p -> p.age));   // Comparator.comparing chains too"
      },
      {
        "title": "Fail-Fast vs Fail-Safe Iterators",
        "points": [
          "Fail-fast (ArrayList, HashMap, etc.) — throws ConcurrentModificationException if the collection is structurally modified while iterating (except via the iterator's own remove()).",
          "Fail-safe (CopyOnWriteArrayList, ConcurrentHashMap) — iterates over a snapshot/clone, so concurrent modification doesn't throw, but the iterator may not reflect the very latest changes.",
          "Fail-fast detection uses an internal modCount counter checked on each next() call — it's a best-effort safety net, not a hard guarantee.",
          "To safely remove elements while iterating a normal list, use Iterator.remove() or removeIf(), not list.remove() inside a for-each."
        ],
        "qa": [],
        "code": "List<Integer> list = new ArrayList<>(List.of(1,2,3));\nfor (Integer n : list) {\n    if (n == 2) list.remove(n);   // throws ConcurrentModificationException — fail-fast\n}\n\nIterator<Integer> it = list.iterator();\nwhile (it.hasNext()) {\n    if (it.next() == 2) it.remove();   // safe — the iterator's own remove()\n}\n// Fail-safe iterators (CopyOnWriteArrayList, ConcurrentHashMap) iterate a snapshot instead"
      },
      {
        "title": "Queue & Deque in Depth",
        "points": [
          "Queue — FIFO by default; core methods come in two flavors: throwing (add, remove, element) and non-throwing/null-returning on failure (offer, poll, peek).",
          "Deque (double-ended queue) supports insertion/removal at both ends — addFirst/addLast, removeFirst/removeLast — and can act as both a stack and a queue.",
          "ArrayDeque is generally preferred over the legacy Stack class for stack behavior (push/pop) — faster, not synchronized, no legacy baggage.",
          "PriorityQueue orders elements by natural ordering or a supplied Comparator, not insertion order — peek()/poll() always return the smallest (or highest-priority) element.",
          "LinkedList implements both List and Deque, but ArrayDeque is usually faster for pure queue/stack use since it avoids per-node object overhead."
        ],
        "qa": [
          {
            "q": "Why is ArrayDeque usually recommended over the legacy Stack class?",
            "a": "Stack extends the old, synchronized Vector, so every push/pop pays for locking you almost never need; ArrayDeque is unsynchronized, backed by a resizable array, and is faster for single-threaded stack or queue use — the Java docs themselves recommend it over Stack."
          }
        ],
        "code": "Deque<Integer> stack = new ArrayDeque<>();\nstack.push(1); stack.push(2); stack.pop();     // LIFO — Deque as a Stack\n\nDeque<Integer> queue = new ArrayDeque<>();\nqueue.offer(1); queue.offer(2); queue.poll();  // FIFO — Deque as a Queue\n\nPriorityQueue<Integer> pq = new PriorityQueue<>();  // min-heap by default\npq.offer(5); pq.offer(1); pq.poll();   // 1 — smallest first"
      },
      {
        "title": "Thread-Safe Collections (Synchronized vs Concurrent)",
        "points": [
          "Collections.synchronizedList/Map/Set wraps a normal collection with synchronized methods — each call is thread-safe individually, but compound actions (check-then-act, iteration) still need external synchronization.",
          "ConcurrentHashMap uses fine-grained internal locking (bucket-level, not whole-map) for much better concurrent throughput than a fully synchronized Map.",
          "CopyOnWriteArrayList/Set copies the entire underlying array on every write — reads are lock-free and very fast, writes are expensive; ideal for read-heavy, write-rare scenarios like listener lists.",
          "BlockingQueue implementations (ArrayBlockingQueue, LinkedBlockingQueue) block the calling thread when full (on put) or empty (on take) — the standard building block for producer-consumer pipelines.",
          "Iterating a Collections.synchronizedXxx collection still requires manually synchronizing on it during iteration, or a ConcurrentModificationException can occur if another thread mutates it mid-loop."
        ],
        "qa": [
          {
            "q": "Why isn't Collections.synchronizedMap enough to prevent a race condition on 'if (!map.containsKey(k)) map.put(k, v)'?",
            "a": "Each individual call (containsKey, put) is atomic on its own, but the check-then-act sequence as a whole isn't — another thread can insert the key between your containsKey and put calls; you'd need to synchronize the whole block, or use ConcurrentHashMap's atomic putIfAbsent()."
          }
        ],
        "code": "Map<String,Integer> safe1 = Collections.synchronizedMap(new HashMap<>());  // whole map locked\nMap<String,Integer> safe2 = new ConcurrentHashMap<>();                     // lock-striped, faster\n\nList<Integer> cow = new CopyOnWriteArrayList<>();   // great for read-heavy, rare writes\n// synchronizedXxx: simple, coarse-grained lock\n// java.util.concurrent.* :  fine-grained, built for high concurrency"
      },
      {
        "title": "Immutable & Unmodifiable Collections",
        "points": [
          "List.of(...), Set.of(...), Map.of(...) (Java 9+) create truly immutable collections — any mutation attempt (add, remove, set) throws UnsupportedOperationException.",
          "Collections.unmodifiableList(list) is different — it wraps the original, blocking direct mutation through the wrapper, but the underlying list can still be changed by anyone holding the original reference.",
          "Immutable collections from List.of() reject null elements outright (throw NullPointerException on creation) — unlike a regular ArrayList, which allows nulls.",
          "Immutability makes a collection inherently thread-safe to read from multiple threads with no synchronization needed.",
          "Use immutable collections for constants, defensive copies returned from getters, and any data that shouldn't change after construction."
        ],
        "qa": [
          {
            "q": "What's the practical difference between List.of(1,2,3) and Collections.unmodifiableList wrapping a mutable copy?",
            "a": "List.of() is genuinely immutable end-to-end and rejects nulls; unmodifiableList() only prevents mutation through that specific wrapper reference — if you kept a reference to the original mutable list, changes there would still show up through the 'unmodifiable' view."
          }
        ],
        "code": "List<String> immutable = List.of(\"a\", \"b\", \"c\");     // truly immutable, throws on modify\nMap<String,Integer> im = Map.of(\"x\", 1, \"y\", 2);\n\nList<String> mutable = new ArrayList<>(List.of(\"a\",\"b\"));\nList<String> unmod = Collections.unmodifiableList(mutable);\nmutable.add(\"c\");     // unmod now shows \"c\" too — it's just a VIEW, not truly immutable!"
      }
    ]
  },
  {
    "id": "concurrency",
    "title": "Multithreading & Concurrency",
    "color": "#EF6C00",
    "topics": [
      {
        "title": "Thread Basics & Lifecycle",
        "points": [
          "Create a thread by extending Thread (override run()) or, preferably, implementing Runnable and passing it to a Thread (avoids single-inheritance limits).",
          "Calling start() creates a new OS-backed thread and eventually runs run(); calling run() directly just executes it on the current thread — no concurrency.",
          "Lifecycle states: NEW → RUNNABLE → (BLOCKED / WAITING / TIMED_WAITING) → TERMINATED.",
          "join() makes the calling thread wait until the target thread finishes.",
          "Thread.sleep() pauses the current thread without releasing any locks it holds."
        ],
        "qa": [
          {
            "q": "What happens if you call run() instead of start()?",
            "a": "It just runs as a normal method call on the current thread — no new thread is spawned, so there's no concurrency benefit."
          }
        ],
        "code": "Thread t = new Thread(() -> System.out.println(\"running\"));\nt.start();          // schedules the thread — never call run() directly for this\nt.join();           // wait for it to finish\n\n// Lifecycle: NEW -> RUNNABLE -> (BLOCKED/WAITING/TIMED_WAITING) -> TERMINATED\nSystem.out.println(t.getState());",
        "diagram": "<div class=\"diagram-pipeline\">\n  <div class=\"diagram-step\">NEW</div>\n  <div class=\"diagram-arrow\">&#8594;</div>\n  <div class=\"diagram-step diagram-step-accent\">RUNNABLE</div>\n  <div class=\"diagram-arrow\">&#8594;</div>\n  <div class=\"diagram-step\">WAITING /<br>BLOCKED</div>\n  <div class=\"diagram-arrow\">&#8594;</div>\n  <div class=\"diagram-step\">TERMINATED</div>\n</div>"
      },
      {
        "title": "synchronized & Locks",
        "points": [
          "synchronized method/block ensures only one thread can execute that critical section on a given object/lock at a time — prevents race conditions.",
          "Every object has an intrinsic lock (monitor); synchronized(obj) { ... } acquires obj's lock for the block's duration.",
          "ReentrantLock (java.util.concurrent.locks) offers more control — tryLock(), fair ordering, interruptible waits — but you must explicitly unlock() in a finally block.",
          "'Reentrant' means the same thread can re-acquire a lock it already holds without deadlocking itself.",
          "Deadlock happens when two threads each hold a lock the other needs — avoid by always acquiring multiple locks in the same global order."
        ],
        "qa": [
          {
            "q": "What's a race condition?",
            "a": "When multiple threads access shared mutable state without proper synchronization, and the final result depends on unpredictable timing/interleaving of their operations."
          }
        ],
        "code": "class Counter {\n    private int count = 0;\n    synchronized void increment() { count++; }         // intrinsic lock on 'this'\n}\nReentrantLock lock = new ReentrantLock();\nlock.lock();\ntry { /* critical section */ } finally { lock.unlock(); }  // explicit lock, always unlock in finally"
      },
      {
        "title": "wait/notify vs the Executor Framework",
        "points": [
          "wait()/notify()/notifyAll() are low-level, must be called inside a synchronized block on the same object, and are easy to get wrong (spurious wakeups, missed signals).",
          "ExecutorService (from java.util.concurrent) manages a pool of reusable threads — submit tasks via submit()/execute() instead of manually creating Thread objects.",
          "Executors.newFixedThreadPool(n), newCachedThreadPool(), newSingleThreadExecutor() are common factory methods; always call shutdown() when done.",
          "Future<T> represents a pending result from submit(); call get() to block and retrieve it (or a timeout-based get(timeout, unit)).",
          "In modern code, prefer the Executor framework (or higher-level constructs like CompletableFuture) over raw wait/notify."
        ],
        "qa": [],
        "code": "Object lock = new Object();\nsynchronized(lock) {\n    while (!ready) lock.wait();     // releases the lock, sleeps until notified\n}\nsynchronized(lock) { ready = true; lock.notifyAll(); }\n\nExecutorService pool = Executors.newFixedThreadPool(4);   // modern alternative\npool.submit(() -> doWork());\npool.shutdown();"
      },
      {
        "title": "volatile & Atomic Classes",
        "points": [
          "volatile guarantees visibility — writes by one thread are immediately visible to others — but does NOT guarantee atomicity of compound operations like count++.",
          "AtomicInteger, AtomicLong, etc. (java.util.concurrent.atomic) provide lock-free, thread-safe compound operations (incrementAndGet(), compareAndSet()) using CAS (compare-and-swap).",
          "Use volatile for simple flags (e.g. a boolean 'running' checked by multiple threads); use Atomic classes for counters updated concurrently.",
          "CAS (compare-and-swap) is a CPU-level instruction: atomically updates a value only if it still matches an expected old value."
        ],
        "qa": [
          {
            "q": "Why isn't 'volatile int count; count++;' thread-safe?",
            "a": "count++ is really read-modify-write (three separate steps); volatile only makes each individual read/write visible across threads, it doesn't make the whole sequence atomic — two threads can interleave and lose an update."
          }
        ],
        "code": "volatile boolean running = true;   // guarantees visibility across threads, no caching in registers\n// does NOT make compound actions (like ++) atomic!\n\nAtomicInteger counter = new AtomicInteger(0);\ncounter.incrementAndGet();          // atomic, lock-free, safe under concurrency\ncounter.compareAndSet(5, 10);       // CAS — the building block behind most atomics"
      },
      {
        "title": "Common Concurrency Interview Traps",
        "points": [
          "ArrayList vs Vector vs CopyOnWriteArrayList — only the last two are thread-safe, and CopyOnWriteArrayList is optimized for many reads/few writes.",
          "HashMap vs Hashtable vs ConcurrentHashMap — HashMap isn't thread-safe, Hashtable is fully synchronized (slow), ConcurrentHashMap uses fine-grained locking for much better concurrent throughput.",
          "'synchronized' on a static method locks the Class object, not an instance — different from synchronizing an instance method.",
          "Thread pool sizing: CPU-bound tasks ≈ number of cores; I/O-bound tasks can use many more threads since they spend time waiting."
        ],
        "qa": [],
        "code": "// Trap 1: forgetting to synchronize a shared mutable field -> race condition\n// Trap 2: synchronized(this) in a public API -> callers can accidentally deadlock you\n// Trap 3: calling .start() twice on the same Thread -> IllegalThreadStateException\n// Trap 4: assuming volatile makes \"count++\" atomic — it doesn't\n// Trap 5: not shutting down an ExecutorService -> app never exits"
      },
      {
        "title": "Callable, Future & CompletableFuture",
        "points": [
          "Runnable's run() returns nothing and can't throw checked exceptions; Callable<V>'s call() returns a value and can throw checked exceptions — submit a Callable to an ExecutorService to get a Future<V> back.",
          "Future.get() blocks until the result is ready (or a timeout elapses); isDone()/cancel() let you poll or abort without blocking.",
          "CompletableFuture (Java 8+) supports non-blocking composition: thenApply() (transform the result), thenCompose() (chain another async step), thenCombine() (combine two independent futures).",
          "CompletableFuture.supplyAsync(() -> ...) runs work on the common ForkJoinPool by default, or on a supplied Executor if you pass one explicitly.",
          "exceptionally() / handle() let you recover from or inspect a failure in a CompletableFuture chain without unwrapping try/catch at every step."
        ],
        "qa": [
          {
            "q": "Why prefer CompletableFuture over a plain Future for chaining async work?",
            "a": "A plain Future only supports blocking get() — there's no way to say 'when this finishes, do X' without blocking a thread to wait; CompletableFuture lets you compose async steps (thenApply, thenCompose) that run automatically on completion, without ever blocking to check."
          }
        ],
        "code": "ExecutorService pool = Executors.newFixedThreadPool(2);\nFuture<Integer> f = pool.submit(() -> 21 * 2);      // Callable<Integer>, can return a value\nSystem.out.println(f.get());                        // blocks until done -> 42\n\nCompletableFuture.supplyAsync(() -> \"fetch\")\n    .thenApply(s -> s + \" done\")\n    .thenAccept(System.out::println);                // non-blocking pipeline"
      },
      {
        "title": "Deadlock, Livelock & Starvation",
        "points": [
          "Deadlock — two or more threads each hold a lock the other needs and wait forever; the classic fix is to always acquire multiple locks in the same global order across the whole codebase.",
          "Livelock — threads keep changing state in response to each other but never make actual progress; unlike deadlock, threads aren't blocked, just unproductively busy.",
          "Starvation — a thread never gets CPU time or a lock because other threads (often higher priority, or greedier with a lock) keep getting scheduled/served first.",
          "Detecting deadlock: a thread dump (jstack) shows 'Found one Java-level deadlock' with the exact threads and locks involved.",
          "tryLock(timeout) (from ReentrantLock) is a practical way to avoid deadlock — give up and back off instead of waiting forever for a contended lock."
        ],
        "qa": [
          {
            "q": "How would you actually debug a suspected deadlock in a running Java process?",
            "a": "Take a thread dump (jstack <pid>, or jcmd <pid> Thread.print) — the JVM detects cyclic lock-wait dependencies and explicitly reports 'Found one Java-level deadlock', listing exactly which threads are blocked on which locks, so you don't have to reason it out from logs alone."
          }
        ],
        "code": "// Deadlock: A holds lock1 waits for lock2, B holds lock2 waits for lock1 — both stuck forever\n// Livelock: threads keep reacting to each other and never make progress (like two people\n//           stepping side to side trying to let each other pass)\n// Starvation: a thread never gets CPU/lock time because others keep getting priority\n\n// Fix for deadlock: always acquire multiple locks in the SAME global order"
      },
      {
        "title": "Thread Pool Sizing & Executors Deep Dive",
        "points": [
          "Executors.newFixedThreadPool(n) — fixed number of threads, unbounded queue; can build up unbounded memory if tasks arrive faster than they complete.",
          "Executors.newCachedThreadPool() — creates threads as needed, reuses idle ones, kills them after 60s idle — good for many short bursty tasks, risky for sustained high load (unbounded thread creation).",
          "Executors.newScheduledThreadPool(n) — supports delayed and periodic task execution (schedule(), scheduleAtFixedRate()).",
          "In production code, many teams construct a ThreadPoolExecutor directly rather than the Executors factories, to explicitly control the queue type/size and rejection policy instead of relying on factory defaults.",
          "Rejection policies (when the pool + queue are both full): AbortPolicy (throws), CallerRunsPolicy (runs the task on the calling thread — natural backpressure), DiscardPolicy, DiscardOldestPolicy."
        ],
        "qa": [
          {
            "q": "Why do many teams avoid Executors.newFixedThreadPool/newCachedThreadPool in production and build ThreadPoolExecutor directly instead?",
            "a": "Both factory methods hide dangerous defaults — newFixedThreadPool uses an unbounded queue (can exhaust memory under sustained load) and newCachedThreadPool can spawn unlimited threads; building ThreadPoolExecutor directly forces you to explicitly choose a bounded queue size and a rejection policy."
          }
        ],
        "code": "ExecutorService fixed = Executors.newFixedThreadPool(4);     // CPU-bound: ~ number of cores\nExecutorService cached = Executors.newCachedThreadPool();    // I/O-bound: grows/shrinks freely\nExecutorService single = Executors.newSingleThreadExecutor();\n\n// Rule of thumb sizing: CPU-bound = cores + 1\n//                       I/O-bound = cores * (1 + wait_time/compute_time)\nnew ThreadPoolExecutor(2, 8, 60, TimeUnit.SECONDS, new LinkedBlockingQueue<>());"
      }
    ]
  },
  {
    "id": "generics",
    "title": "Generics",
    "color": "#00897B",
    "topics": [
      {
        "title": "What & Why: Generics",
        "points": [
          "Generics let classes, interfaces, and methods work with any reference type while enforcing type safety at compile time — e.g. List<String> only accepts Strings.",
          "Before generics (pre-Java 5), collections stored plain Object, so you had to manually cast on retrieval — and a wrong cast only failed at runtime with ClassCastException.",
          "Type parameters use conventional single-letter names: T (Type), E (Element), K/V (Key/Value), R (Result).",
          "Generics eliminate explicit casting and catch type-mismatch bugs at compile time instead of runtime.",
          "You cannot use primitive types as type arguments (List<int> is invalid) — use the wrapper class instead (List<Integer>)."
        ],
        "qa": [
          {
            "q": "What problem do generics solve that existed before Java 5?",
            "a": "Unsafe casting: collections held raw Objects, so retrieving an element required a manual cast that could throw ClassCastException at runtime if the wrong type had been inserted somewhere. Generics catch that mismatch at compile time instead."
          }
        ],
        "code": "// Without generics — unsafe, needs manual casting\nList raw = new ArrayList();\nraw.add(\"a\"); raw.add(1);         // no error until runtime!\nString s = (String) raw.get(1);   // ClassCastException\n\n// With generics — caught at COMPILE time\nList<String> safe = new ArrayList<>();\nsafe.add(\"a\");\n// safe.add(1);   // won't even compile"
      },
      {
        "title": "Generic Classes & Methods",
        "points": [
          "Generic class: class Box<T> { T value; T get() { return value; } } — T is replaced with a real type when you use Box<String>.",
          "You can have multiple type parameters: class Pair<K, V> { K key; V value; }",
          "Generic method: declare the type parameter before the return type — public <T> T firstOf(List<T> list) { return list.get(0); }",
          "A generic method's type parameter is independent of any class-level type parameter, and can be inferred from the arguments at the call site.",
          "Since Java 7, the diamond operator <> lets you skip repeating the type on the right: Map<String, List<Integer>> m = new HashMap<>();"
        ],
        "qa": [],
        "code": "class Box<T> {                      // generic class\n    private T value;\n    void set(T v) { value = v; }\n    T get() { return value; }\n}\nstatic <T> T firstOf(List<T> list) {  // generic method\n    return list.get(0);\n}\nBox<Integer> ib = new Box<>();\nib.set(42);"
      },
      {
        "title": "Bounded Types & Wildcards",
        "points": [
          "Bounded type parameter: <T extends Number> restricts T to Number or its subclasses — lets you call Number methods like doubleValue() on T.",
          "Upper-bounded wildcard: List<? extends Number> — can read Numbers out, but can't safely add anything (except null) since the exact subtype is unknown.",
          "Lower-bounded wildcard: List<? super Integer> — can safely add Integers in, but reading gives you only Object back.",
          "PECS mnemonic: Producer Extends, Consumer Super — use extends when you're only reading from a structure, super when you're only writing to it.",
          "Unbounded wildcard List<?> means 'a list of some unknown type' — useful when you only need methods that don't depend on the type, like size()."
        ],
        "qa": [
          {
            "q": "Why can't you add an element to a List<? extends Number>?",
            "a": "The compiler only knows it's 'some subtype of Number' but not which one — adding an Integer to a list that's actually a List<Double> would be unsafe, so the compiler disallows all adds except null."
          }
        ],
        "code": "class NumberBox<T extends Number> {         // bounded — T must be a Number or subclass\n    T value;\n    double asDouble() { return value.doubleValue(); }\n}\n\nvoid printAll(List<? extends Number> list) { }   // upper bound wildcard — read-only friendly\nvoid addInts(List<? super Integer> list) { list.add(1); }  // lower bound — write friendly"
      },
      {
        "title": "Type Erasure",
        "points": [
          "Generics are a compile-time-only feature — the compiler erases type parameters after checking, replacing T with Object (or its bound) in the compiled bytecode.",
          "This is why you can't do new T[10], new T(), or T.class inside a generic class — there's no runtime type information about T left to work with.",
          "It's also why you can't overload methods that differ only by generic type: process(List<String>) and process(List<Integer>) collide after erasure into the same process(List) signature.",
          "Type erasure exists for backward compatibility — it let generics be added in Java 5 without breaking older, non-generic bytecode.",
          "instanceof can't check a parameterized type at runtime (list instanceof List<String> is illegal) — only the raw type (list instanceof List) is checkable."
        ],
        "qa": [
          {
            "q": "Why can't you create a generic array like new T[10]?",
            "a": "After type erasure, the JVM has no idea what T actually was at runtime, so it can't safely allocate an array of the right component type or enforce ArrayStoreException checks — the language simply disallows it."
          }
        ],
        "code": "// Generics are compile-time only — erased at runtime (\"type erasure\")\nList<String> ls = new ArrayList<>();\nList<Integer> li = new ArrayList<>();\nSystem.out.println(ls.getClass() == li.getClass());  // true! both are just List at runtime\n\n// This is why you CAN'T do: new T[10]  or  if (obj instanceof List<String>)"
      },
      {
        "title": "Generics with Collections & Common Questions",
        "points": [
          "List<String> list = new ArrayList<>(); — the compiler enforces at every add() call that only Strings go in, so no runtime cast is ever needed on get().",
          "Raw types (List list = new ArrayList();, no <>) still compile for legacy compatibility but generate unchecked warnings and lose all type safety.",
          "Generic classes can also be bounded by multiple interfaces: <T extends Comparable<T> & Serializable>.",
          "Static members of a generic class cannot use the class's type parameter, because static members exist independently of any particular T."
        ],
        "qa": [
          {
            "q": "Why can't a static method use its class's type parameter T directly?",
            "a": "Static members belong to the class itself, not to any specific parameterized instance (Box<String> vs Box<Integer>) — since T only gets a concrete value when an instance is created, a static context has no T to refer to."
          }
        ],
        "code": "List<Employee> emps = List.of(new Employee(\"A\", 50000), new Employee(\"B\", 90000));\nList<Employee> highEarners = emps.stream()\n    .filter(e -> e.salary > 60000)\n    .collect(Collectors.toList());\n\nMap<String, Double> salaryByName = emps.stream()\n    .collect(Collectors.toMap(e -> e.name, e -> e.salary));"
      },
      {
        "title": "PECS in Practice with Real Examples",
        "points": [
          "PECS = Producer Extends, Consumer Super — a mnemonic for choosing between ? extends T and ? super T in method parameters.",
          "Copy method example: void copy(List<? super T> dest, List<? extends T> src) — src only produces values (extends), dest only consumes them (super); this is exactly how Collections.copy() is declared.",
          "If a structure is only read from, use ? extends T (a Producer) to accept the widest range of compatible subtypes.",
          "If a structure is only written to, use ? super T (a Consumer) to accept the widest range of compatible supertypes.",
          "If a structure is both read from and written to, don't use a wildcard at all — use the exact type T, since a wildcard would incorrectly restrict one side or the other."
        ],
        "qa": [
          {
            "q": "Why does Collections.copy(List<? super T> dest, List<? extends T> src) use two different wildcards instead of one shared type?",
            "a": "dest only receives elements out of src (a consumer of T, so ? super T is safe to write into) while src only supplies elements into dest (a producer of T, so ? extends T is safe to read from) — using plain List<T> for both would needlessly force the caller's two lists to share the exact same generic type."
          }
        ],
        "code": "// PECS: Producer Extends, Consumer Super\nstatic void copy(List<? extends Number> source,   // producer — you only READ from it\n                  List<? super Number> dest) {     // consumer — you only WRITE into it\n    for (Number n : source) dest.add(n);\n}\n// source.add(1) would fail to compile — a \"? extends\" list is read-only\n// Collections.copy(List<? super T> dest, List<? extends T> src) is the real-world example"
      }
    ]
  },
  {
    "id": "io",
    "title": "File Handling & I/O",
    "color": "#5D4037",
    "topics": [
      {
        "title": "java.io Basics: Streams & Readers/Writers",
        "points": [
          "Byte streams (InputStream/OutputStream) handle raw binary data — e.g. FileInputStream, FileOutputStream — used for images, audio, any non-text file.",
          "Character streams (Reader/Writer) handle text with proper encoding — e.g. FileReader, FileWriter — avoid these for anything but plain text.",
          "Buffered wrappers (BufferedReader, BufferedWriter, BufferedInputStream) reduce the number of actual disk I/O calls by batching reads/writes — always wrap raw streams with these for performance.",
          "BufferedReader.readLine() reads one line of text at a time (without the newline) — the standard way to read a text file line by line.",
          "Always close streams (or use try-with-resources) — an unclosed stream leaks a file handle / OS resource."
        ],
        "qa": [
          {
            "q": "When would you use a byte stream instead of a character stream?",
            "a": "For any non-text file (images, audio, serialized binary data) — character streams apply text encoding/decoding, which would corrupt raw binary data."
          }
        ],
        "code": "InputStream in = new FileInputStream(\"data.bin\");     // raw bytes\nReader r = new FileReader(\"data.txt\");                 // decoded characters\n\nOutputStream out = new FileOutputStream(\"out.bin\");\nWriter w = new FileWriter(\"out.txt\");\n\n// Streams = bytes (images, binary files); Readers/Writers = characters (text, encoding-aware)"
      },
      {
        "title": "Reading & Writing Files: Common Patterns",
        "points": [
          "Modern, simple approach: Files.readAllLines(Path.of(\"file.txt\")) or Files.readString(path) for whole-file text reads (java.nio.file).",
          "Files.write(path, lines) or Files.writeString(path, content) for simple whole-file writes.",
          "try-with-resources is the standard pattern for streams: try (BufferedReader br = new BufferedReader(new FileReader(\"f.txt\"))) { ... } — auto-closes even on exception.",
          "For huge files, prefer streaming (Files.lines(path), which returns a lazy Stream<String>) over loading everything into memory with readAllLines.",
          "Reading a file that doesn't exist throws FileNotFoundException (a checked exception) — must be caught or declared."
        ],
        "qa": [],
        "code": "try (BufferedReader br = new BufferedReader(new FileReader(\"in.txt\"));\n     BufferedWriter bw = new BufferedWriter(new FileWriter(\"out.txt\"))) {\n    String line;\n    while ((line = br.readLine()) != null) {\n        bw.write(line.toUpperCase());\n        bw.newLine();\n    }\n}   // both auto-closed, even on exception"
      },
      {
        "title": "java.nio & the Files/Path API",
        "points": [
          "java.nio.file (since Java 7, the 'NIO.2' API) replaced much of the older java.io.File with a cleaner Path + Files combination.",
          "Path.of(\"folder\", \"file.txt\") (or Paths.get(...)) builds a path in an OS-independent way.",
          "Files provides static utility methods: exists(), createFile(), delete(), copy(), move(), size(), and more — no need to instantiate anything.",
          "Files.walk(path) / Files.list(path) let you traverse a directory tree as a Stream<Path>.",
          "NIO also supports non-blocking channel-based I/O (FileChannel, Selector) for high-throughput scenarios — rarely needed outside frameworks."
        ],
        "qa": [
          {
            "q": "What's the main advantage of java.nio.file.Files over the older java.io.File?",
            "a": "File's methods return booleans on failure with little detail (e.g. delete() just returns false); Files throws specific, informative exceptions, and offers a richer, more consistent API (symbolic links, file attributes, streaming directory walks)."
          }
        ],
        "code": "Path p = Path.of(\"notes.txt\");\nList<String> lines = Files.readAllLines(p);           // whole file, one call\nFiles.writeString(p, \"hello\", StandardOpenOption.APPEND);\nboolean exists = Files.exists(p);\nFiles.walk(Path.of(\".\"))                              // recursive directory walk\n     .filter(Files::isRegularFile)\n     .forEach(System.out::println);"
      },
      {
        "title": "Serialization",
        "points": [
          "Serialization converts an object into a byte stream (to save to a file, send over a network, or cache) via ObjectOutputStream.writeObject().",
          "The class must implement the marker interface Serializable (no methods to implement — it just signals intent to the JVM).",
          "transient fields are skipped during serialization (e.g. for passwords, or derived/cacheable data that shouldn't be persisted).",
          "serialVersionUID (a static final long) lets the JVM verify a serialized object's class version matches the one currently loaded — mismatches throw InvalidClassException on deserialization.",
          "Deserializing untrusted data is a well-known security risk — never deserialize input from an untrusted source without safeguards."
        ],
        "qa": [
          {
            "q": "What happens if a field is marked transient?",
            "a": "It's skipped during serialization and comes back as the type's default value (null, 0, false, etc.) after deserialization — used for sensitive or non-persistable data."
          }
        ],
        "code": "class User implements Serializable {          // marker interface, no methods\n    private static final long serialVersionUID = 1L;\n    String name; transient String password;   // transient fields are SKIPPED\n}\ntry (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(\"u.ser\"))) {\n    oos.writeObject(new User());\n}\n// serialVersionUID mismatches between save/load throw InvalidClassException"
      },
      {
        "title": "Common I/O Interview Questions",
        "points": [
          "Difference between FileReader and BufferedReader — FileReader reads raw characters directly (slow, many small reads); BufferedReader wraps it to batch reads and adds readLine().",
          "Difference between File and Path/Files — File is the legacy, more limited API; Path + Files (NIO.2) is the modern recommended approach with better error handling.",
          "How to read a file line by line efficiently — wrap in a BufferedReader, loop with readLine() until it returns null, or use Files.lines() for a lazy Stream.",
          "Why try-with-resources is preferred over manual close() in finally — it's more concise, closes resources in reverse order automatically, and correctly propagates the original exception even if close() itself also throws."
        ],
        "qa": [],
        "code": "// Q: Difference between FileReader and FileInputStream?\n//    FileReader decodes bytes to chars using a Charset; FileInputStream gives raw bytes.\n// Q: Why wrap with BufferedReader?\n//    Reduces actual disk reads — reads a chunk into memory, serves lines from there.\n// Q: When does try-with-resources close a resource?\n//    Immediately when the block exits, in reverse order of declaration, before catch/finally."
      },
      {
        "title": "Console & Standard I/O: Scanner vs BufferedReader",
        "points": [
          "Scanner(System.in) is the easiest way to read user input with built-in parsing (nextInt(), nextLine(), nextDouble()) — convenient but noticeably slower for large input due to regex-based tokenizing.",
          "BufferedReader(new InputStreamReader(System.in)) reads faster but only gives raw lines/characters — numbers need manual parsing with Integer.parseInt(), etc.",
          "Mixing nextInt() and nextLine() on the same Scanner is a classic bug — nextInt() doesn't consume the trailing newline, so a following nextLine() reads an empty string; call an extra nextLine() to consume it.",
          "System.out.println() is effectively flushed per call, fine for small programs but relatively slow for heavy output — wrap with a BufferedWriter or build a StringBuilder and print once for performance-sensitive code.",
          "For competitive programming or performance-critical I/O, BufferedReader + StreamTokenizer or a custom fast-reader class is the common choice over Scanner."
        ],
        "qa": [
          {
            "q": "Why does calling scanner.nextInt() followed by scanner.nextLine() often return an unexpectedly empty string?",
            "a": "nextInt() only consumes the numeric token itself, leaving the trailing newline character in the input buffer; the very next nextLine() call then immediately reads that leftover newline as an empty line instead of the next real line of input."
          }
        ],
        "code": "Scanner sc = new Scanner(System.in);\nint age = sc.nextInt();              // convenient parsing, but SLOW for large input\nString line = sc.nextLine();\n\nBufferedReader br = new BufferedReader(new InputStreamReader(System.in));\nint fast = Integer.parseInt(br.readLine());   // much faster for big competitive-programming input\n// Rule: Scanner for small/simple input, BufferedReader + manual parsing for performance"
      }
    ]
  },
  {
    "id": "jvm",
    "title": "JVM & Memory Management",
    "color": "#455A64",
    "topics": [
      {
        "title": "JVM Architecture",
        "points": [
          "Class Loader Subsystem — loads, links (verify/prepare/resolve), and initializes .class files into memory.",
          "Runtime Data Areas — Method Area, Heap, Stack (one per thread), PC Registers, Native Method Stack.",
          "Execution Engine — interpreter + JIT compiler that actually run the bytecode; includes the Garbage Collector.",
          "Native Interface (JNI) — lets Java code call native (C/C++) libraries when needed.",
          "The JVM specification is fixed; the actual implementation (HotSpot, OpenJ9, GraalVM) can differ in performance characteristics."
        ],
        "qa": [],
        "code": "// Class Loader  -> loads .class files into memory\n// Runtime Data Areas -> Heap, Stack, Metaspace, PC Registers, Native Method Stack\n// Execution Engine  -> Interpreter + JIT Compiler + Garbage Collector\n\n// javac Foo.java -> Foo.class -> ClassLoader -> bytecode verified -> Execution Engine runs it",
        "diagram": "<div class=\"diagram-pipeline\">\n  <div class=\"diagram-step\">Class<br>Loader</div>\n  <div class=\"diagram-arrow\">&#8594;</div>\n  <div class=\"diagram-step\">Runtime Data<br>Areas</div>\n  <div class=\"diagram-arrow\">&#8594;</div>\n  <div class=\"diagram-step\">Execution<br>Engine</div>\n  <div class=\"diagram-arrow\">&#8594;</div>\n  <div class=\"diagram-step diagram-step-accent\">Native OS<br>Threads</div>\n</div>"
      },
      {
        "title": "Memory Areas: Heap, Stack & Metaspace",
        "points": [
          "Heap — shared across all threads; stores all objects and arrays; this is what the Garbage Collector manages.",
          "Stack — one per thread; stores method call frames, local variables, and partial results; a variable here holds primitives directly or object references (the object itself is still on the heap).",
          "Metaspace (replaced PermGen since Java 8) — stores class metadata (method bytecode, field/method info); grows automatically off native memory instead of a fixed max.",
          "Heap is further divided into Young Generation (Eden + two Survivor spaces) and Old Generation — new objects start in Eden and get promoted to Old Gen if they survive enough GC cycles.",
          "StackOverflowError happens when a thread's stack runs out of space — commonly from uncontrolled/infinite recursion."
        ],
        "qa": [
          {
            "q": "Where does a local Object variable's reference live vs the object itself?",
            "a": "The reference (the pointer/address) lives on the stack frame of the method that declared it; the actual object it points to always lives on the heap."
          }
        ],
        "code": "// Heap      — all objects & arrays live here, shared across threads, GC-managed\n// Stack     — one per thread; each method call pushes a frame (locals + partial results)\n// Metaspace — class metadata (replaced PermGen since Java 8), grows into native memory\n\nvoid recurse(int n) { recurse(n + 1); }   // eventually: StackOverflowError (stack, not heap)\nList<int[]> leak = new ArrayList<>();\nwhile (true) leak.add(new int[1_000_000]);  // eventually: OutOfMemoryError: Java heap space",
        "diagram": "<div class=\"diagram-row diagram-row-3\">\n  <div class=\"diagram-col\">\n    <div class=\"diagram-label\">Heap</div>\n    <div class=\"diagram-block\">Objects &amp; arrays<div class=\"diagram-sub\">shared, GC-managed</div></div>\n  </div>\n  <div class=\"diagram-col\">\n    <div class=\"diagram-label\">Stack</div>\n    <div class=\"diagram-block\">Method frames<div class=\"diagram-sub\">one per thread</div></div>\n  </div>\n  <div class=\"diagram-col\">\n    <div class=\"diagram-label\">Metaspace</div>\n    <div class=\"diagram-block\">Class metadata<div class=\"diagram-sub\">native memory</div></div>\n  </div>\n</div>"
      },
      {
        "title": "Garbage Collection Basics",
        "points": [
          "GC automatically reclaims memory occupied by objects no longer reachable from any live reference (the 'root set': stack variables, static fields, etc.).",
          "Generational hypothesis: most objects die young — so GC focuses more effort on the small, fast-collected Young Generation than the larger Old Generation.",
          "Minor GC cleans the Young Generation (fast, frequent); Major/Full GC cleans the Old Generation (slower, less frequent, causes longer pauses).",
          "You can't force GC to run — System.gc() is only a hint/suggestion to the JVM, not a guarantee.",
          "finalize() (deprecated since Java 9) used to run before an object was collected — modern code should use try-with-resources / Cleaner instead."
        ],
        "qa": [
          {
            "q": "Why does GC focus so much on the Young Generation?",
            "a": "Empirically, most objects are short-lived (loop variables, temporary objects); collecting a small region frequently is far cheaper than scanning the whole heap, so the generational approach optimizes for the common case."
          }
        ],
        "code": "// Young Gen (Eden + 2 Survivor spaces) — new objects, collected often, fast \"minor GC\"\n// Old Gen — long-lived objects promoted from Young Gen, collected less often, \"major GC\"\n// An object survives enough minor GCs -> gets promoted to Old Gen\n\n// GC roots (things that start reachability): local variables, static fields, active threads\n// Unreachable from any GC root = eligible for collection"
      },
      {
        "title": "GC Algorithms & Common Questions",
        "points": [
          "Serial GC — single-threaded, simplest, good for small apps/single-core environments.",
          "Parallel GC — multiple threads for collection, focuses on throughput; was the default in older Java versions.",
          "G1 (Garbage First) — default since Java 9; splits the heap into regions, aims to meet a target pause-time goal while balancing throughput.",
          "ZGC / Shenandoah — very low-pause (sub-millisecond) collectors designed for huge heaps, available in modern JDKs.",
          "Memory leak in Java — even with GC, objects can 'leak' if something (e.g. a static collection, an unclosed listener) keeps holding a reference to objects that are logically no longer needed."
        ],
        "qa": [
          {
            "q": "Can a Java program have a memory leak even with automatic garbage collection?",
            "a": "Yes — GC only reclaims objects that are unreachable. If a live reference (e.g. in a static list, cache, or forgotten listener) keeps pointing to an object you're done with, it stays reachable and is never collected, even though it's effectively dead weight."
          }
        ],
        "code": "// Serial GC     — single-threaded, best for small heaps / single-core\n// Parallel GC    — multi-threaded, throughput-focused, older Java default\n// G1 GC          — region-based, balances throughput & pause time, default since Java 9\n// ZGC / Shenandoah — sub-millisecond pauses, built for very large heaps\n\n// java -XX:+UseG1GC -Xmx4g Main     // pick a collector + max heap size"
      },
      {
        "title": "ClassLoaders & the Class Loading Process",
        "points": [
          "Three built-in loaders in a hierarchy: Bootstrap (loads core java.* classes, written in native code), Platform/Extension (loads JDK extension classes), Application/System (loads your application's classpath classes).",
          "Delegation model — a class loader first asks its parent to try loading a class before attempting it itself, which is why you can't accidentally shadow java.lang.String with your own class of the same name.",
          "Class loading phases: Loading (find and read the .class bytes) → Linking (Verify bytecode correctness, Prepare static fields with defaults, Resolve symbolic references) → Initialization (run static initializers and static field assignments).",
          "A class is loaded lazily — the JVM only loads it the first time it's actually referenced/used, not all at once at startup.",
          "Custom class loaders (extending ClassLoader) enable plugin systems, hot-reloading, and isolated classpaths — how application servers keep separate deployed apps from clashing classes."
        ],
        "qa": [
          {
            "q": "Why can't you write your own java.lang.String class and have the JVM load it instead of the real one?",
            "a": "The delegation model means your Application class loader first asks its parent (eventually the Bootstrap loader) to try loading java.lang.String; the Bootstrap loader always finds and loads the genuine core class first, so your custom version is never reached for a java.* package name."
          }
        ],
        "code": "// Bootstrap ClassLoader  -> loads core JDK classes (java.lang.*), written in native code\n// Platform ClassLoader   -> loads JDK extension classes\n// Application ClassLoader-> loads your app's classes from the classpath\n\n// Delegation model: a loader always asks its PARENT first before loading itself\n// -> prevents you from accidentally shadowing java.lang.String, for example\n\nClass.forName(\"com.example.MyClass\");   // explicitly triggers loading + initialization"
      }
    ]
  },
  {
    "id": "java8",
    "title": "Java 8+ Features",
    "color": "#8E24AA",
    "topics": [
      {
        "title": "Lambda Expressions & Functional Interfaces",
        "points": [
          "Lambda syntax: (parameters) -> expression or (parameters) -> { statements; } — a compact way to implement a functional interface inline.",
          "A functional interface has exactly one abstract method (e.g. Runnable, Comparator, or any custom @FunctionalInterface) — lambdas are shorthand for anonymous implementations of these.",
          "Built-in functional interfaces (java.util.function): Function<T,R> (takes T, returns R), Predicate<T> (takes T, returns boolean), Consumer<T> (takes T, returns nothing), Supplier<T> (takes nothing, returns T).",
          "Method references (ClassName::methodName) are an even shorter form of a lambda when it just calls one existing method, e.g. list.forEach(System.out::println).",
          "Lambdas can capture variables from the enclosing scope, but those variables must be effectively final (never reassigned after being captured)."
        ],
        "qa": [
          {
            "q": "Why must a variable captured by a lambda be effectively final?",
            "a": "The lambda may run later or on another thread, potentially after the enclosing method has returned; capturing by value (not reference) avoids inconsistent/undefined state, so Java requires the captured variable to never change after being set."
          }
        ],
        "code": "Runnable r = () -> System.out.println(\"run\");             // no-arg lambda\nComparator<String> byLen = (a, b) -> a.length() - b.length();\n\ninterface Calculator { int apply(int a, int b); }          // functional interface — ONE abstract method\nCalculator add = (a, b) -> a + b;\nSystem.out.println(add.apply(2, 3));   // 5"
      },
      {
        "title": "Stream API",
        "points": [
          "A Stream represents a pipeline of operations over a source (collection, array, I/O) — it doesn't store data itself.",
          "Intermediate operations (filter, map, sorted, distinct) are lazy and return a new Stream — nothing actually runs until a terminal operation is called.",
          "Terminal operations (collect, forEach, reduce, count, anyMatch) trigger execution and produce a final result — a stream can only be consumed once.",
          "collect(Collectors.toList()) / toList() (Java 16+) gathers stream results back into a collection; Collectors.groupingBy() groups elements by a key function.",
          "Streams can run in parallel via parallelStream() — useful for large datasets and CPU-bound work, but adds overhead that can hurt performance on small collections."
        ],
        "qa": [
          {
            "q": "Why can a Stream only be consumed once?",
            "a": "A Stream models a one-shot pipeline of operations, not a reusable data structure — once a terminal operation runs, the stream is considered 'closed', and reusing it throws IllegalStateException."
          }
        ],
        "code": "List<String> names = List.of(\"Sam\", \"Ana\", \"Bo\", \"Milan\");\nList<String> result = names.stream()\n    .filter(n -> n.length() > 2)\n    .map(String::toUpperCase)\n    .sorted()\n    .collect(Collectors.toList());\n// streams are lazy — nothing runs until a terminal op (collect, forEach, count...)\n\nlong count = names.stream().filter(n -> n.startsWith(\"A\")).count();"
      },
      {
        "title": "Optional",
        "points": [
          "Optional<T> is a container that may or may not hold a non-null value — designed to make the possibility of 'no value' explicit in method signatures, instead of returning null.",
          "Create with Optional.of(value) (throws if null), Optional.ofNullable(value) (safe for possibly-null values), or Optional.empty().",
          "isPresent()/isEmpty() check for a value; get() throws if empty (avoid calling it directly); orElse(default) and orElseGet(supplier) provide safe fallbacks.",
          "map() and filter() let you chain transformations without manual null checks: opt.map(String::toUpperCase).orElse(\"NONE\").",
          "Optional is meant for return types, not fields or method parameters — using it everywhere adds unnecessary wrapping overhead."
        ],
        "qa": [
          {
            "q": "Why is Optional recommended as a return type but discouraged as a field type?",
            "a": "As a return type, it forces callers to explicitly handle the 'might be empty' case instead of risking a silent NullPointerException; as a field, it just adds an extra wrapper object with no such enforcement benefit, and Optional isn't Serializable."
          }
        ],
        "code": "Optional<String> maybe = Optional.ofNullable(getName());   // wraps a possibly-null value\nString value = maybe.orElse(\"default\");\nmaybe.ifPresent(System.out::println);\n\nString result = maybe\n    .map(String::toUpperCase)\n    .orElseThrow(() -> new NoSuchElementException(\"missing\"));\n// goal: replace scattered null checks with an explicit, chainable API"
      },
      {
        "title": "Default & Static Methods in Interfaces",
        "points": [
          "default methods (Java 8+) let an interface provide a method body — existing implementing classes automatically inherit it without breaking.",
          "This was introduced specifically to let the JDK add new methods to existing interfaces (like forEach() to Collection) without breaking every class that already implemented them.",
          "static methods on an interface belong to the interface itself, not to implementing classes — called as Interface.staticMethod(), similar to a utility class method.",
          "If a class implements two interfaces with conflicting default methods of the same signature, the class must explicitly override that method to resolve the ambiguity (or it won't compile)."
        ],
        "qa": [],
        "code": "interface Vehicle {\n    void drive();\n    default void honk() { System.out.println(\"beep\"); }     // has a body, implementers may skip it\n    static Vehicle create() { return () -> System.out.println(\"driving\"); }  // interface can have statics too\n}\n// default methods let you add new interface methods without breaking existing implementers"
      },
      {
        "title": "Other Modern Features (var, records, switch expressions)",
        "points": [
          "var (Java 10+) — local variable type inference; the compiler infers the type from the right-hand side (var list = new ArrayList<String>();) — still statically typed, just less to type.",
          "Records (Java 16+) — a compact way to declare an immutable data-carrier class: record Point(int x, int y) {} auto-generates the constructor, getters, equals(), hashCode(), and toString().",
          "Switch expressions (Java 14+) — case L -> value; syntax that returns a value directly and doesn't fall through, unlike the classic statement form.",
          "Text blocks (Java 15+) — \"\"\"multi-line string\"\"\" for cleanly writing multi-line strings (e.g. JSON, SQL) without escape characters.",
          "Sealed classes (Java 17+) — a class/interface can restrict exactly which other classes are allowed to extend/implement it, via permits."
        ],
        "qa": [],
        "code": "var list = new ArrayList<String>();          // var — local type inference, still statically typed\nrecord Point(int x, int y) { }               // record — immutable data carrier, free equals/hashCode/toString\n\nString desc = switch (day) {                 // switch expression — returns a value\n    case \"SAT\", \"SUN\" -> \"weekend\";\n    default -> \"weekday\";\n};"
      },
      {
        "title": "Date & Time API (java.time)",
        "points": [
          "Introduced in Java 8 to fix the old, mutable, not-thread-safe, confusingly-designed Date and Calendar classes.",
          "LocalDate (date only), LocalTime (time only), LocalDateTime (both, no timezone), ZonedDateTime (with timezone) — all immutable, thread-safe value types.",
          "Instant represents a single point on the UTC timeline (machine timestamp); Duration measures time between two Instants; Period measures a span in years/months/days between two LocalDates.",
          "DateTimeFormatter replaces the old, notoriously not-thread-safe SimpleDateFormat, and is itself immutable and thread-safe.",
          "Every 'modifying' operation (plusDays(), minusHours(), withYear()) returns a new object rather than mutating in place, consistent with the immutable design across the whole API."
        ],
        "qa": [
          {
            "q": "Why was java.time introduced when Date and Calendar already existed?",
            "a": "Date and Calendar are mutable and not thread-safe (a shared instance can be silently corrupted across threads), have confusing zero-based months and other quirky APIs, and SimpleDateFormat parsing wasn't thread-safe either — java.time fixed all of this with immutable, clearly-named, thread-safe types."
          }
        ],
        "code": "LocalDate today = LocalDate.now();\nLocalDate birthday = LocalDate.of(1998, 5, 20);\nPeriod age = Period.between(birthday, today);\n\nLocalDateTime meeting = LocalDateTime.now().plusHours(2);\nDuration gap = Duration.between(LocalDateTime.now(), meeting);\n// java.time classes are immutable and thread-safe — replaced the old Date/Calendar mess"
      },
      {
        "title": "Method References in Depth",
        "points": [
          "Four forms: Static — ClassName::staticMethod; Instance on a particular object — instance::method; Instance on an arbitrary object of a type (the first lambda parameter becomes the receiver) — ClassName::instanceMethod; Constructor — ClassName::new.",
          "list.forEach(System.out::println) is an instance-method reference on a particular object (System.out).",
          "str -> str.toUpperCase() is equivalent to the arbitrary-object form String::toUpperCase, since the first (and only) lambda parameter becomes the method's receiver.",
          "Constructor references (ArrayList::new) are handy as a Supplier<List<T>> when a stream collector or factory needs to produce new instances.",
          "A method reference must exactly match the target functional interface's method signature — Java infers this from context, it doesn't work as a bare expression on its own."
        ],
        "qa": [
          {
            "q": "Why does 'String::toUpperCase' work as a Function<String, String> even though toUpperCase() takes no explicit argument?",
            "a": "In the 'arbitrary object of a particular type' form, the compiler treats the lambda's single input parameter as the implicit receiver the instance method is called on — so it desugars to str -> str.toUpperCase(), matching Function<String,String>'s one-argument shape exactly."
          }
        ],
        "code": "List<String> names = List.of(\"sam\", \"ana\");\nnames.forEach(System.out::println);           // static method reference\n\nnames.stream().map(String::toUpperCase);      // instance method ref (unbound)\n\nSupplier<ArrayList<String>> ctor = ArrayList::new;   // constructor reference\n\nFunction<String, Integer> len = String::length;      // same as s -> s.length()"
      }
    ]
  },
  {
    "id": "interview",
    "title": "Interview Practice",
    "color": "#D81B60",
    "topics": [
      {
        "title": "Top 'Explain the Difference' Traps",
        "points": [
          "== vs equals() — reference comparison vs content comparison (override equals() for value comparison).",
          "abstract class vs interface — abstract class can hold state + constructors, one per subclass; interface is a pure contract, multiple per class.",
          "ArrayList vs LinkedList — array-backed random access vs linked-list-backed cheap insert/delete at ends.",
          "final vs finally vs finalize — final locks a variable/method/class; finally always runs after try/catch; finalize() was a (deprecated) pre-GC hook.",
          "throw vs throws — throw actually raises an exception instance; throws declares that a method might raise one, in its signature.",
          "Checked vs unchecked exceptions — must-handle compile-time-enforced vs optional runtime exceptions."
        ],
        "qa": [],
        "code": "// == vs equals()         -> reference vs content comparison\n// ArrayList vs LinkedList -> O(1) random access vs O(1) insert/delete at ends\n// abstract class vs interface -> partial state+impl vs pure contract (+ default methods)\n// String vs StringBuilder -> immutable vs mutable, StringBuilder for loops\n// checked vs unchecked exception -> compiler-enforced vs not\n// final vs finally vs finalize -> constant/no-override vs cleanup block vs deprecated GC hook"
      },
      {
        "title": "Common Coding-Round Patterns",
        "points": [
          "String/array manipulation — reverse a string, check palindrome, find duplicates, two-pointer/sliding-window problems.",
          "Collections usage — count word frequency with a HashMap, find the first non-repeating character, group anagrams with groupingBy.",
          "Recursion basics — factorial, Fibonacci, and explaining base case + recursive case clearly out loud.",
          "OOP design — model a real-world system (e.g. 'design a parking lot' or 'design a library system') with classes, relationships, and the right pillar (inheritance vs composition) applied.",
          "Be ready to explain your solution's time and space complexity (Big-O) — interviewers often care about this more than getting the syntax perfect."
        ],
        "qa": [],
        "code": "// Two-pointer: find a pair summing to target in a sorted array\nint[] arr = {1,3,4,6,8}; int target = 10;\nint lo = 0, hi = arr.length - 1;\nwhile (lo < hi) {\n    int sum = arr[lo] + arr[hi];\n    if (sum == target) { System.out.println(lo + \",\" + hi); break; }\n    else if (sum < target) lo++; else hi--;\n}\n// Other recurring patterns: sliding window, HashMap-for-lookup, BFS/DFS on a grid"
      },
      {
        "title": "Core Java Questions You'll Almost Certainly Get",
        "points": [
          "\"What happens when you don't override hashCode() but do override equals()?\" — See OOP: equals/hashCode section; breaks HashMap/HashSet behavior.",
          "\"Why is String immutable?\" — Security, thread-safety, and enabling the String pool. (See Strings section.)",
          "\"Explain the JVM memory model.\" — Heap vs Stack vs Metaspace. (See JVM section.)",
          "\"HashMap vs ConcurrentHashMap vs Hashtable.\" — Thread-safety and locking granularity differences. (See Concurrency section.)",
          "\"What is the diamond problem, and how does Java avoid it?\" — Multiple inheritance of state is disallowed (single class inheritance); multiple inheritance of behavior via interfaces requires explicit override when default methods conflict."
        ],
        "qa": [],
        "code": "// \"What happens if a class has no constructor?\" -> compiler adds a public no-arg one\n// \"Can you override a static method?\" -> no, it's hidden, not overridden (no polymorphism)\n// \"Can a constructor be private?\" -> yes, e.g. Singleton pattern or static factory methods\n// \"Is String thread-safe?\" -> yes, because it's immutable\n// \"What's the default value of a local variable?\" -> none — must be initialized before use"
      },
      {
        "title": "Behavioral + Technical Mix: How to Answer Well",
        "points": [
          "Structure your answer: definition first, then a short example, then a relevant gotcha/interview trap if one exists — interviewers notice when you volunteer the 'why', not just the 'what'.",
          "If you don't fully remember something, say what you do know and reason through it out loud — interviewers often care more about your thought process than a perfect memorized answer.",
          "Relate answers to real code you've written where possible ('I used ConcurrentHashMap in a caching layer because...') — concrete experience stands out over textbook definitions.",
          "For system/OOP design questions, ask clarifying questions first (scale? persistence? concurrency?) before diving into a class diagram."
        ],
        "qa": [],
        "code": "// STAR method for behavioral questions: Situation, Task, Action, Result\n// \"Tell me about a bug you fixed\" -> pick one with real technical depth, be specific about\n//    root cause (not just symptoms), and quantify the impact of the fix.\n// For technical questions: think out loud, state assumptions, start with a brute-force\n//    approach then optimize — interviewers weigh your process as much as the final answer."
      },
      {
        "title": "Final Quick-Revision Cheat Sheet",
        "points": [
          "JDK ⊃ JRE ⊃ JVM. Bytecode is portable, the JVM isn't.",
          "== is reference equality for objects; equals() is content equality (override with matching hashCode()).",
          "String is immutable; StringBuilder is mutable & fast; StringBuffer is mutable & thread-safe.",
          "ArrayList = fast random access; LinkedList = fast insert/delete at ends; HashMap = O(1) average, unordered; TreeMap = sorted, O(log n).",
          "Checked exceptions must be handled/declared; unchecked (RuntimeException) don't need to be.",
          "synchronized/ReentrantLock for mutual exclusion; volatile for visibility only (not atomicity); Atomic classes for lock-free atomic counters.",
          "Generics give compile-time type safety but are erased at runtime (type erasure) — no new T[], no T.class.",
          "Streams are lazy until a terminal operation runs, and can only be consumed once.",
          "Young Gen (Eden + Survivor) for new objects, Old Gen for long-lived ones; GC only reclaims unreachable objects."
        ],
        "qa": [],
        "code": "// == vs .equals()         | Wrapper caching -128..127 | Autoboxing/unboxing NPE risk\n// HashMap vs Hashtable vs ConcurrentHashMap | fail-fast vs fail-safe iterators\n// Runnable vs Callable | Thread vs Executor | synchronized vs Lock\n// Stack vs Heap memory | Stack Overflow vs OutOfMemory\n// Composition vs Inheritance | Overload (compile-time) vs Override (runtime)"
      },
      {
        "title": "Common Java Coding Problems (with Approach)",
        "points": [
          "Reverse a String / check a palindrome — two-pointer approach from both ends, or StringBuilder.reverse() for a quick built-in check.",
          "Find the first non-repeating character — count frequencies with a LinkedHashMap (to preserve order), then scan for the first entry with count 1.",
          "Detect duplicates in an array — a HashSet lets you check-and-add in one O(n) pass; sorting first is an O(n log n) alternative that needs no extra space beyond the sort itself.",
          "Group anagrams — sort each word's characters to build a canonical key, then Collectors.groupingBy(that key) groups them in a couple of lines.",
          "FizzBuzz-style problems and simple recursion (factorial, Fibonacci, binary search) still show up as warm-ups — practice explaining base case vs recursive case out loud, not just writing the code silently."
        ],
        "qa": [
          {
            "q": "What's an efficient way to find duplicate elements in an array in Java, and why?",
            "a": "Iterate once, checking add() on a HashSet for each element — add() returns false if the element was already present, giving an O(n) time, O(n) space duplicate check in a single pass, versus O(n log n) if you sort first (though sorting avoids the extra space)."
          }
        ],
        "code": "// Reverse a linked list in place\nclass Node { int val; Node next; Node(int v){ val = v; } }\nNode reverse(Node head) {\n    Node prev = null;\n    while (head != null) {\n        Node next = head.next;\n        head.next = prev;\n        prev = head;\n        head = next;\n    }\n    return prev;\n}\n// Classic follow-ups: detect a cycle (Floyd's), find the middle, merge two sorted lists"
      }
    ]
  },
  {
    "id": "patterns",
    "title": "Design Patterns",
    "color": "#0891B2",
    "topics": [
      {
        "title": "Why Design Patterns Matter",
        "points": [
          "Design patterns are named, reusable solutions to recurring design problems — a shared vocabulary that lets engineers communicate a whole design idea in one word ('just use a Factory here').",
          "Grouped into three classic categories (Gang of Four): Creational (object creation), Structural (composing classes/objects), Behavioral (communication between objects).",
          "Patterns aren't a checklist to force into every design — overusing them adds needless indirection; use one when it actually solves a problem you have, not preemptively.",
          "Interviewers often care less about naming every pattern and more about recognizing when a piece of code is basically implementing one, and why.",
          "Modern Java features (lambdas, streams, Optional) have quietly replaced the need for some classic patterns — Strategy is often just a lambda now."
        ],
        "qa": [],
        "code": "// A design pattern is a NAMED, reusable solution to a recurring design problem —\n// a shared vocabulary (\"just use a Factory here\") rather than a library you import.\n// Gang of Four groups them into Creational, Structural, and Behavioral patterns.\n// Interviewers use them to check you can design beyond \"does it compile\"."
      },
      {
        "title": "Singleton Pattern",
        "points": [
          "Guarantees exactly one instance of a class exists, with a single global access point — commonly used for shared resources like a configuration manager or connection pool.",
          "The enum singleton (enum Singleton { INSTANCE; }) is widely considered the safest modern implementation — inherently serialization-safe and immune to reflection-based instantiation attacks.",
          "Classic lazy implementations need care under multithreading — double-checked locking with a volatile instance field is the traditional thread-safe lazy approach.",
          "Singleton makes unit testing harder (global mutable state, hard to swap out/mock) — often criticized as an anti-pattern when overused for things that aren't truly singular.",
          "The Bill Pugh / initialization-on-demand holder idiom (a private static inner class) gives lazy, thread-safe initialization without synchronization overhead."
        ],
        "qa": [
          {
            "q": "Why is the enum-based Singleton considered the safest implementation in Java?",
            "a": "The JVM guarantees each enum constant is instantiated exactly once, and enums are automatically immune to being re-instantiated via reflection or broken via serialization/deserialization — problems that plague hand-rolled singleton classes unless you add extra defensive code."
          }
        ],
        "code": "public final class Config {\n    private static volatile Config instance;\n    private Config() { }\n    public static Config getInstance() {\n        if (instance == null) {\n            synchronized (Config.class) {\n                if (instance == null) instance = new Config();   // double-checked locking\n            }\n        }\n        return instance;\n    }\n}\n// Simpler & safer alternative: enum Config { INSTANCE; }  — thread-safe for free"
      },
      {
        "title": "Factory & Builder Patterns",
        "points": [
          "Factory Method — delegates object creation to a subclass or method, so calling code depends on an interface/abstract type rather than a concrete constructor.",
          "Abstract Factory — a factory of factories; produces families of related objects (e.g. a UIFactory that creates matching Button, Checkbox, and Menu objects for one look-and-feel).",
          "Builder — constructs a complex object step by step via chained method calls, avoiding a constructor with a huge number of parameters (the 'telescoping constructor' problem).",
          "Records and Lombok's @Builder have reduced the need to hand-write Builder boilerplate, but the pattern is still common for objects with many optional fields.",
          "Static factory methods (Integer.valueOf(), List.of()) are a lightweight alternative to a full Factory pattern — a static method can return a cached instance, a subtype, or hide the concrete class entirely."
        ],
        "qa": [
          {
            "q": "When would you reach for a Builder instead of just adding more constructors?",
            "a": "When a class has many optional/combinable fields — a Builder lets callers set only what they need, in any order, with readable chained calls, avoiding both an unreadable multi-parameter constructor and an explosion of overloaded constructors for every combination."
          }
        ],
        "code": "interface Shape { void draw(); }\nclass ShapeFactory {                              // Factory — hides object creation\n    static Shape create(String type) {\n        return switch (type) {\n            case \"circle\" -> () -> System.out.println(\"○\");\n            default -> () -> System.out.println(\"□\");\n        };\n    }\n}\nclass Pizza {                                     // Builder — step-by-step construction\n    private Pizza(Builder b) { }\n    static class Builder {\n        Builder size(String s){ return this; }\n        Pizza build(){ return new Pizza(this); }\n    }\n}\nPizza p = new Pizza.Builder().size(\"L\").build();"
      },
      {
        "title": "Observer & Strategy Patterns",
        "points": [
          "Observer — a one-to-many dependency: when a subject's state changes, all registered observers are notified automatically; the basis for GUI event listeners and pub-sub systems.",
          "Java's built-in java.util.Observer/Observable were deprecated in Java 9 — modern code uses PropertyChangeListener, custom listener interfaces, or reactive libraries instead.",
          "Strategy — defines a family of interchangeable algorithms behind a common interface, letting the algorithm vary independently of the client that uses it.",
          "Since Java 8, Strategy is very often just implemented with a lambda/functional interface instead of a full class hierarchy — passing a Comparator to sort() is Strategy in practice.",
          "Both patterns favor composition and depending on interfaces over concrete classes — a recurring theme across most design patterns."
        ],
        "qa": [
          {
            "q": "How do lambdas make the classic Strategy pattern feel almost invisible in modern Java?",
            "a": "Strategy is really just 'swap in a different algorithm behind a shared interface' — a functional interface (like Comparator or Function) plus a lambda gives you exactly that, without needing to write a separate named class for every strategy variant."
          }
        ],
        "code": "interface Observer { void update(String event); }\nclass EventBus {                                  // Observer — one-to-many notification\n    List<Observer> subs = new ArrayList<>();\n    void subscribe(Observer o){ subs.add(o); }\n    void publish(String e){ subs.forEach(o -> o.update(e)); }\n}\n\ninterface DiscountStrategy { double apply(double price); }   // Strategy — swap algorithm at runtime\nclass NoDiscount implements DiscountStrategy { public double apply(double p){ return p; } }\nclass TenPercentOff implements DiscountStrategy { public double apply(double p){ return p*0.9; } }"
      }
    ]
  },
  {
    "id": "principles",
    "title": "SOLID & Best Practices",
    "color": "#CA8A04",
    "topics": [
      {
        "title": "SOLID Principles Overview",
        "points": [
          "S — Single Responsibility: a class should have exactly one reason to change; mixing unrelated responsibilities makes every change riskier.",
          "O — Open/Closed: classes should be open for extension but closed for modification — add new behavior via new subclasses/implementations rather than editing existing, tested code.",
          "L — Liskov Substitution: a subclass must be usable anywhere its superclass is expected without breaking correctness — a subclass that throws UnsupportedOperationException on an inherited method usually violates this.",
          "I — Interface Segregation: prefer several small, focused interfaces over one large 'fat' interface that forces implementers to define methods they don't need.",
          "D — Dependency Inversion: depend on abstractions (interfaces), not concrete implementations — high-level code shouldn't need to know about a low-level class's details, enabling easy swapping/mocking."
        ],
        "qa": [
          {
            "q": "Give a concrete example of a Liskov Substitution violation.",
            "a": "The classic one: Square extends Rectangle, but overrides setWidth/setHeight to keep both sides equal — this breaks any code that assumes 'setting a Rectangle's width doesn't change its height', so a Square can't safely substitute for a Rectangle everywhere the parent type is expected."
          }
        ],
        "code": "// S — Single Responsibility: a class should have exactly one reason to change\n// O — Open/Closed: open for extension, closed for modification (add via new code, not edits)\n// L — Liskov Substitution: a subclass must be usable anywhere its parent is expected\n// I — Interface Segregation: many small interfaces beat one bloated one\n// D — Dependency Inversion: depend on abstractions, not concrete implementations"
      },
      {
        "title": "Common Best Practices & Code Smells",
        "points": [
          "Favor immutability by default — final fields, no setters unless truly needed — it eliminates whole categories of concurrency and defensive-copying bugs.",
          "Avoid returning null for collections — return an empty collection instead, so callers don't need defensive null checks everywhere.",
          "Keep methods small and named for what they do — a method needing a comment to explain 'what' (not 'why') is often a sign it should be split or renamed.",
          "'Tell, don't ask' — prefer calling a method that does the work (order.ship()) over pulling out an object's data and deciding externally what to do with it.",
          "Don't catch exceptions you can't meaningfully handle — let them propagate to a layer that can actually do something useful with the failure."
        ],
        "qa": [
          {
            "q": "Why is returning null from a method that produces a list generally considered worse than returning an empty list?",
            "a": "Every caller now has to remember a null check before iterating or calling .size(), and forgetting even once causes a NullPointerException; an empty collection is iterated and measured safely with zero special-casing, and 'no results' is still expressed clearly."
          }
        ],
        "code": "// Code smell: a 500-line method doing five unrelated things -> extract smaller methods\n// Code smell: magic numbers scattered everywhere -> named constants\n// Code smell: deeply nested if/else -> early returns / guard clauses\n// Best practice: prefer immutability, favor composition over inheritance\n// Best practice: fail fast — validate inputs at the boundary, not three calls deep"
      },
      {
        "title": "Effective Java Highlights (Joshua Bloch-style Tips)",
        "points": [
          "Prefer static factory methods over constructors when you want a meaningful name, caching, or to return a subtype (List.of(), Optional.of()).",
          "Minimize mutability — make fields final and classes immutable where practical; immutable objects are simpler to reason about and inherently thread-safe.",
          "Favor composition over inheritance to avoid fragile base-class problems — a subclass can be silently broken by an unrelated change to its superclass's internals.",
          "Always override toString() for value-like classes — dramatically improves debugging and log readability over the default ClassName@hashcode.",
          "Use enums instead of int constants ('magic numbers') for a fixed set of related values — type-safe, self-documenting, and supports adding behavior per constant."
        ],
        "qa": [
          {
            "q": "Why is 'favor composition over inheritance' repeated so often as advice?",
            "a": "Inheritance exposes a subclass to every implementation detail of its superclass, so a seemingly unrelated change in the parent can silently break subclasses that depended on old internal behavior — composition avoids this by only depending on the parent's public contract, not its internals."
          }
        ],
        "code": "// From Joshua Bloch's \"Effective Java\":\n// - Favor static factory methods over constructors (a name explains intent: List.of(...))\n// - Minimize mutability — make fields final wherever you can\n// - Favor composition over inheritance\n// - Always override toString() for debuggable objects\n// - Use enums instead of int constants\n// - Don't ignore exceptions — an empty catch block hides real bugs"
      }
    ]
  },
  {
    "id": "enums-reflection",
    "title": "Enums, Annotations & Reflection",
    "color": "#DC2626",
    "topics": [
      {
        "title": "Enums in Depth",
        "points": [
          "An enum is a special class where every constant is a singleton instance of that class — enums implicitly extend java.lang.Enum and can't extend anything else.",
          "Enums can have fields, constructors (implicitly private), and methods — each constant can even override a method with constant-specific behavior.",
          "switch statements/expressions work naturally with enums, without needing a qualified prefix inside the switch body.",
          "EnumMap and EnumSet are specialized, highly efficient collection implementations designed specifically for enum keys/elements (backed by arrays internally).",
          "values() (auto-generated) returns all constants in declaration order; valueOf(String) looks up a constant by its exact name and throws IllegalArgumentException if not found."
        ],
        "qa": [
          {
            "q": "Why are EnumMap/EnumSet more efficient than a regular HashMap/HashSet of enum keys?",
            "a": "Since an enum's full set of possible values is known and fixed at compile time, EnumMap/EnumSet can use a plain array indexed by each constant's ordinal internally, avoiding hashing entirely — faster and more memory-compact than a general-purpose hash-based structure."
          }
        ],
        "code": "enum Status {\n    ACTIVE(\"A\"), INACTIVE(\"I\");           // enums can have fields, constructors, methods\n    final String code;\n    Status(String c) { code = c; }\n}\nStatus s = Status.ACTIVE;\nswitch (s) { case ACTIVE -> System.out.println(\"on\"); default -> System.out.println(\"off\"); }\n// Enums are full classes under the hood — implicitly final, extend java.lang.Enum"
      },
      {
        "title": "Annotations Explained",
        "points": [
          "Annotations attach metadata to code (classes, methods, fields) without changing its behavior directly — the behavior comes from whatever tool/framework reads that metadata.",
          "Built-in annotations: @Override (compile-time check), @Deprecated (marks as discouraged, triggers a compiler warning), @SuppressWarnings, @FunctionalInterface (enforces exactly one abstract method).",
          "Meta-annotations describe other annotations: @Retention (SOURCE/CLASS/RUNTIME — how long the annotation info is kept), @Target (which elements it can annotate), @Inherited, @Documented.",
          "Frameworks like Spring and JPA rely heavily on custom annotations (@Autowired, @Entity) combined with reflection to wire up behavior at runtime without you writing that plumbing by hand.",
          "Only RUNTIME-retention annotations are visible via reflection at runtime — SOURCE and CLASS retention annotations are stripped before or during compilation."
        ],
        "qa": [
          {
            "q": "Why does an annotation need @Retention(RUNTIME) for a framework like Spring to act on it at runtime?",
            "a": "By default, annotation info doesn't need to survive past compilation; RUNTIME retention explicitly tells the compiler to keep that metadata in the compiled .class file and make it available to the JVM, which is what lets a framework use reflection to read the annotation while the program is actually running."
          }
        ],
        "code": "@Retention(RetentionPolicy.RUNTIME)         // annotations describe metadata about code\n@Target(ElementType.METHOD)\n@interface Test { }                          // a custom annotation, like JUnit's own @Test\n\nclass Checks {\n    @Test @Deprecated\n    void oldMethod() { }\n}\n// @Override, @Deprecated, @SuppressWarnings are common built-ins compilers understand"
      },
      {
        "title": "Reflection API Basics",
        "points": [
          "java.lang.reflect lets code inspect and manipulate classes, methods, fields, and constructors at runtime, even ones it didn't know about at compile time.",
          "obj.getClass() or MyClass.class gives you a Class<T> object — the entry point for reflective inspection (getMethods(), getFields(), getConstructors()).",
          "Method.invoke(obj, args...) calls a method reflectively; Field.set(obj, value) sets a field's value, including private ones via setAccessible(true).",
          "Reflection is how frameworks (Spring, Hibernate, JUnit, Jackson) do their 'magic' — instantiating classes, injecting dependencies, and calling annotated methods without you writing that glue code.",
          "Trade-offs: reflection is noticeably slower than direct calls, bypasses some compile-time type safety, and can break encapsulation — use it sparingly in application code, mostly it's framework-internal machinery."
        ],
        "qa": [
          {
            "q": "Why do frameworks like Spring rely so heavily on reflection instead of you wiring everything by hand?",
            "a": "Reflection lets the framework discover annotated classes/fields/methods (like @Autowired) at runtime and automatically instantiate objects and inject dependencies into them without you writing that boilerplate wiring code yourself — the framework inspects your classes generically instead of needing compile-time knowledge of them."
          }
        ],
        "code": "Class<?> clazz = Class.forName(\"java.util.ArrayList\");\nObject instance = clazz.getDeclaredConstructor().newInstance();\n\nMethod m = String.class.getMethod(\"length\");\nSystem.out.println(m.invoke(\"hello\"));    // 5 — calling a method by name at runtime\n\n// Reflection powers frameworks (Spring, JUnit) but is slower and bypasses compile-time\n// safety — used sparingly in application code."
      }
    ]
  }
];
