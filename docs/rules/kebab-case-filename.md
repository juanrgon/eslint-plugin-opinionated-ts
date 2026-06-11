# kebab-case-filename

Require file names to be kebab-case.

## Rule details

Every dot-separated segment of the basename must be lowercase letters, digits, and hyphens (`use-track-event.tsx`, `next-auth.d.ts`, `docx-to-html.test.ts`).

```
✅ delete-s3-image.ts
✅ use-track-event.tsx
✅ next-auth.d.ts
✅ pages/_app.tsx          (framework underscore prefix is stripped)
✅ pages/[projectId].tsx   (Next.js dynamic segments name code-level identifiers)

❌ DocumentEditor.tsx
❌ useDebounce.tsx
❌ snake_case_file.ts
```

The error message suggests the kebab-case equivalent (`DocumentEditor.tsx` → `document-editor.tsx`).

## Exemptions

- **Next.js dynamic routes** — any basename containing `[` (`[projectId].tsx`, `[...all].tsx`) is skipped, since the bracketed name is a code-level identifier where camelCase is correct.
- **Framework underscore prefixes** — a single leading `_` (`_app.tsx`, `_document.tsx`) is ignored; the rest of the name is still checked.
- **Virtual filenames** — stdin/editor buffers (`<input>`, `<text>`) are skipped.

## Options

None.
