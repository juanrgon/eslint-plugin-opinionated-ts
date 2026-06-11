import typescriptEslint from '@typescript-eslint/eslint-plugin'

function getNoExplicitAnyRule() {
  const rule = typescriptEslint.rules['no-explicit-any']

  if (!rule) {
    throw new Error('@typescript-eslint/eslint-plugin is missing no-explicit-any')
  }

  return rule
}

export const noExplicitAny = getNoExplicitAnyRule()
