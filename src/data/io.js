export default {
  id: 'io',
  title: 'File Handling & I/O',
  color: '#78716C',
  topics: [
    {
      title: 'java.io Basics: Byte Streams vs Character Streams',
      points: [
        'Byte streams (InputStream/OutputStream family) read/write raw 8-bit bytes — used for binary data (images, audio, any non-text file).',
        'Character streams (Reader/Writer family) read/write 16-bit Unicode characters, handling text encoding (UTF-8, etc.) correctly — always prefer these for text.',
        'FileInputStream/FileOutputStream are the basic byte-stream file classes; FileReader/FileWriter are their character-stream text counterparts.',
        'Buffered wrappers (BufferedInputStream, BufferedReader) batch reads/writes into larger chunks, dramatically reducing the number of expensive underlying I/O system calls.',
        'The Decorator pattern is used throughout java.io — you wrap one stream inside another to layer on buffering, or object-level reading (ObjectInputStream), etc.',
      ],
      qa: [{ q: 'Why should you almost always wrap a FileReader in a BufferedReader?', a: 'A plain FileReader performs a system call for nearly every character/small read; BufferedReader reads a large chunk into an internal buffer at once and serves subsequent reads from memory, which is dramatically faster for anything beyond a trivial amount of data.' }],
      code: '// Byte stream — for binary data\ntry (FileInputStream fis = new FileInputStream("photo.jpg")) {\n    int b = fis.read();\n}\n\n// Character stream — for text, wrapped in a buffer for speed\ntry (BufferedReader br = new BufferedReader(new FileReader("notes.txt"))) {\n    String line = br.readLine();\n}',
      flow: { type: 'tree', root: 'java.io Streams', children: [
        { label: 'Byte Streams', sub: 'InputStream / OutputStream' },
        { label: 'Character Streams', sub: 'Reader / Writer' },
      ] },
    },
    {
      title: 'Reading & Writing Files: Common Patterns',
      points: [
        'try-with-resources should always wrap file streams — guarantees close() runs even on an exception, avoiding file-handle leaks.',
        'Files.readAllLines(path) / Files.readString(path) (NIO, Java 11+) are the simplest modern one-liners for reading a whole small-to-medium text file.',
        'BufferedWriter.newLine() writes a platform-correct line separator, instead of hardcoding "\\n" (which is wrong on some legacy platforms).',
        'PrintWriter offers convenient printf()-style formatted output directly to a file.',
      ],
      qa: [],
      code: '// Modern, simple whole-file read (Java 11+)\nString content = Files.readString(Path.of("notes.txt"));\nList<String> lines = Files.readAllLines(Path.of("notes.txt"));\n\n// Writing, with try-with-resources auto-closing\ntry (BufferedWriter bw = Files.newBufferedWriter(Path.of("out.txt"))) {\n    bw.write("first line");\n    bw.newLine();\n    bw.write("second line");\n}',
      flow: { type: 'pipeline', steps: ['Path.of("file.txt")', 'Files.readString/readAllLines', 'process content', 'Files.write / BufferedWriter'] },
    },
    {
      title: 'java.nio & the Files/Path API',
      points: [
        'java.nio.file (NIO.2, Java 7+) replaces most legacy java.io.File usage — Path represents a file/directory location, Files holds static utility methods.',
        'Files.exists(), Files.createDirectories(), Files.copy(), Files.move(), Files.delete() cover most common filesystem operations in one line each.',
        'Files.walk(path) / Files.list(path) return a Stream<Path> for recursively/directly listing directory contents, composable with the Stream API.',
        'WatchService lets you subscribe to filesystem change notifications (created/modified/deleted) without polling.',
      ],
      qa: [],
      code: 'Path dir = Path.of("data");\nFiles.createDirectories(dir);\n\ntry (Stream<Path> paths = Files.walk(dir)) {\n    paths.filter(Files::isRegularFile)\n         .filter(p -> p.toString().endsWith(".txt"))\n         .forEach(System.out::println);\n}\n\nFiles.copy(Path.of("a.txt"), Path.of("b.txt"), StandardCopyOption.REPLACE_EXISTING);',
      flow: { type: 'compare', columns: [
        { title: 'java.io.File (legacy)', points: ['Limited error info', 'No symbolic-link support'] },
        { title: 'java.nio.file (modern)', points: ['Path + Files', 'Streams, WatchService', 'Richer error handling'] },
      ] },
    },
    {
      title: 'Serialization',
      points: [
        'A class must implement the Serializable marker interface to have its objects converted to a byte stream via ObjectOutputStream.writeObject().',
        'transient fields are explicitly excluded from serialization — commonly used for passwords, caches, or non-serializable fields like a Thread or Connection.',
        'serialVersionUID (a static final long) lets the JVM verify a serialized object matches the currently-loaded class version — mismatches throw InvalidClassException during deserialization.',
        'Deserializing untrusted data is a well-known security risk (arbitrary code execution via crafted byte streams) — never deserialize data from an untrusted source without validation.',
        'Records and modern APIs increasingly favor JSON/Protobuf over native Java serialization for cross-version, cross-language compatibility.',
      ],
      qa: [{ q: 'What happens if you deserialize an object whose class no longer matches the serialVersionUID on disk?', a: 'The JVM throws InvalidClassException — this is a safety check to prevent silently loading a byte stream that was serialized against an incompatible version of the class.' }],
      code: 'class User implements Serializable {\n    private static final long serialVersionUID = 1L;\n    String name;\n    transient String sessionToken;   // deliberately NOT serialized\n}\n\ntry (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("user.ser"))) {\n    oos.writeObject(new User());\n}\ntry (ObjectInputStream ois = new ObjectInputStream(new FileInputStream("user.ser"))) {\n    User u = (User) ois.readObject();   // sessionToken will be null after deserializing\n}',
      flow: { type: 'pipeline', steps: ['User object', 'ObjectOutputStream', 'user.ser (bytes)', 'ObjectInputStream', 'restored object'] },
    },
    {
      title: 'Common I/O Interview Questions',
      points: [
        'Difference between File and Path: File is the legacy (Java 1.0) class with limited operations; Path (NIO.2) is the modern, richer replacement, usually paired with the Files utility class.',
        'Scanner is convenient for parsing tokenized/mixed-type input (numbers and text together) but is noticeably slower than BufferedReader for pure line-by-line text reading.',
        'System.in / System.out / System.err are the standard input/output/error streams, always available without opening anything.',
        'Always close streams (or use try-with-resources) — an unclosed file handle can exhaust OS file-descriptor limits under load, causing "too many open files" errors.',
      ],
      qa: [],
      code: '// File (legacy) vs Path (modern)\nFile oldWay = new File("data.txt");\nPath newWay = Path.of("data.txt");\n\n// Scanner: flexible mixed-type parsing, slower\nScanner sc = new Scanner(System.in);\nint n = sc.nextInt();\n\n// BufferedReader: fast line-based text reading\nBufferedReader br = new BufferedReader(new InputStreamReader(System.in));\nString line = br.readLine();',
      flow: { type: 'compare', columns: [
        { title: 'File (legacy)', points: ['Limited API', 'Java 1.0'] },
        { title: 'Path + Files (NIO.2)', points: ['Richer API', 'Streams support'] },
      ] },
    },
    {
      title: 'Console & Standard I/O: Scanner vs BufferedReader',
      points: [
        'Scanner wraps an InputStream/Reader and tokenizes it, parsing typed values directly (nextInt(), nextDouble(), nextLine()) — very convenient but built on regex matching under the hood, making it slower for bulk input.',
        'A very common trap: calling nextInt() then nextLine() right after — nextInt() leaves the trailing newline character in the buffer, so the following nextLine() immediately reads an empty string. Fix: add an extra sc.nextLine() to consume the leftover newline, or use sc.nextLine() and parse manually.',
        'BufferedReader.readLine() reads a full line as a raw String with no built-in parsing, but is significantly faster for competitive programming/large-input scenarios.',
        'Console (System.console()) provides secure password-style input (readPassword(), not echoed to the screen), but returns null when not attached to an interactive terminal (e.g. inside most IDEs).',
      ],
      qa: [{ q: 'Why does calling sc.nextInt() followed immediately by sc.nextLine() often produce an unexpectedly empty string?', a: "nextInt() only consumes the digits of the number, leaving the newline character (from the Enter key) still sitting in the input buffer; the very next nextLine() call then reads up to that leftover newline, returning an empty string instead of the next real line of input." }],
      code: 'Scanner sc = new Scanner(System.in);\nint age = sc.nextInt();\nsc.nextLine();          // consumes the leftover newline — classic fix\nString name = sc.nextLine();\n\n// Faster alternative for large/competitive input\nBufferedReader br = new BufferedReader(new InputStreamReader(System.in));\nint n = Integer.parseInt(br.readLine().trim());',
      flow: { type: 'compare', columns: [
        { title: 'Scanner', points: ['Typed parsing', 'Convenient', 'Slower, newline gotcha'] },
        { title: 'BufferedReader', points: ['Raw lines only', 'Very fast', 'Manual parsing needed'] },
      ] },
    },
  ],
};
