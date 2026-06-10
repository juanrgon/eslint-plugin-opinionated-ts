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
