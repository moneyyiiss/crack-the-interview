export default {
  id: 'solid',
  title: 'SOLID & Best Practices',
  color: '#CA8A04',
  topics: [
    {
      title: 'SOLID Principles Overview',
      points: [
        'S — Single Responsibility: a class should have exactly one reason to change; mixing unrelated responsibilities makes both harder to maintain.',
        'O — Open/Closed: classes should be open for extension but closed for modification — add new behavior via new code (subclasses, strategy objects), not by editing existing tested code.',
        'L — Liskov Substitution: a subclass must be usable anywhere its parent type is expected without breaking correctness — overriding a method should not violate the parent\'s contract.',
        'I — Interface Segregation: prefer several small, focused interfaces over one large "fat" interface that forces implementers to provide methods they don\'t need.',
        'D — Dependency Inversion: depend on abstractions (interfaces), not concrete implementations — high-level modules shouldn\'t directly depend on low-level implementation details.',
      ],
      qa: [{ q: 'Give a concrete Java example of violating Liskov Substitution.', a: "The classic example: Square extends Rectangle and overrides setWidth()/setHeight() to keep both sides equal — code that works correctly with any Rectangle (e.g. 'set width to 5, height to 10, expect area 50') breaks when handed a Square, because setting one side silently changes the other too." }],
      code: '// Single Responsibility — split unrelated concerns\nclass InvoicePrinter { void print(Invoice i) { } }      // printing\nclass InvoiceRepository { void save(Invoice i) { } }     // persistence\n// (NOT one Invoice class doing both formatting AND saving to DB)\n\n// Dependency Inversion — depend on an interface, not a concrete class\ninterface PaymentGateway { void charge(double amount); }\nclass Checkout {\n    private final PaymentGateway gateway;   // depends on abstraction\n    Checkout(PaymentGateway gateway) { this.gateway = gateway; }\n}',
      flow: { type: 'grid', items: [
        { label: 'S', sub: 'Single Responsibility' },
        { label: 'O', sub: 'Open/Closed' },
        { label: 'L', sub: 'Liskov Substitution' },
        { label: 'I', sub: 'Interface Segregation' },
        { label: 'D', sub: 'Dependency Inversion' },
      ] },
    },
    {
      title: 'Common Best Practices & Code Smells',
      points: [
        'Program to an interface, not an implementation — declare variables/parameters as List<T>, not ArrayList<T>, so the concrete type can change freely later.',
        'Avoid "God classes" that do everything — a class with dozens of unrelated methods and fields is a Single-Responsibility violation waiting to cause bugs.',
        'Prefer immutability where practical — fewer moving parts means fewer concurrency bugs and easier reasoning about state.',
        'Avoid deep nesting (if inside if inside for inside if) — extract guard clauses and early returns to keep methods flat and readable.',
        'Magic numbers/strings scattered through code should become named constants — self-documenting and change-safe in one place.',
      ],
      qa: [],
      code: '// Code smell: magic numbers, deep nesting\nif (status == 3) {\n    if (retries < 5) {\n        // ...\n    }\n}\n\n// Better: named constants + early return (guard clause)\nstatic final int STATUS_FAILED = 3;\nstatic final int MAX_RETRIES = 5;\n\nif (status != STATUS_FAILED) return;\nif (retries >= MAX_RETRIES) return;\n// main logic, flat, no deep nesting',
      flow: { type: 'compare', columns: [
        { title: 'Code smell', points: ['Magic numbers', 'Deep nesting', 'God classes'] },
        { title: 'Best practice', points: ['Named constants', 'Guard clauses', 'Single responsibility'] },
      ] },
    },
    {
      title: 'Effective Java Highlights (Joshua Bloch-style Tips)',
      points: [
        'Favor composition over inheritance when reuse is the only goal — inheritance couples subclass behavior tightly to superclass implementation details that can change.',
        'Minimize mutability — make fields final and classes immutable where possible; immutable objects are automatically thread-safe and easier to reason about.',
        'Always override toString() for debugging-friendly output, and always override equals()/hashCode() together, never just one.',
        'Prefer static factory methods (like List.of(), Optional.of()) over public constructors when you want meaningful names, caching, or to return a subtype.',
        'Use enums instead of int constants for a fixed set of values — enums are type-safe and self-documenting, unlike bare integers.',
      ],
      qa: [],
      code: '// Static factory method instead of a public constructor — clearer, can cache/return subtypes\nclass Color {\n    private static final Color BLACK = new Color(0,0,0);\n    private Color(int r,int g,int b) { }\n    static Color black() { return BLACK; }   // meaningful name + can reuse a cached instance\n}\n\n// Enum instead of int constants\nenum Status { PENDING, ACTIVE, CLOSED }   // type-safe, no invalid values possible\n// NOT: static final int STATUS_PENDING = 0; static final int STATUS_ACTIVE = 1; ...',
      flow: { type: 'pipeline', steps: ['Immutability first', 'Composition over inheritance', 'Static factories', 'Enums over int constants'] },
    },
  ],
};
