export default {
  id: 'patterns',
  title: 'Design Patterns',
  color: '#0D9488',
  topics: [
    {
      title: 'Why Design Patterns Matter',
      points: [
        'A design pattern is a reusable, named solution to a commonly recurring design problem — not code you copy-paste, but a proven structural approach.',
        'The classic "Gang of Four" (GoF) book grouped patterns into three families: Creational (object creation), Structural (composing classes/objects), and Behavioral (communication between objects).',
        'Patterns give teams a shared vocabulary — saying "just use a Factory here" communicates an entire design instantly, without re-explaining it from scratch.',
        'Overusing patterns where a simple, direct solution would do is itself an anti-pattern ("pattern-itis") — patterns solve specific recurring problems, they are not a checklist to apply everywhere.',
      ],
      qa: [],
      code: '// Creational  -> Singleton, Factory, Builder, Prototype\n// Structural  -> Adapter, Decorator, Facade, Composite\n// Behavioral  -> Observer, Strategy, Command, Template Method',
      flow: { type: 'grid', items: [
        { label: 'Creational', sub: 'Singleton, Factory, Builder' },
        { label: 'Structural', sub: 'Adapter, Decorator, Facade' },
        { label: 'Behavioral', sub: 'Observer, Strategy, Command' },
      ] },
    },
    {
      title: 'Singleton Pattern',
      points: [
        'Ensures a class has exactly one instance, with a single global access point — commonly used for a shared config, connection pool, or logger.',
        'Eager initialization creates the instance at class-load time (simple, always thread-safe, but created even if never used).',
        'Lazy initialization with double-checked locking (using volatile) creates the instance on first use, avoiding the eager cost, while staying thread-safe.',
        'The enum singleton (enum Singleton { INSTANCE; }) is the simplest, most robust approach — the JVM guarantees only one instance exists, and it\'s inherently serialization- and reflection-attack safe.',
      ],
      qa: [{ q: 'Why is the enum-based singleton considered the safest approach?', a: "The JVM itself guarantees an enum constant is instantiated exactly once, and it automatically handles serialization correctly and resists reflection-based attacks (which can otherwise invoke a private constructor twice on a normal class) — no manual double-checked locking needed." }],
      code: 'public enum ConfigSingleton {\n    INSTANCE;\n    private final Map<String,String> settings = new HashMap<>();\n    public String get(String key) { return settings.get(key); }\n}\nConfigSingleton.INSTANCE.get("db.url");\n\n// Classic lazy, thread-safe double-checked-locking version:\nclass Logger {\n    private static volatile Logger instance;\n    private Logger() { }\n    public static Logger getInstance() {\n        if (instance == null) {\n            synchronized (Logger.class) {\n                if (instance == null) instance = new Logger();\n            }\n        }\n        return instance;\n    }\n}',
      flow: { type: 'compare', columns: [
        { title: 'Eager', points: ['Created at class load', 'Always thread-safe', 'May waste memory'] },
        { title: 'Lazy (double-checked)', points: ['Created on first use', 'volatile + synchronized'] },
        { title: 'Enum singleton', points: ['JVM-guaranteed', 'Safest, simplest'] },
      ] },
    },
    {
      title: 'Factory & Builder Patterns',
      points: [
        'Factory Method — delegates object creation to a subclass/method instead of calling new directly, so the calling code depends only on an interface/abstract type.',
        'Abstract Factory — a "factory of factories": produces families of related objects (e.g. a UIFactory that creates matching Button + Checkbox for a given theme).',
        'Builder — separates constructing a complex object step-by-step from its final representation; especially useful when a constructor would otherwise need many optional parameters ("telescoping constructor" problem).',
        'A fluent Builder chains setter-like methods that each return this, ending in a build() call that produces the final immutable object.',
      ],
      qa: [{ q: 'What problem does the Builder pattern solve that a big constructor with many parameters does not?', a: 'It avoids the "telescoping constructor" problem (many overloaded constructors, or one huge one with easily-confused positional parameters) by letting the caller set only the fields they care about, by name, in any order, before a final build() assembles a validated, immutable object.' }],
      code: 'interface Shape { void draw(); }\nclass Circle implements Shape { public void draw(){ System.out.println("Circle"); } }\nclass ShapeFactory {\n    static Shape create(String type) {\n        return switch (type) { case "circle" -> new Circle(); default -> throw new IllegalArgumentException(); };\n    }\n}\n\nclass Pizza {\n    private final String size; private final boolean cheese;\n    private Pizza(Builder b) { size = b.size; cheese = b.cheese; }\n    static class Builder {\n        private String size = "medium"; private boolean cheese = false;\n        Builder size(String s) { size = s; return this; }\n        Builder cheese(boolean c) { cheese = c; return this; }\n        Pizza build() { return new Pizza(this); }\n    }\n}\nPizza p = new Pizza.Builder().size("large").cheese(true).build();',
      flow: { type: 'pipeline', steps: ['Builder.size()', '.cheese()', '.build()', 'immutable Pizza object'] },
    },
    {
      title: 'Observer & Strategy Patterns',
      points: [
        'Observer — a subject maintains a list of observers and notifies them all automatically when its state changes; the basis of event listeners, MVC view updates, and reactive programming.',
        'Strategy — encapsulates interchangeable algorithms behind a common interface, letting the algorithm vary independently from the client that uses it (e.g. different sorting or pricing strategies swapped at runtime).',
        'Java\'s built-in Comparator is a textbook Strategy pattern — the sort algorithm stays the same, only the comparison strategy plugged in changes.',
        'PropertyChangeListener (java.beans) and the general publish-subscribe pattern used in messaging systems are real-world Observer implementations.',
      ],
      qa: [],
      code: 'interface Observer { void update(String event); }\nclass EventBus {\n    private List<Observer> observers = new ArrayList<>();\n    void subscribe(Observer o) { observers.add(o); }\n    void publish(String event) { observers.forEach(o -> o.update(event)); }\n}\n\ninterface DiscountStrategy { double apply(double price); }\nclass BlackFridayDiscount implements DiscountStrategy {\n    public double apply(double price) { return price * 0.5; }\n}\nclass Checkout {\n    DiscountStrategy strategy;    // swappable at runtime\n    double total(double price) { return strategy.apply(price); }\n}',
      flow: { type: 'compare', columns: [
        { title: 'Observer', points: ['Subject notifies observers', 'Event listeners, pub/sub'] },
        { title: 'Strategy', points: ['Swappable algorithm', 'Comparator, pricing rules'] },
      ] },
    },
  ],
};
