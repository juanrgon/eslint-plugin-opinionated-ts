import typescriptEslint from '@typescript-eslint/eslint-plugin'

function getNoUnsafeAssignmentRule() {
  const rule = typescriptEslint.rules['no-unsafe-assignment']

  if (!rule) {
    throw new Error(
      '@typescript-eslint/eslint-plugin is missing no-unsafe-assignment',
    )
  }

  return rule
}

export const noUnsafeAssignment = getNoUnsafeAssignmentRule()
