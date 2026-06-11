# `no-explicit-any`

Disallows explicit uses of TypeScript's `any` type.

This rule re-exports the canonical [`@typescript-eslint/no-explicit-any`](https://typescript-eslint.io/rules/no-explicit-any/) implementation under the `opinionated-ts` namespace. It complements `no-type-assertion`: replacing an assertion with an `any` annotation is still an unsafe escape hatch and must not be treated as a fix.

## Included config

Enabled by `opinionated-ts.configs.recommended` and `opinionated-ts.configs["recommended-type-checked"]`.

## Incorrect

```ts
const parsedState: any = JSON.parse(text)
type Handler = (...args: any[]) => any
```

## Correct

```ts
const parsedState: unknown = JSON.parse(text)
type Handler = (...args: unknown[]) => unknown
```

`unknown` requires callers to narrow or validate a value before using it.
