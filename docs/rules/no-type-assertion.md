# no-type-assertion

No `as` or angle-bracket type assertions. Use `satisfies` instead. `as const` is still allowed.

## Why

`as` lies to the compiler — it silences errors instead of proving conformance. `satisfies` validates that a value matches a type without changing its inferred type, so excess properties and mismatches stay visible.

## Examples

```typescript
// ✅ GOOD
const config = { host: 'localhost', port: 8080 } satisfies ServerConfig

// ✅ GOOD — const assertions are allowed
const TABS = ['library', 'tasks'] as const

// ❌ BAD
const config = { host: 'localhost', port: 8080 } as ServerConfig

// ❌ BAD — angle-bracket form
const config = <ServerConfig>{ host: 'localhost', port: 8080 }
```

For values of unknown shape, parse with zod instead of asserting:

```typescript
// ✅ GOOD
const user = z.object({ id: z.string() }).parse(input)
```
