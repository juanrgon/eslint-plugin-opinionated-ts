import { strictArgs } from './rules/strict-args.js'
import { noExplicitReturnType } from './rules/no-explicit-return-type.js'
import { noEnum } from './rules/no-enum.js'
import { noTypeAssertion } from './rules/no-type-assertion.js'
import { preferTypeOverInterface } from './rules/prefer-type-over-interface.js'
import { kebabCaseFilename } from './rules/kebab-case-filename.js'
import { noExplicitAny } from './rules/no-explicit-any.js'
import { noUnsafeAssignment } from './rules/no-unsafe-assignment.js'

const plugin = {
  meta: {
    name: 'eslint-plugin-opinionated-ts',
    version: '0.3.0',
  },
  rules: {
    'strict-args': strictArgs,
    'no-explicit-return-type': noExplicitReturnType,
    'no-enum': noEnum,
    'no-type-assertion': noTypeAssertion,
    'prefer-type-over-interface': preferTypeOverInterface,
    'kebab-case-filename': kebabCaseFilename,
    'no-explicit-any': noExplicitAny,
    'no-unsafe-assignment': noUnsafeAssignment,
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
    'opinionated-ts/no-explicit-any': 'error',
  },
}

const recommendedTypeChecked = {
  plugins: {
    'opinionated-ts': plugin,
  },
  rules: {
    ...recommended.rules,
    'opinionated-ts/no-unsafe-assignment': 'error',
  },
}

const configs = {
  recommended,
  'recommended-type-checked': recommendedTypeChecked,
}

export default { ...plugin, configs }
