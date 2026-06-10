# no-explicit-return-type

No return type annotations — let TypeScript infer them. Has autofix.

## Why

Inferred return types stay correct as the implementation changes; explicit ones drift or force needless widening. If a return type is wrong enough to matter, the error surfaces at the call site or with `satisfies`.

## Examples

```typescript
// ✅ GOOD
export function add(args: { a: number; b: number }) {
  return args.a + args.b
}

// ❌ BAD (autofixed to the above)
export function add(args: { a: number; b: number }): number {
  return args.a + args.b
}
```

## Exemptions

- **Type predicates** (`value is Foo`, `asserts value is Foo`) — they cannot be inferred, and removing them silently breaks narrowing.

  ```typescript
  // ✅ allowed
  const ids = values.filter((id): id is number => id != null)
  function assertDefined(value: unknown): asserts value is NonNullable<unknown> { ... }
  ```

- **Overload signatures** (declarations without a body) — return types are required there.

- **Directly recursive functions** — TypeScript cannot infer a function's return type from itself (TS7023). Heuristic: a named function whose body mentions its own name keeps its annotation. Mutually recursive functions aren't detected — annotate one function in the cycle and add a disable comment.

  ```typescript
  // ✅ allowed
  function walk(args: { value: unknown }): string {
    if (Array.isArray(args.value)) return args.value.map((v) => walk({ value: v })).join(", ")
    return String(args.value)
  }
  ```

### A widening gotcha

A function returning bare string literals infers a *widening* type — `cond ? "a" : "b"` infers `string` in object positions, not `"a" | "b"`. Where the literal union matters, return `as const` literals instead of re-adding the annotation:

```typescript
// ✅ infers "local" | "apiKey"
function mode(args: { value: unknown }) {
  return args.value === "local" ? ("local" as const) : ("apiKey" as const)
}
```
