# eslint-plugin-opinionated-ts

A personal ESLint plugin encoding TypeScript conventions I've settled on after years of trial and error working on large projects solo. These rules are optimized for how my brain works — they reduce decision fatigue and keep my code consistent across all my projects.

This is not a style guide for teams or the community. It's my own set of guardrails. You're welcome to use it, fork it, or cherry-pick ideas, but don't expect these opinions to be uncontroversial.

## Install

Install from the pre-built `release` branch:

```sh
npm install --save-dev github:juanrgon/eslint-plugin-opinionated-ts#release
```

## Prerequisites

Requires `@typescript-eslint/parser` to be configured, since the rules operate on TypeScript AST nodes. If you're using `typescript-eslint`, you likely already have this.

## Usage

Add the recommended config to your `eslint.config.js`:

```js
import opinionatedTs from 'eslint-plugin-opinionated-ts'

export default [
  opinionatedTs.configs.recommended,
  // ... your other configs
]
```

Or enable individual rules:

```js
import opinionatedTs from 'eslint-plugin-opinionated-ts'

export default [
  {
    plugins: {
      'opinionated-ts': opinionatedTs,
    },
    rules: {
      'opinionated-ts/strict-args': 'error',
      'opinionated-ts/no-explicit-return-type': 'error',
    },
  },
]
```

## Rules

| Rule | What it enforces |
| --- | --- |
| [`strict-args`](docs/rules/strict-args.md) | Functions take a single object parameter with an inline object type (name configurable via `allowedNames`). No multiple params, no destructuring, no optional properties (configurable per name via `optionalAllowedFor`), no type references. Callback-position functions are exempt. |
| [`no-explicit-return-type`](docs/rules/no-explicit-return-type.md) | No return type annotations. Let TypeScript infer them. Type predicates (`x is Foo`), overload signatures, and directly recursive functions are exempt; `allowExported` permits annotations on exported functions. Has autofix. |
| [`no-enum`](docs/rules/no-enum.md) | No enums. Use `as const` objects with derived types instead. |
| [`no-type-assertion`](docs/rules/no-type-assertion.md) | No `as` or angle-bracket type assertions. Use `satisfies` instead. `as const` is still allowed. |
| [`prefer-type-over-interface`](docs/rules/prefer-type-over-interface.md) | No `interface` declarations. Use `type` aliases. `declare global`/`declare module` blocks and `.d.ts` files are exempt. Has autofix (`extends` becomes an intersection). |
| `unicorn/filename-case` | All files must use kebab-case. Provided via `eslint-plugin-unicorn` in the recommended config. |

## Dogfooding

The plugin lints its own source with its own rules: `npm run lint` builds `dist/` and runs ESLint with the recommended config over `src/` and `tests/`.
