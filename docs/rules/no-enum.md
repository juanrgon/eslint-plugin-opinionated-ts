# no-enum

No `enum` declarations (including `const enum`). Use `as const` objects with derived types instead.

## Why

Enums generate runtime objects with surprising semantics (numeric reverse mappings, nominal typing) and don't erase cleanly. `as const` objects are plain JavaScript, structurally typed, and the derived union type works everywhere a string literal does.

## Examples

```typescript
// ✅ GOOD
const STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
} as const
type Status = (typeof STATUS)[keyof typeof STATUS] // 'pending' | 'completed'

// ❌ BAD
enum Status {
  PENDING = 'pending',
  COMPLETED = 'completed',
}
```
