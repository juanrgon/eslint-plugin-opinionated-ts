# prefer-type-over-interface

No `interface` declarations — use `type` aliases. Has autofix, including `extends` → intersection.

## Why

One way to declare object shapes. `type` handles unions, intersections, mapped types, and conditional types uniformly; interfaces add declaration merging, which is almost never what you want inside your own code.

## Examples

```typescript
// ✅ GOOD
type User = { id: string; name: string }

// ❌ BAD (autofixed to the above)
interface User { id: string; name: string }

// ❌ BAD (autofixed to `type Admin = User & { role: string }`)
interface Admin extends User { role: string }
```

## Exemptions

Declaration merging is the one job only interfaces can do, so the rule skips:

- interfaces inside `declare global { ... }` and `declare module "..." { ... }` blocks
- `.d.ts` files

```typescript
// ✅ allowed — merging into an existing declaration is the point
declare global {
  interface Window { myGlobal: string }
}
```
