export default {
  id: 'networking',
  title: 'Networking in Java',
  color: '#0369A1',
  topics: [
    {
      title: 'Networking Concepts: Sockets, Ports & Protocols',
      points: [
        'A socket is one endpoint of a two-way network connection, identified by an IP address + port number; java.net provides the Socket (client) and ServerSocket (server) classes for TCP.',
        'TCP (Socket/ServerSocket) is connection-oriented and reliable (guarantees ordered delivery); UDP (DatagramSocket/DatagramPacket) is connectionless and faster but can drop or reorder packets.',
        'A port is a 16-bit number (0-65535); ports below 1024 are "well-known" (80 for HTTP, 443 for HTTPS, 22 for SSH) and typically require elevated OS privileges to bind.',
        'InetAddress represents an IP address, resolvable from a hostname via InetAddress.getByName("example.com") — this is where DNS resolution happens.',
      ],
      qa: [{ q: 'When would you choose UDP over TCP for a Java application?', a: 'When occasional packet loss is acceptable but low latency matters more than guaranteed delivery/ordering — e.g. live video/audio streaming, real-time multiplayer game state updates — TCP\'s retransmission and ordering guarantees add latency that UDP avoids.' }],
      code: 'InetAddress addr = InetAddress.getByName("example.com");\nSystem.out.println(addr.getHostAddress());   // resolved IP\n\n// TCP is connection-oriented (Socket/ServerSocket)\n// UDP is connectionless (DatagramSocket/DatagramPacket) — faster, unreliable',
      flow: { type: 'compare', columns: [
        { title: 'TCP', points: ['Connection-oriented', 'Reliable, ordered', 'Socket / ServerSocket'] },
        { title: 'UDP', points: ['Connectionless', 'Fast, unreliable', 'DatagramSocket'] },
      ] },
    },
    {
      title: 'Socket Programming: Client-Server with TCP',
      points: [
        'A server calls new ServerSocket(port) then loops on accept() — accept() blocks until a client connects, returning a new Socket dedicated to that one client.',
        'A client calls new Socket(host, port) to connect; both sides then use getInputStream()/getOutputStream() to exchange data, typically wrapped in BufferedReader/PrintWriter for text protocols.',
        'A real server typically hands each accepted Socket off to a new thread (or a thread-pool task) so it can immediately go back to accept()ing the next client, instead of serving clients one at a time.',
        'Always close sockets and their streams (or use try-with-resources) to release the underlying OS file descriptor/port.',
      ],
      qa: [{ q: 'Why does a simple single-threaded server that just loops accept() -> handle -> accept() only serve one client at a time?', a: 'accept() blocks until a new connection arrives, and the code only calls accept() again after fully finishing the previous client\'s handling logic — a second client\'s connection attempt just queues up (or times out) until the first client is done; a real server hands off each accepted socket to its own thread so accept() can be called again immediately.' }],
      code: '// Server\ntry (ServerSocket server = new ServerSocket(8080)) {\n    while (true) {\n        Socket client = server.accept();          // blocks until a client connects\n        new Thread(() -> handle(client)).start();  // hand off, go back to accepting\n    }\n}\n\n// Client\ntry (Socket socket = new Socket("localhost", 8080);\n     PrintWriter out = new PrintWriter(socket.getOutputStream(), true);\n     BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()))) {\n    out.println("Hello server");\n    System.out.println(in.readLine());\n}',
      flow: { type: 'pipeline', steps: ['ServerSocket.accept()', 'new Socket per client', 'hand off to a thread', 'read/write streams'] },
    },
    {
      title: 'URL, URLConnection & HttpURLConnection',
      points: [
        'The URL class parses/represents a web address; url.openStream() gives a quick read-only InputStream for simple GET-and-read use cases.',
        'URLConnection (and its subclass HttpURLConnection) gives finer control: setting request headers, choosing the HTTP method, reading the response code, and both reading and writing the body.',
        'HttpURLConnection is fairly low-level and verbose for modern needs — since Java 11, java.net.http.HttpClient is the modern, fluent, built-in replacement (supports HTTP/2, async requests).',
        'Always set a reasonable connect/read timeout (setConnectTimeout/setReadTimeout) — without one, a hung remote server can block your thread indefinitely.',
      ],
      qa: [{ q: 'Why is java.net.http.HttpClient (Java 11+) generally preferred over HttpURLConnection today?', a: 'HttpClient offers a modern fluent builder API, first-class support for HTTP/2, both synchronous and asynchronous (CompletableFuture-based) requests, and is far less verbose and error-prone than manually configuring an HttpURLConnection.' }],
      code: '// Modern approach — java.net.http (Java 11+)\nHttpClient client = HttpClient.newHttpClient();\nHttpRequest request = HttpRequest.newBuilder()\n    .uri(URI.create("https://api.example.com/data"))\n    .timeout(Duration.ofSeconds(10))\n    .build();\nHttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());\nSystem.out.println(response.statusCode());\nSystem.out.println(response.body());',
      flow: { type: 'compare', columns: [
        { title: 'HttpURLConnection', points: ['Verbose, legacy', 'No HTTP/2', 'Sync only'] },
        { title: 'HttpClient (11+)', points: ['Fluent builder API', 'HTTP/2 support', 'Sync + async'] },
      ] },
    },
  ],
};
