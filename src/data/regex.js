export default {
  id: 'regex',
  title: 'Regular Expressions',
  color: '#DB2777',
  topics: [
    {
      title: 'Regex Basics: Pattern & Matcher',
      points: [
        'java.util.regex provides Pattern (a compiled regex) and Matcher (an engine that applies a Pattern to a specific input).',
        'Pattern.compile(regex) compiles once and can be reused across many inputs — much more efficient than String.matches() when checking the same pattern repeatedly in a loop.',
        'matcher.matches() requires the ENTIRE input to match; matcher.find() looks for the next matching subsequence anywhere in the input, and can be called repeatedly to step through multiple matches.',
        'Pattern.compile(regex, Pattern.CASE_INSENSITIVE) and other flags (MULTILINE, DOTALL) change matching behavior without altering the regex text itself.',
      ],
      qa: [{ q: 'Why is Pattern.compile() + reused Matcher preferred over String.matches() inside a loop?', a: 'String.matches() recompiles the regex into a new Pattern object on every single call; compiling once with Pattern.compile() and reusing it across many matcher() calls avoids that repeated, relatively expensive compilation step.' }],
      code: 'Pattern p = Pattern.compile("\\\\d+");        // compiled once\nMatcher m = p.matcher("Order 42, Item 7");\nwhile (m.find()) {\n    System.out.println(m.group());            // "42", then "7"\n}\n\nboolean isNumeric = Pattern.compile("\\\\d+").matcher("12345").matches();  // true — whole string',
      flow: { type: 'pipeline', steps: ['Pattern.compile(regex)', 'pattern.matcher(input)', 'matcher.find() / matches()', 'matcher.group()'] },
    },
    {
      title: 'Character Classes, Quantifiers & Anchors',
      points: [
        'Character classes: \\d (digit), \\D (non-digit), \\w (word char: letters/digits/_), \\W (non-word), \\s (whitespace), \\S (non-whitespace); [abc] matches any one of a/b/c, [^abc] matches anything except them.',
        'Quantifiers: * (0 or more), + (1 or more), ? (0 or 1), {n} (exactly n), {n,m} (between n and m) — all quantifiers are greedy by default (match as much as possible), append ? to make them reluctant/lazy (e.g. +?).',
        'Anchors: ^ (start of input/line), $ (end of input/line), \\b (word boundary) — don\'t consume characters, just assert a position.',
        'Groups (parentheses) capture a sub-match for later retrieval via group(n); (?: ... ) is a non-capturing group used purely for structuring the pattern.',
      ],
      qa: [{ q: 'Why does a greedy quantifier like .* sometimes match more than expected in "<a><b>" when looking for <.*>?', a: 'Greedy .* first tries to consume the ENTIRE rest of the string, then backtracks only as much as needed to let the rest of the pattern match — for "<a><b>" with pattern <.*>, greedy matching finds the LONGEST possible span, matching all the way from the first < to the last >, not the two separate tags.' }],
      code: 'Pattern.compile("<.*>").matcher("<a><b>").find();   // greedy: matches the whole "<a><b>"\nPattern.compile("<.*?>").matcher("<a><b>").find();  // lazy (?):  matches just "<a>"\n\nPattern.compile("\\\\bcat\\\\b").matcher("concatenate cat scatter").results()\n    .forEach(r -> System.out.println(r.start()));   // finds only the standalone word "cat"',
      flow: { type: 'compare', columns: [
        { title: 'Greedy (default)', points: ['* + ? {n,m}', 'Matches as much as possible'] },
        { title: 'Lazy (+ ?)', points: ['*? +? ??', 'Matches as little as possible'] },
      ] },
    },
    {
      title: 'Groups, replaceAll() & Practical Validation Patterns',
      points: [
        'Named groups (?<name>...) let you retrieve a captured group by name (m.group("name")) instead of a fragile numeric index.',
        'String.replaceAll(regex, replacement) can reference captured groups in the replacement text using $1, $2, etc.',
        'Common practical patterns: email — ^[\\w.+-]+@[\\w-]+\\.[a-zA-Z]{2,}$ (simplified); digits only — ^\\d+$; a basic phone-ish pattern — \\d{3}-\\d{3}-\\d{4}.',
        'Regex validation is best-effort for things like emails — a fully RFC-5322-compliant email regex is notoriously huge; most real systems use a simplified pattern plus a confirmation step (e.g. sending a verification link).',
      ],
      qa: [{ q: 'How would you swap "First Last" into "Last, First" using replaceAll and capture groups?', a: 'name.replaceAll("(\\\\w+) (\\\\w+)", "$2, $1") — group 1 captures the first word, group 2 the second, and the replacement string reorders them using their group references $1 and $2.' }],
      code: 'String swapped = "John Smith".replaceAll("(\\\\w+) (\\\\w+)", "$2, $1");   // "Smith, John"\n\nPattern p = Pattern.compile("(?<year>\\\\d{4})-(?<month>\\\\d{2})-(?<day>\\\\d{2})");\nMatcher m = p.matcher("2026-09-20");\nif (m.matches()) {\n    System.out.println(m.group("year"));   // "2026" — named group, clearer than group(1)\n}\n\nboolean validEmail = "a.b@example.com".matches("^[\\\\w.+-]+@[\\\\w-]+\\\\.[a-zA-Z]{2,}$");',
      flow: { type: 'grid', items: [
        { label: '(?<name>...)', sub: 'named capture group' },
        { label: 'replaceAll("$1")', sub: 'group backreference' },
        { label: '^...$', sub: 'full-string validation' },
      ] },
    },
  ],
};
