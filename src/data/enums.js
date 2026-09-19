export default {
  id: 'enums',
  title: 'Enums, Annotations & Reflection',
  color: '#BE123C',
  topics: [
    {
      title: 'Enums in Depth',
      points: [
        'An enum is a special class where every constant is a predefined, singleton instance — implicitly extends java.lang.Enum, so it cannot extend any other class.',
        'Enums can have fields, constructors (implicitly private), and methods — including constant-specific method bodies where each constant overrides a method differently.',
        'values() returns all constants in declaration order; ordinal() gives a 0-based position (fragile if constants are reordered — avoid persisting ordinal() directly); name() gives the exact declared identifier.',
        'Enums work seamlessly in switch statements without a class-name prefix, and implement Comparable (by ordinal) automatically.',
        'EnumSet and EnumMap (bitmask/array-backed) are optimized collections that only work with enum types, far faster than general-purpose HashSet/HashMap for the same job.',
      ],
      qa: [{ q: 'Why is it risky to store an enum\'s ordinal() value in a database?', a: "ordinal() reflects declaration ORDER, not identity — if a new constant is inserted in the middle of the enum later, every ordinal() after it silently shifts, corrupting previously stored values; store name() (or an explicit stable code field) instead." }],
      code: 'enum Planet {\n    MERCURY(3.3e23), EARTH(5.9e24), JUPITER(1.9e27);\n    final double mass;                 // enum fields\n    Planet(double mass) { this.mass = mass; }  // enum constructor — implicitly private\n}\n\nenum Operation {\n    ADD { public int apply(int a, int b) { return a + b; } },     // constant-specific body\n    SUBTRACT { public int apply(int a, int b) { return a - b; } };\n    public abstract int apply(int a, int b);\n}\nSystem.out.println(Operation.ADD.apply(2, 3));   // 5',
      flow: { type: 'grid', items: [
        { label: 'values()', sub: 'array, declaration order' },
        { label: 'ordinal()', sub: 'position (fragile)' },
        { label: 'name()', sub: 'stable identifier' },
      ] },
    },
    {
      title: 'Annotations Explained',
      points: [
        'An annotation is metadata attached to code (@Override, @Deprecated, @FunctionalInterface, or a custom one) — it does nothing by itself; some tool, the compiler, or reflection must read and act on it.',
        'Meta-annotations configure how a custom annotation behaves: @Retention (SOURCE, CLASS, or RUNTIME — controls how long it survives) and @Target (which elements it can be applied to: TYPE, METHOD, FIELD...).',
        '@Retention(RetentionPolicy.RUNTIME) is required if you want to read the annotation via reflection at runtime (e.g. how frameworks like Spring/JUnit discover annotated methods).',
        'Built-in annotations: @Override (compile-time check that a method really overrides something), @Deprecated (marks an API as discouraged), @SuppressWarnings (silences specific compiler warnings), @FunctionalInterface (enforces the single-abstract-method rule).',
      ],
      qa: [{ q: 'Why does a custom annotation intended for a testing framework need @Retention(RUNTIME)?', a: "A testing framework like JUnit discovers @Test-annotated methods via reflection while the program is actually running; if the annotation's retention were SOURCE or CLASS, it would be stripped before or right after compilation and simply wouldn't exist in memory for reflection to find at runtime." }],
      code: '@Retention(RetentionPolicy.RUNTIME)\n@Target(ElementType.METHOD)\n@interface Test { }        // a minimal custom test-marking annotation, like JUnit\'s\n\nclass Calculator {\n    @Test\n    void additionWorks() { }\n}\n\n// A test runner would use reflection to find @Test-annotated methods and invoke them\nfor (Method m : Calculator.class.getDeclaredMethods()) {\n    if (m.isAnnotationPresent(Test.class)) {\n        System.out.println("Found test: " + m.getName());\n    }\n}',
      flow: { type: 'pipeline', steps: ['@interface MyAnnotation', '@Retention + @Target', 'apply to code', 'read via reflection'] },
    },
    {
      title: 'Reflection API Basics',
      points: [
        'Reflection lets code inspect and manipulate classes, methods, fields, and constructors at runtime, even ones it didn\'t know about at compile time.',
        'getClass() (on any object) or ClassName.class (compile-time known) or Class.forName("fully.qualified.Name") (dynamic, by name) are the three ways to get a Class object.',
        'getDeclaredMethods()/getDeclaredFields() return ALL members (including private) declared directly on that class; getMethods()/getFields() return only public members, but include inherited ones.',
        'setAccessible(true) bypasses normal Java access-control checks (private/protected), letting reflection read/invoke members it normally couldn\'t — used carefully by frameworks, and a well-known security consideration.',
        'Frameworks like Spring, Hibernate, and JUnit are built almost entirely on reflection — to wire dependencies, map database columns to fields, and discover test methods, all without you writing that plumbing by hand.',
      ],
      qa: [{ q: 'Why is reflection generally slower than calling a method directly?', a: 'A direct method call is resolved and can be optimized/inlined by the JIT compiler; a reflective call (Method.invoke()) goes through extra security checks, argument boxing/unboxing, and indirection that the JIT has historically been less able to optimize away, though modern JVMs have narrowed this gap somewhat.' }],
      code: 'class Person {\n    private String name = "Alice";\n    private void greet() { System.out.println("Hi, I\'m " + name); }\n}\n\nPerson p = new Person();\nClass<?> clazz = p.getClass();\n\nField nameField = clazz.getDeclaredField("name");\nnameField.setAccessible(true);              // bypass private access\nSystem.out.println(nameField.get(p));        // "Alice"\n\nMethod greetMethod = clazz.getDeclaredMethod("greet");\ngreetMethod.setAccessible(true);\ngreetMethod.invoke(p);                        // calls the private greet() method',
      flow: { type: 'pipeline', steps: ['Class.forName() / obj.getClass()', 'getDeclaredField/Method()', 'setAccessible(true)', 'get()/invoke()'] },
    },
    {
      title: 'Reflection: newInstance(), Constructors & Practical Uses',
      points: [
        'Class.getDeclaredConstructor().newInstance() is the modern way to create an instance reflectively (the older Class.newInstance() is deprecated since Java 9 due to weaker exception handling).',
        'Reflection can inspect a class\'s annotations, generic type information, and interfaces implemented — this is exactly how dependency-injection frameworks decide what to wire where.',
        'Serialization frameworks (Jackson/Gson for JSON) use reflection to read/write private fields directly, converting between objects and JSON without you writing manual getter/setter-based mapping code.',
        'Downsides: reflective code bypasses compile-time type safety (errors surface at runtime as exceptions instead), is slower than direct calls, and can break encapsulation if overused outside of framework code.',
      ],
      qa: [{ q: 'How does a JSON library like Jackson populate a private field it has no public setter for?', a: 'It uses reflection: it looks up the field by name via getDeclaredField(), calls setAccessible(true) to bypass the private access modifier, and then sets the value directly onto that field on the target object instance.' }],
      code: 'Class<?> clazz = Class.forName("com.example.Person");\nConstructor<?> ctor = clazz.getDeclaredConstructor();\nctor.setAccessible(true);\nObject instance = ctor.newInstance();          // reflective object creation\n\n// Simplified idea of what a JSON library does internally:\nfor (Field f : instance.getClass().getDeclaredFields()) {\n    f.setAccessible(true);\n    if (f.getName().equals("name")) f.set(instance, "Riya");\n}',
      flow: { type: 'compare', columns: [
        { title: 'Direct code', points: ['Compile-time checked', 'Fast', 'Fixed at compile time'] },
        { title: 'Reflection', points: ['Runtime discovery', 'Slower', 'Powers DI/serialization frameworks'] },
      ] },
    },
  ],
};
