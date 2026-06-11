import { RuleTester } from '@typescript-eslint/rule-tester'
import { describe, it, afterAll } from 'vitest'
import { noUnsafeAssignment } from '../../src/rules/no-unsafe-assignment.js'

RuleTester.afterAll = afterAll
RuleTester.describe = describe
RuleTester.it = it

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      projectService: {
        allowDefaultProject: ['*.ts'],
      },
      tsconfigRootDir: import.meta.dirname,
    },
  },
})

ruleTester.run('no-unsafe-assignment', noUnsafeAssignment, {
  valid: [
    'const parsedState: unknown = JSON.parse(text)',
    'declare const value: any; const safe: unknown = value',
    'const value: string = "safe"',
  ],
  invalid: [
    {
      code: `
        type AppState = { activeTool: string }
        const parsedState = JSON.parse(text)
        const state: AppState = parsedState
      `,
      errors: [
        { messageId: 'anyAssignment' },
        { messageId: 'anyAssignment' },
      ],
    },
  ],
})
