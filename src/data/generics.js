export default {
  id: 'generics',
  title: 'Generics',
  color: '#0891B2',
  topics: [
    {
      title: 'What & Why: Generics',
      points: [
        'Generics let a class/method/interface operate on a type parameter (List<T>) instead of a fixed type, giving compile-time type safety with no casts needed.',
        'Before generics (pre-Java 5), collections stored raw Object and required manual casting at every retrieval — a common source of ClassCastException at runtime.',
        'The type parameter is checked by the compiler, catching mismatches before the program ever runs, instead of failing later with a runtime cast error.',
        'Convention: single uppercase letters as placeholders — T (Type), E (Element), K/V (Key/Value), R (Result).',
      ],
      qa: [{ q: 'What problem did generics solve compared to pre-Java-5 code?', a: 'They moved type-checking from runtime (a ClassCastException when you retrieved and cast the wrong type) to compile time, and eliminated the need to manually cast every element pulled out of a collection.' }],
      code: '// Before generics (pre-Java 5) — raw types, manual casting, unsafe\nList list = new ArrayList();\nlist.add("hello");\nString s = (String) list.get(0);    // manual cast — runtime ClassCastException risk\n\n// With generics — compiler-checked, no cast needed\nList<String> safeList = new ArrayList<>();\nsafeList.add("hello");\nString s2 = safeList.get(0);        // no cast, compiler guarantees it\'s a String',
      flow: { type: 'compare', columns: [
        { title: 'Raw type (pre-5)', points: ['Manual casting', 'Runtime ClassCastException risk'] },
        { title: 'Generic type', points: ['Compiler-checked', 'No casts needed'] },
      ] },
    },
    {
      title: 'Generic Classes & Methods',
      points: [
        'A generic class declares its type parameter(s) right after the class name: class Box<T> { T value; }.',
        'A generic method can introduce its own type parameter independent of the class it\'s in: static <T> T firstOf(List<T> list).',
        'Multiple type parameters are comma-separated: class Pair<K, V> { K key; V value; }.',
        'Type inference (the diamond operator <>, since Java 7) lets you write new Box<>() instead of repeating new Box<String>().',
      ],
      qa: [],
      code: 'class Box<T> {\n    private T value;\n    void set(T value) { this.value = value; }\n    T get() { return value; }\n}\n\nclass Pair<K, V> {\n    K key; V value;\n    Pair(K key, V value) { this.key = key; this.value = value; }\n}\n\nstatic <T> T firstOf(List<T> list) { return list.get(0); }   // generic METHOD\n\nBox<String> box = new Box<>();     // diamond operator infers <String>\nbox.set("hello");',
      flow: { type: 'pipeline', steps: ['class Box<T>', 'Box<String> box', 'box.set("hi")', 'String s = box.get()'] },
    },
    {
      title: 'Bounded Types & Wildcards',
      points: [
        'Bounded type parameter: <T extends Number> restricts T to Number or its subtypes, letting you call Number methods on T inside the class/method.',
        'Wildcard ? represents an unknown type: List<?> is a list of some unknown type; List<? extends Number> accepts any List of Number or its subtypes (read-only, "producer").',
        'List<? super Integer> accepts Integer or any of its supertypes (write-friendly, "consumer") — you can safely add Integers into it.',
        'PECS mnemonic: "Producer Extends, Consumer Super" — use extends when you only read from the structure, super when you only write to it.',
      ],
      qa: [{ q: 'Why can\'t you add an element to a List<? extends Number>?', a: "The compiler doesn't know the EXACT type behind the wildcard (it could be List<Integer>, List<Double>, etc.) — allowing an add() could silently insert the wrong subtype, so the compiler forbids all adds except null." }],
      code: 'static <T extends Number> double sumAll(List<T> list) {\n    double sum = 0;\n    for (T t : list) sum += t.doubleValue();   // Number methods available\n    return sum;\n}\n\nList<? extends Number> readOnly = List.of(1, 2.5, 3L);    // producer — safe to read\n// readOnly.add(5);   // COMPILE ERROR — can\'t safely add to an unknown subtype\n\nList<? super Integer> writable = new ArrayList<Number>(); // consumer — safe to write\nwritable.add(5);       // OK — Integer fits into any supertype slot',
      flow: { type: 'compare', columns: [
        { title: '? extends T (Producer)', points: ['Safe to read', 'Cannot add (except null)'] },
        { title: '? super T (Consumer)', points: ['Safe to add T', 'Reads come back as Object'] },
      ] },
    },
    {
      title: 'Type Erasure',
      points: [
        'Generics exist only at compile time — the compiler erases type parameters and inserts casts, so at runtime a List<String> and a List<Integer> are both just List (backward compatible with pre-generics bytecode).',
        "Because of erasure, you can't do new T() or new T[] directly, can't use instanceof with a parameterized type (list instanceof List<String>), and can't overload methods that would erase to the same signature.",
        'A bounded type parameter <T extends Number> erases to its bound (Number), not to Object — the compiler inserts a cast to Number where needed.',
        'This is why List<String>.class and List<Integer>.class don\'t exist as distinct Class objects — there is only one List.class at runtime.',
      ],
      qa: [{ q: "Why can't you write 'if (list instanceof List<String>)'?", a: 'Type erasure removes the parameter at runtime — the JVM only sees a raw List, with no way to check what type it was parameterized with, so the compiler rejects this as an "unchecked" / illegal instanceof.' }],
      code: 'List<String> strings = new ArrayList<>();\nList<Integer> ints = new ArrayList<>();\nSystem.out.println(strings.getClass() == ints.getClass());  // true! both erase to raw List\n\n// static <T> T[] makeArray(int size) { return new T[size]; }   // COMPILE ERROR — erasure\n\nclass Box<T extends Number> {\n    T value;\n    Number getAsNumber() { return value; }   // compiler treats T as Number after erasure\n}',
      flow: { type: 'pipeline', steps: ['List<String> (compile time)', 'type erasure', 'List (runtime bytecode)'] },
    },
    {
      title: 'Generics with Collections & Common Questions',
      points: [
        'Arrays and generics don\'t mix well: you cannot create a generic array directly (new T[10]) due to type erasure, but you CAN have a generic type hold an array field of a concrete type.',
        'A generic class cannot have a static field of its type parameter\'s type — static members are shared across ALL parameterizations, but T is different per instance.',
        "Overloaded methods that erase to the same signature after erasure (e.g. void process(List<String> s) and void process(List<Integer> i)) fail to compile — they'd be indistinguishable at runtime.",
        'Generic exception classes are not allowed to extend Throwable directly with a type parameter — catch clauses can\'t distinguish between erased generic exception types.',
      ],
      qa: [{ q: 'Why can\'t a class have both void process(List<String> s) and void process(List<Integer> i) as overloads?', a: 'After type erasure, both methods have the exact same erased signature — process(List) — so the compiler cannot tell them apart and rejects it as a duplicate method declaration.' }],
      code: '// COMPILE ERROR — erase to the same signature process(List)\n// void process(List<String> s) { }\n// void process(List<Integer> i) { }\n\nclass Box<T> {\n    // static T value;   // COMPILE ERROR — static field can\'t use the class\'s type parameter\n    static int count;    // fine — not tied to T\n}',
      flow: { type: 'grid', items: [
        { label: 'new T[10]', sub: 'not allowed' },
        { label: 'static T field', sub: 'not allowed' },
        { label: 'overloads erasing same', sub: 'not allowed' },
      ] },
    },
    {
      title: 'PECS in Practice with Real Examples',
      points: [
        'PECS = "Producer Extends, Consumer Super" — a rule of thumb for choosing wildcard direction when designing a generic API.',
        'Collections.copy(List<? super T> dest, List<? extends T> src) is the textbook real-world example: src only produces (is read from), dest only consumes (is written to).',
        'If a structure is both read from and written to in the same method, don\'t use a wildcard — use a plain, unbounded type parameter <T> instead.',
        'Getting PECS right lets your API accept the widest possible range of caller types without sacrificing safety — a well-designed library method like Collections.addAll() applies this everywhere.',
      ],
      qa: [{ q: 'Why does Collections.copy use "? super T" for the destination but "? extends T" for the source?', a: "The source list only needs to give you T's (or subtypes) out — a producer, so extends; the destination list only needs to accept T's in — a consumer, so super — this lets you copy, say, a List<Integer> into a List<Number> or List<Object>, which a same-typed List<T> parameter would forbid." }],
      code: 'public static <T> void copy(List<? super T> dest, List<? extends T> src) {\n    for (int i = 0; i < src.size(); i++) {\n        dest.set(i, src.get(i));   // src PRODUCES T, dest CONSUMES T\n    }\n}\n\nList<Integer> ints = List.of(1, 2, 3);\nList<Number> numbers = new ArrayList<>(List.of(0, 0, 0));\ncopy(numbers, ints);   // works: Integer fits where Number is expected',
      flow: { type: 'compare', columns: [
        { title: 'Producer: ? extends T', points: ['You only read from it', 'src in copy(dest, src)'] },
        { title: 'Consumer: ? super T', points: ['You only write into it', 'dest in copy(dest, src)'] },
      ] },
    },
  ],
};
