export default {
  id: 'collections',
  title: 'Collections Framework',
  color: '#1565C0',
  topics: [
    {
      title: 'Collection Hierarchy Overview',
      points: [
        'Collection interface branches into List, Set, Queue; Map is separate (not a Collection — it stores key-value pairs).',
        'List — ordered, allows duplicates (ArrayList, LinkedList, Vector).',
        'Set — no duplicates (HashSet, LinkedHashSet, TreeSet).',
        'Queue/Deque — FIFO/LIFO structures (ArrayDeque, PriorityQueue, LinkedList).',
        'Map — key→value pairs, keys unique (HashMap, LinkedHashMap, TreeMap, Hashtable).',
      ],
      qa: [],
      code: '// Collection\n//  ├─ List   (ordered, duplicates allowed)  -> ArrayList, LinkedList\n//  ├─ Set    (no duplicates)                -> HashSet, LinkedHashSet, TreeSet\n//  └─ Queue  (FIFO / priority)              -> ArrayDeque, PriorityQueue\n// Map is a SEPARATE hierarchy (not a Collection) -> HashMap, TreeMap, LinkedHashMap\n\nList<String> names = new ArrayList<>();\nMap<String,Integer> ages = new HashMap<>();',
      flow: { type: 'tree', root: 'Collection', children: [
        { label: 'List', sub: 'ArrayList, LinkedList' },
        { label: 'Set', sub: 'HashSet, TreeSet' },
        { label: 'Queue', sub: 'ArrayDeque, PriorityQueue' },
      ] },
    },
    {
      title: 'ArrayList vs LinkedList vs Vector',
      points: [
        'ArrayList — backed by a resizable array; O(1) get by index, O(n) insert/delete in the middle, grows by 1.5x when full, not synchronized.',
        'LinkedList — doubly-linked list; O(1) insert/delete at ends, O(n) get by index; implements both List and Deque.',
        'Vector — legacy (Java 1.0), synchronized version of ArrayList — every method has a synchronized keyword, making it thread-safe but slower even in single-threaded code.',
        'Vector grows by doubling (100% growth) by default, while ArrayList grows by 50% — a minor but sometimes-asked distinction.',
        'Modern code almost never uses Vector directly — prefer ArrayList, and if thread-safety is needed, use Collections.synchronizedList() or CopyOnWriteArrayList instead.',
      ],
      qa: [{ q: 'Why is ArrayList generally preferred over LinkedList in practice?', a: "Contiguous array storage means better cache locality and faster random access; LinkedList's per-node overhead and pointer-chasing rarely pay off unless you specifically need cheap head/tail insertions." }],
      code: 'List<String> a = new ArrayList<>();   // backed by array, fast random access O(1)\na.get(0);                             // O(1)\na.add(0, "x");                        // O(n) — shifts everything right\n\nList<String> l = new LinkedList<>();  // doubly-linked list\nl.addFirst("x"); l.addLast("y");      // O(1) at the ends\nl.get(5);                             // O(n) — must walk the list\n\nVector<String> v = new Vector<>();    // legacy, synchronized, rarely used today\nv.add("x");                           // every method is synchronized -> slower',
      flow: { type: 'compare', columns: [
        { title: 'ArrayList', points: ['Array-backed', 'O(1) get', 'Not synchronized'] },
        { title: 'LinkedList', points: ['Node-linked', 'O(1) ends', 'Deque + List'] },
        { title: 'Vector', points: ['Synchronized', 'Legacy', 'Slower always'] },
      ] },
    },
    {
      title: 'Set Implementations',
      points: [
        'HashSet — backed by a HashMap internally; no order guarantee, O(1) average add/contains, allows one null.',
        'LinkedHashSet — HashSet + a linked list threading through entries to preserve insertion order, slight overhead over HashSet.',
        'TreeSet — backed by a Red-Black tree (via TreeMap); keeps elements in sorted order (natural or via a Comparator), O(log n) operations, no nulls allowed.',
        'All Set implementations reject duplicates based on equals()/hashCode() (HashSet, LinkedHashSet) or compareTo()/Comparator (TreeSet).',
      ],
      qa: [{ q: 'Why can TreeSet not store null, while HashSet can?', a: 'TreeSet needs to compare every element to place it in sorted order, and comparing null to anything throws a NullPointerException — HashSet just hashes it and has one designated bucket reserved for a single null key.' }],
      code: 'Set<String> hs = new HashSet<>();          // no order guarantee\nSet<String> lhs = new LinkedHashSet<>();   // insertion order preserved\nSet<Integer> ts = new TreeSet<>();         // sorted order, O(log n)\n\nts.add(5); ts.add(1); ts.add(3);\nSystem.out.println(ts);   // [1, 3, 5] — always sorted',
      flow: { type: 'compare', columns: [
        { title: 'HashSet', points: ['No order', 'O(1) avg', 'One null allowed'] },
        { title: 'LinkedHashSet', points: ['Insertion order', 'Slight overhead'] },
        { title: 'TreeSet', points: ['Sorted order', 'O(log n)', 'No nulls'] },
      ] },
    },
    {
      title: 'Map Implementations',
      points: [
        'HashMap — array of buckets + hashCode()-based placement; average O(1) get/put, no order guarantee, allows one null key and multiple null values.',
        'LinkedHashMap — HashMap + a doubly-linked list threading entries in insertion (or access) order; great for building an LRU cache with removeEldestEntry().',
        'TreeMap — Red-Black tree, keeps keys sorted, O(log n) operations, implements NavigableMap (floorKey, ceilingKey, firstKey...).',
        'Hashtable — legacy, synchronized (like Vector), disallows null keys/values entirely; ConcurrentHashMap is the modern thread-safe alternative.',
      ],
      qa: [{ q: 'How would you build a simple LRU cache using built-in collections?', a: 'Extend LinkedHashMap with accessOrder=true in its constructor, and override removeEldestEntry() to return true once the map exceeds your desired capacity — LinkedHashMap then automatically evicts the least-recently-used entry on every put/get.' }],
      code: 'Map<String,Integer> hm = new HashMap<>();          // no order, fastest\nMap<String,Integer> lhm = new LinkedHashMap<>();    // insertion order\nMap<String,Integer> tm = new TreeMap<>();           // sorted by key\n\n// LRU cache in ~5 lines using LinkedHashMap\nMap<Integer,String> lru = new LinkedHashMap<>(16, 0.75f, true) {\n    protected boolean removeEldestEntry(Map.Entry<Integer,String> eldest) {\n        return size() > 3;   // evict the least-recently-used entry past capacity 3\n    }\n};',
      flow: { type: 'compare', columns: [
        { title: 'HashMap', points: ['No order', 'Fastest', '1 null key ok'] },
        { title: 'LinkedHashMap', points: ['Insertion/access order', 'LRU-friendly'] },
        { title: 'TreeMap', points: ['Sorted keys', 'NavigableMap API'] },
      ] },
    },
    {
      title: 'HashMap Internal Working',
      points: [
        "A HashMap stores entries in an array of buckets; a key's hashCode() is spread (via an internal hash-spreading function) and masked to pick a bucket index.",
        'Two keys landing in the same bucket ("collision") are chained together — as a linked list traditionally, or, since Java 8, as a balanced Red-Black tree once a bucket has 8+ entries (treeification), keeping worst-case lookup at O(log n) instead of O(n).',
        'Default initial capacity is 16 buckets with a load factor of 0.75 — once size exceeds capacity × loadFactor, the map resizes (doubles) and rehashes every entry into the new bucket array.',
        "get(key) recomputes the key's hash, jumps to its bucket, then walks the chain/tree comparing with equals() to find the exact matching key.",
        'This is exactly why a mutable object used as a HashMap key is dangerous: if its hashCode() changes after insertion, the entry becomes unreachable at its original bucket — you can iterate and see it, but get()/containsKey() with an equal key may fail to find it.',
      ],
      qa: [{ q: 'Why does resizing a HashMap require rehashing every single entry, not just moving them?', a: "A key's bucket index is derived from (hash(key) & (capacity - 1)) — since capacity changes on resize, nearly every key's target bucket index changes too, so each entry must be recomputed and reinserted into the new, larger bucket array." }],
      code: 'class MutableKey {\n    int id;\n    MutableKey(int id){ this.id = id; }\n    public int hashCode(){ return id; }   // hash depends on mutable field — DANGEROUS as a key\n    public boolean equals(Object o){ return o instanceof MutableKey k && k.id == id; }\n}\n\nMap<MutableKey,String> map = new HashMap<>();\nMutableKey k = new MutableKey(1);\nmap.put(k, "value");\nk.id = 2;                         // mutating the key after insertion\nmap.get(new MutableKey(1));       // null! — it now hashes into a different bucket',
      flow: { type: 'pipeline', steps: ['key.hashCode()', 'spread + mask -> bucket index', 'bucket: linked list or tree (8+)', 'equals() finds exact key'] },
    },
    {
      title: 'HashMap vs Hashtable',
      points: [
        'HashMap is not synchronized (not thread-safe by default); Hashtable is fully synchronized on every method — legacy from Java 1.0.',
        'HashMap allows exactly one null key and any number of null values; Hashtable allows neither — inserting a null throws NullPointerException.',
        'HashMap is generally faster in single-threaded contexts because it has no synchronization overhead.',
        'For thread-safe maps in modern code, prefer ConcurrentHashMap over Hashtable — it offers far better concurrent performance via lock striping / CAS operations instead of one global lock.',
      ],
      qa: [{ q: 'Why is ConcurrentHashMap preferred over a synchronized HashMap or Hashtable for concurrent access?', a: "Hashtable and Collections.synchronizedMap(new HashMap<>()) lock the ENTIRE map on every operation, serializing all access; ConcurrentHashMap partitions locking internally (segment/bucket-level locking or CAS operations), letting many threads read and write different parts concurrently." }],
      code: 'Map<String,String> hm = new HashMap<>();\nhm.put(null, "ok");           // allowed — one null key\n\nHashtable<String,String> ht = new Hashtable<>();\n// ht.put(null, "x");         // throws NullPointerException\n\nMap<String,String> safe = new ConcurrentHashMap<>();   // modern thread-safe choice',
      flow: { type: 'compare', columns: [
        { title: 'HashMap', points: ['Not thread-safe', 'Allows null key/values', 'Faster, single-threaded'] },
        { title: 'Hashtable', points: ['Fully synchronized', 'No nulls at all', 'Legacy, avoid in new code'] },
      ] },
    },
    {
      title: 'Comparable vs Comparator',
      points: [
        'Comparable — defines a class\'s own "natural ordering" via compareTo(); implemented by the class itself (public class User implements Comparable<User>).',
        'Comparator — an external, pluggable ordering strategy via compare(a, b); lets you sort the same class multiple different ways without touching the class.',
        'Collections.sort(list) uses Comparable\'s natural order by default; Collections.sort(list, comparator) or list.sort(comparator) uses a custom Comparator.',
        'Comparator.comparing(User::getAge).thenComparing(User::getName) chains multiple sort keys concisely using method references (Java 8+).',
      ],
      qa: [{ q: 'When would you use a Comparator instead of implementing Comparable?', a: "When you need multiple different orderings of the same class (e.g. sort Users by name sometimes, by age other times), or when you can't modify the class's source (a third-party class) — Comparable only lets you define ONE fixed natural ordering." }],
      code: 'class User implements Comparable<User> {\n    String name; int age;\n    public int compareTo(User other) { return this.name.compareTo(other.name); }  // natural order = by name\n}\n\nList<User> users = new ArrayList<>();\nCollections.sort(users);                                    // uses compareTo() -> by name\nusers.sort(Comparator.comparingInt(u -> u.age));            // custom -> by age\nusers.sort(Comparator.comparing((User u) -> u.name).thenComparingInt(u -> u.age));',
      flow: { type: 'compare', columns: [
        { title: 'Comparable', points: ['compareTo()', 'One natural order', 'Class implements it'] },
        { title: 'Comparator', points: ['compare(a,b)', 'Many orderings', 'External, pluggable'] },
      ] },
    },
    {
      title: 'Iterator, ListIterator & Fail-Fast vs Fail-Safe',
      points: [
        'Iterator gives forward-only traversal + safe removal via iterator.remove() (the only safe way to remove while iterating a List/Set).',
        'ListIterator (List only) adds backward traversal, index access, and in-place set()/add() during iteration.',
        "Fail-fast iterators (ArrayList, HashMap, HashSet...) throw ConcurrentModificationException if the collection is structurally modified (add/remove) by anything other than the iterator itself, mid-iteration — detected via an internal modCount counter.",
        'Fail-safe iterators (CopyOnWriteArrayList, ConcurrentHashMap) iterate over a snapshot or tolerate concurrent structural changes without throwing, but may not reflect the very latest updates during that iteration.',
        "for-each loops use an Iterator under the hood — calling list.remove(x) directly inside a for-each (instead of iterator.remove()) is exactly what triggers ConcurrentModificationException.",
      ],
      qa: [{ q: 'How do you safely remove elements from an ArrayList while iterating over it?', a: 'Use an explicit Iterator and call iterator.remove() (never the list\'s own remove() inside a for-each), or use the Collection.removeIf(predicate) method which handles this safely internally.' }],
      code: 'List<Integer> nums = new ArrayList<>(List.of(1,2,3,4,5));\nIterator<Integer> it = nums.iterator();\nwhile (it.hasNext()) {\n    if (it.next() % 2 == 0) it.remove();   // safe — via the iterator itself\n}\n\n// for (Integer n : nums) { if (n % 2 == 0) nums.remove(n); }  // THROWS ConcurrentModificationException\n\nnums.removeIf(n -> n % 2 == 0);   // modern, safe, one-liner alternative',
      flow: { type: 'compare', columns: [
        { title: 'Fail-fast', points: ['ArrayList, HashMap', 'Throws CME on outside mutation', 'Uses modCount check'] },
        { title: 'Fail-safe', points: ['CopyOnWriteArrayList', 'ConcurrentHashMap', 'Snapshot / tolerant iteration'] },
      ] },
    },
    {
      title: 'Queue & Deque in Depth',
      points: [
        'Queue — FIFO by default; core methods come in two flavors: throwing (add, remove, element) and non-throwing/null-returning on failure (offer, poll, peek).',
        'Deque ("double-ended queue") supports insertion/removal at both ends — addFirst/addLast, removeFirst/removeLast — and can act as both a queue and a stack.',
        'ArrayDeque is generally the preferred Stack replacement today (faster, no legacy synchronization overhead) — push()/pop() work like a stack (LIFO).',
        'PriorityQueue orders elements by natural ordering or a Comparator, always giving you the smallest (or highest-priority) element first via peek()/poll() — backed by a binary heap, O(log n) insert/remove.',
      ],
      qa: [{ q: 'Why is ArrayDeque generally preferred over the legacy Stack class?', a: 'Stack extends Vector and inherits its synchronization overhead even when not needed in single-threaded code, plus a somewhat awkward API; ArrayDeque is faster, has a cleaner push()/pop()/peek() stack API, and is the officially recommended replacement.' }],
      code: 'Queue<Integer> q = new ArrayDeque<>();\nq.offer(1); q.offer(2);\nq.poll();                      // 1 — FIFO\n\nDeque<Integer> stack = new ArrayDeque<>();\nstack.push(1); stack.push(2);\nstack.pop();                   // 2 — LIFO, used as a stack\n\nPriorityQueue<Integer> pq = new PriorityQueue<>();\npq.add(5); pq.add(1); pq.add(3);\npq.poll();                      // 1 — smallest first',
      flow: { type: 'compare', columns: [
        { title: 'Queue (FIFO)', points: ['offer/poll/peek', 'First in, first out'] },
        { title: 'Deque (both ends)', points: ['push/pop = stack (LIFO)', 'addFirst/addLast'] },
        { title: 'PriorityQueue', points: ['Binary heap', 'Smallest/priority first'] },
      ] },
    },
    {
      title: 'Thread-Safe Collections (Synchronized vs Concurrent)',
      points: [
        'Collections.synchronizedList/Map/Set wraps a normal collection with synchronized methods — each call is thread-safe individually, but compound actions (check-then-act, iteration) still need external synchronization.',
        'ConcurrentHashMap achieves thread safety with much finer-grained locking (bucket-level or CAS) instead of one global lock, giving far better throughput under contention than a synchronized HashMap.',
        'CopyOnWriteArrayList copies the entire underlying array on every write — reads are lock-free and never throw ConcurrentModificationException, making it ideal for read-heavy, write-rare scenarios like listener lists.',
        'BlockingQueue implementations (ArrayBlockingQueue, LinkedBlockingQueue) add blocking put()/take() methods, forming the backbone of producer-consumer patterns.',
      ],
      qa: [{ q: 'Why is even a synchronized List still not fully safe for a "check-then-act" like "if not present, then add"?', a: 'Each individual method call is atomic, but two threads can both pass the check (isEmpty()/contains()) before either performs the act (add()) — the compound operation itself needs an explicit synchronized block around both steps together.' }],
      code: 'List<String> syncList = Collections.synchronizedList(new ArrayList<>());\nsynchronized (syncList) {                 // needed for compound check-then-act\n    if (!syncList.contains("x")) syncList.add("x");\n}\n\nMap<String,Integer> chm = new ConcurrentHashMap<>();   // fine-grained locking\nList<String> cow = new CopyOnWriteArrayList<>();       // copy-on-write, safe iteration',
      flow: { type: 'compare', columns: [
        { title: 'synchronizedX()', points: ['One global lock', 'Compound ops need extra sync'] },
        { title: 'ConcurrentHashMap', points: ['Fine-grained locking/CAS', 'High throughput'] },
        { title: 'CopyOnWriteArrayList', points: ['Copy on every write', 'Lock-free reads'] },
      ] },
    },
    {
      title: 'Immutable & Unmodifiable Collections',
      points: [
        'List.of(...), Set.of(...), Map.of(...) (Java 9+) create truly immutable collections — any mutation attempt (add, remove, set) throws UnsupportedOperationException.',
        'Collections.unmodifiableList(list) wraps an existing mutable list — the wrapper itself rejects mutation, but the underlying list can still be changed through its original reference, so it is a "view", not a deep guarantee.',
        'List.of() also rejects null elements outright (throws NullPointerException on construction), unlike Collections.unmodifiableList() which just passes nulls through if the source allowed them.',
        'Immutable collections are inherently thread-safe to read from concurrently, with no synchronization needed.',
      ],
      qa: [{ q: 'If you wrap a mutable ArrayList with Collections.unmodifiableList() and then modify the original ArrayList, does the wrapper reflect the change?', a: "Yes — the wrapper is just a thin read-only view over the same underlying list; it blocks mutation THROUGH the wrapper, but changes made directly to the original backing list are still visible through it." }],
      code: 'List<String> immutable = List.of("a", "b", "c");     // Java 9+ — truly immutable\n// immutable.add("d");   // throws UnsupportedOperationException\n\nList<String> mutable = new ArrayList<>(List.of("a", "b"));\nList<String> view = Collections.unmodifiableList(mutable);\nmutable.add("c");         // allowed on the original\nSystem.out.println(view); // [a, b, c] — the "unmodifiable" view still changed!',
      flow: { type: 'compare', columns: [
        { title: 'List.of(...)', points: ['Truly immutable', 'No nulls allowed', 'Java 9+'] },
        { title: 'unmodifiableList()', points: ['Read-only VIEW only', 'Source can still mutate it'] },
      ] },
    },
    {
      title: 'Collections Utility Class & EnumMap/EnumSet',
      points: [
        'The Collections class (java.util) provides static helpers: sort(), reverse(), shuffle(), max(), min(), frequency(), binarySearch(), and the synchronized/unmodifiable wrappers.',
        'Collections.emptyList()/emptySet()/emptyMap() return shared, memory-efficient immutable empty instances instead of allocating a new empty collection each time.',
        'EnumSet is a highly optimized Set implementation exclusively for enum types, internally backed by a bitmask — extremely fast and memory-efficient.',
        'EnumMap is similarly optimized for enum keys, backed by an array indexed by the enum\'s ordinal() — faster than a general-purpose HashMap for enum-keyed data.',
      ],
      qa: [{ q: 'Why is EnumSet so much faster than a regular HashSet<SomeEnum>?', a: "EnumSet stores membership as bits in a single long (or an array of longs for large enums), using the enum constant's ordinal() as the bit index — set operations become simple bitwise operations instead of hashing and bucket traversal." }],
      code: 'enum Day { MON, TUE, WED, THU, FRI, SAT, SUN }\n\nEnumSet<Day> weekend = EnumSet.of(Day.SAT, Day.SUN);       // bitmask-backed, very fast\nEnumMap<Day, String> schedule = new EnumMap<>(Day.class);  // array-backed by ordinal()\nschedule.put(Day.MON, "Standup meeting");\n\nCollections.sort(new ArrayList<>(List.of(3,1,2)));\nCollections.max(List.of(3,1,2));   // 3',
      flow: { type: 'compare', columns: [
        { title: 'EnumSet', points: ['Bitmask-backed', 'Extremely fast', 'Enum-only'] },
        { title: 'EnumMap', points: ['Array-backed by ordinal()', 'Faster than HashMap for enums'] },
      ] },
    },
  ],
};
