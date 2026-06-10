// Dogfood: the plugin lints its own source with its own rules.
// `npm run lint` builds dist/ first, then runs eslint against it.
import tsParser from '@typescript-eslint/parser'
import opinionatedTs from './dist/index.js'

export default [
  {
    ignores: ['dist/', 'node_modules/', 'tsup.config.ts'],
  },
  {
    files: ['src/**/*.ts', 'tests/**/*.ts', 'eslint.config.js'],
    languageOptions: {
      parser: tsParser,
    },
    plugins: opinionatedTs.configs.recommended.plugins,
    rules: opinionatedTs.configs.recommended.rules,
  },
]
