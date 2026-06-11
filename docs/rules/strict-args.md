# strict-args

Functions take a single `args` parameter with an inline object type annotation. No positional parameters, no destructuring, no optional properties, no extracted type references.

## Why

One calling convention everywhere: call sites are self-documenting (`createUser({ name, email, isAdmin })`), adding a field is never a breaking reorder, and the type lives next to the function instead of in a one-off `FooArgs` alias.

## Examples

```typescript
// ✅ GOOD
export function createUser(args: { name: string; email: string; isAdmin: boolean }) {
  return db.insert({ name: args.name, email: args.email, isAdmin: args.isAdmin })
}

// ❌ BAD — positional parameters
export function createUser(name: string, email: string, isAdmin: boolean) {}

// ❌ BAD — destructured parameter
export function createUser({ name, email }: { name: string; email: string }) {}

// ❌ BAD — wrong parameter name
export function createUser(opts: { name: string }) {}

// ❌ BAD — extracted type reference
type CreateUserArgs = { name: string }
export function createUser(args: CreateUserArgs) {}

// ❌ BAD — optional property
export function createUser(args: { name: string; isAdmin?: boolean }) {}
```

## Exemptions

Functions in **callback position** are exempt, because their signatures are dictated by the caller:

- arguments to a call: `[1, 2].map((value) => value + 1)`, `promise.then((result) => ...)`
- object-literal property values: `{ onSuccess: (data) => ... }`, ESLint visitor objects
- JSX expressions: `onChange={(e) => ...}`

The object-property exemption is intentionally broad — handler maps and returned visitor objects make a tighter check too noisy.

TypeScript `this` parameters are ignored.

## Options

```jsonc
{
  "opinionated-ts/strict-args": ["error", { "allowedNames": ["args", "props"] }]
}
```

- `allowedNames` (default: none — any parameter name is accepted) — providing a list opts in to name enforcement, e.g. `["args", "props"]`. The shape checks (single parameter, inline type, no destructuring, no optional properties) apply either way.
- `optionalAllowedFor` (default `[]`) — parameter names whose properties may be optional. Optionality is correct modeling for React props (`className?: string`), but a hidden decision for function args.

```typescript
// with { allowedNames: ["args", "props"], optionalAllowedFor: ["props"] }

// ✅ allowed — optional prop is correct modeling
function Badge(props: { label: string; className?: string }) {}

// ❌ still flagged — optional on args hides a caller decision
function createUser(args: { name: string; isAdmin?: boolean }) {}
```
