# Java Interview Prep

A simple, checklist-style Java interview prep site — quick revision points,
sample interview Q&A, and per-topic progress tracking (saved in your browser).

## Structure

- `index.html` — the whole app (layout, styles, and UI logic in one file)
- `data.js` — all the content: 12 categories, ~58 topics, each with quick-revision
  bullet points and a few sample interview questions

## Editing content

All content lives in `data.js` as a single `CATEGORIES` array. Each category has:

```js
{
  id: "generics",
  title: "Generics",
  color: "#00897B",
  topics: [
    {
      title: "Topic title",
      points: ["bullet point 1", "bullet point 2", ...],
      qa: [{ q: "question", a: "answer" }, ...]
    }
  ]
}
```

Add a new topic by adding an object to a category's `topics` array. Add a new
category by adding an object to the top-level `CATEGORIES` array.

## Deploy

This repo is connected to Vercel — every push to `main` deploys automatically.
No build step; it's a static site.
