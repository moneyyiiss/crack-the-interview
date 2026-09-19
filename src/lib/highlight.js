// Very small Java-flavoured syntax highlighter — good enough for short snippets.
// Single-pass tokenizer: every match is handled in ONE regex.replace call, so
// injected markup is never re-scanned by a later pass.

const JAVA_KEYWORD_LIST =
  'public|private|protected|static|final|abstract|class|interface|enum|extends|implements|new|return|if|else|for|while|do|switch|case|default|break|continue|try|catch|finally|throw|throws|this|super|void|synchronized|volatile|transient|package|import|instanceof|null|true|false|var';

const JAVA_TYPE_LIST =
  'int|long|short|byte|float|double|char|boolean|String|Integer|Long|Double|Float|Boolean|Character|Object|List|ArrayList|LinkedList|Map|HashMap|TreeMap|LinkedHashMap|Set|HashSet|TreeSet|LinkedHashSet|Deque|ArrayDeque|Queue|PriorityQueue|Optional|Stream|Collectors|Thread|Runnable|Callable|Future|CompletableFuture|ExecutorService|Executors|AtomicInteger|ReentrantLock|Comparator|Comparable|Number|Exception|RuntimeException|IOException|Path|Files|Scanner|BufferedReader|BufferedWriter|FileReader|FileWriter|InputStream|OutputStream|Reader|Writer|Class';

const JAVA_TOKEN_RE = new RegExp(
  '(//[^\\n]*)' + // 1: line comment
    '|("[^"]*")' + // 2: string literal
    '|\\b(' +
    JAVA_TYPE_LIST +
    ')\\b' + // 3: type
    '|\\b(' +
    JAVA_KEYWORD_LIST +
    ')\\b' + // 4: keyword
    '|\\b(\\d[\\d_]*\\.?\\d*[fFlLdD]?)\\b', // 5: number
  'g'
);

export function esc(s) {
  return String(s).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
}

export function highlightCode(code) {
  const escaped = esc(code); // escape & < > once, up front — never touched again
  return escaped.replace(JAVA_TOKEN_RE, (m, cmt, str, type, kw, num) => {
    if (cmt !== undefined) return '<span class="code-cmt">' + cmt + '</span>';
    if (str !== undefined) return '<span class="code-str">' + str + '</span>';
    if (type !== undefined) return '<span class="code-type">' + type + '</span>';
    if (kw !== undefined) return '<span class="code-kw">' + kw + '</span>';
    if (num !== undefined) return '<span class="code-num">' + num + '</span>';
    return m;
  });
}

export function initials(title) {
  const words = title.replace(/[^A-Za-z0-9 +]/g, ' ').trim().split(/\s+/);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}
