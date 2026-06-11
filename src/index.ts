import { strictArgs } from './rules/strict-args.js'
import { noExplicitReturnType } from './rules/no-explicit-return-type.js'
import { noEnum } from './rules/no-enum.js'
import { noTypeAssertion } from './rules/no-type-assertion.js'
import { preferTypeOverInterface } from './rules/prefer-type-over-interface.js'
import { kebabCaseFilename } from './rules/kebab-case-filename.js'

const plugin = {
  meta: {
    name: 'eslint-plugin-opinionated-ts',
    version: '0.2.0',
  },
  rules: {
    'strict-args': strictArgs,
    'no-explicit-return-type': noExplicitReturnType,
    'no-enum': noEnum,
    'no-type-assertion': noTypeAssertion,
    'prefer-type-over-interface': preferTypeOverInterface,
    'kebab-case-filename': kebabCaseFilename,
  },
}

const recommended = {
  plugins: {
    'opinionated-ts': plugin,
  },
  rules: {
    'opinionated-ts/strict-args': 'error',
    'opinionated-ts/no-explicit-return-type': 'error',
    'opinionated-ts/no-enum': 'error',
    'opinionated-ts/no-type-assertion': 'error',
    'opinionated-ts/prefer-type-over-interface': 'error',
    'opinionated-ts/kebab-case-filename': 'error',
  },
}

const configs = {
  recommended,
}

export default { ...plugin, configs }
