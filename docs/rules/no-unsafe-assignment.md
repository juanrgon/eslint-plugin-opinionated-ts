# `no-unsafe-assignment`

Disallows assigning an `any`-typed value to variables and properties.

This rule re-exports the canonical [`@typescript-eslint/no-unsafe-assignment`](https://typescript-eslint.io/rules/no-unsafe-assignment/) implementation under the `opinionated-ts` namespace. It is type-aware, so it catches laundering even when the source's `any` type is inferred rather than written explicitly.

## Included config

Enabled by `opinionated-ts.configs["recommended-type-checked"]`. It is intentionally omitted from the ordinary `recommended` config because it requires TypeScript parser services.

Configure `@typescript-eslint/parser` with type information before enabling it. `parserOptions.projectService: true` is the recommended setup.

## Incorrect

```ts
const parsedState = JSON.parse(text)
const state: AppState = parsedState
```

`JSON.parse` returns `any`, so both assignments bypass validation.

## Correct

```ts
const parsedState: unknown = JSON.parse(text)
const state = appStateSchema.parse(parsedState)
```

Assigning an `any` value to `unknown` is allowed because `unknown` preserves the requirement to narrow or validate it before use.
