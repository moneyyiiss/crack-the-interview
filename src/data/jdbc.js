export default {
  id: 'jdbc',
  title: 'JDBC (Database Connectivity)',
  color: '#166534',
  topics: [
    {
      title: 'JDBC Introduction & the 5 Steps to Connect',
      points: [
        'JDBC (Java Database Connectivity) is a standard API for connecting Java applications to relational databases, independent of which specific database vendor you use.',
        'A JDBC Driver is the vendor-specific implementation that translates the standard JDBC calls into that database\'s wire protocol (e.g. the MySQL Connector/J driver, the PostgreSQL JDBC driver).',
        'Since JDBC 4.0 (Java 6+), Class.forName("...Driver") is no longer required — DriverManager auto-discovers drivers on the classpath via the Service Provider Interface (META-INF/services).',
        'The 5 classic steps: (1) load the driver [auto since 4.0], (2) open a Connection via DriverManager.getConnection(url, user, pass), (3) create a Statement/PreparedStatement, (4) execute the query and process the ResultSet, (5) close everything (or use try-with-resources).',
      ],
      qa: [{ q: 'Do you still need Class.forName("com.mysql.cj.jdbc.Driver") in modern JDBC code?', a: "No — since JDBC 4.0 (Java 6+), compliant drivers register themselves automatically via the ServiceLoader mechanism (a file listing the driver class under META-INF/services), so DriverManager.getConnection() finds the right driver without any manual loading step, as long as the driver JAR is on the classpath." }],
      code: 'String url = "jdbc:mysql://localhost:3306/mydb";\ntry (Connection conn = DriverManager.getConnection(url, "root", "password");\n     Statement stmt = conn.createStatement();\n     ResultSet rs = stmt.executeQuery("SELECT id, name FROM users")) {\n    while (rs.next()) {\n        System.out.println(rs.getInt("id") + ": " + rs.getString("name"));\n    }\n}   // try-with-resources closes rs, stmt, and conn automatically, in reverse order',
      flow: { type: 'pipeline', steps: ['DriverManager.getConnection()', 'Connection', 'Statement', 'ResultSet', 'close (try-with-resources)'] },
    },
    {
      title: 'Statement vs PreparedStatement vs CallableStatement',
      points: [
        'Statement executes a plain SQL string as-is — simple, but rebuilds/reparses the query every time and is vulnerable to SQL injection if you concatenate user input into the SQL text.',
        'PreparedStatement precompiles a parameterized SQL template (with ? placeholders) — the database can cache/reuse the execution plan, and parameter values are sent separately from the SQL text, which is the standard defense against SQL injection.',
        'CallableStatement is used to invoke a stored procedure in the database, supporting IN, OUT, and INOUT parameters.',
        'Always prefer PreparedStatement over string-concatenated Statement queries whenever any value comes from outside your own code (user input, external systems).',
      ],
      qa: [{ q: 'Why does PreparedStatement prevent SQL injection when Statement with string concatenation does not?', a: "PreparedStatement sends the SQL template and the parameter VALUES as two separate things to the database — the database driver never re-interprets a bound parameter's contents as part of the SQL syntax, so a malicious value like \"'; DROP TABLE users; --\" is treated purely as a literal string value, not executable SQL." }],
      code: '// VULNERABLE — never do this with untrusted input\nStatement stmt = conn.createStatement();\nResultSet rs = stmt.executeQuery("SELECT * FROM users WHERE name = \'" + userInput + "\'");\n\n// SAFE — parameter is bound separately, not concatenated into SQL text\nPreparedStatement ps = conn.prepareStatement("SELECT * FROM users WHERE name = ?");\nps.setString(1, userInput);\nResultSet rs2 = ps.executeQuery();\n\nCallableStatement cs = conn.prepareCall("{call getUserById(?, ?)}");\ncs.setInt(1, 42);\ncs.registerOutParameter(2, Types.VARCHAR);\ncs.execute();',
      flow: { type: 'compare', columns: [
        { title: 'Statement', points: ['Plain SQL string', 'SQL injection risk', 'No plan caching'] },
        { title: 'PreparedStatement', points: ['Parameterized (?)', 'Injection-safe', 'Plan can be cached'] },
      ] },
    },
    {
      title: 'ResultSet, Transactions & Connection Pooling',
      points: [
        'ResultSet is a cursor over the query results — rs.next() advances one row at a time and returns false when exhausted; getters like getInt("col")/getString(idx) read the current row.',
        'By default, each statement auto-commits immediately; conn.setAutoCommit(false) lets you group multiple statements into one atomic transaction, finished with conn.commit() or rolled back with conn.rollback() on failure.',
        'Opening a raw database connection is expensive (TCP handshake, auth); a connection pool (HikariCP, Apache DBCP) keeps a set of ready-to-use connections open and hands them out/reclaims them per request, which is essential for real application performance.',
        'ResultSetMetaData (rs.getMetaData()) lets you inspect column names/types/count dynamically, useful for generic data-processing code that doesn\'t know the schema in advance.',
      ],
      qa: [{ q: 'Why does almost every production Java application use a connection pool instead of opening a new Connection per request?', a: "Establishing a raw JDBC connection involves a network round-trip, TCP handshake, and authentication — all noticeably slow compared to executing a query; a pool keeps a set of connections already open and simply lends/returns them, cutting typical per-request connection overhead from tens of milliseconds to near zero." }],
      code: 'conn.setAutoCommit(false);\ntry {\n    PreparedStatement debit = conn.prepareStatement("UPDATE accounts SET balance = balance - ? WHERE id = ?");\n    debit.setDouble(1, 100); debit.setInt(2, 1); debit.executeUpdate();\n\n    PreparedStatement credit = conn.prepareStatement("UPDATE accounts SET balance = balance + ? WHERE id = ?");\n    credit.setDouble(1, 100); credit.setInt(2, 2); credit.executeUpdate();\n\n    conn.commit();          // both updates succeed together\n} catch (SQLException e) {\n    conn.rollback();        // either fails -> undo both\n}',
      flow: { type: 'pipeline', steps: ['setAutoCommit(false)', 'multiple statements', 'commit() or rollback()', 'connection returned to pool'] },
    },
  ],
};
