import { ESLintUtils } from '@typescript-eslint/utils'

export const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/juanrgon/eslint-plugin-opinionated-ts/blob/main/docs/rules/${name}.md`,
)
