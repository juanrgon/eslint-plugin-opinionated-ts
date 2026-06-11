import { RuleTester } from '@typescript-eslint/rule-tester'
import { describe, it, afterAll } from 'vitest'
import { noExplicitAny } from '../../src/rules/no-explicit-any.js'

RuleTester.afterAll = afterAll
RuleTester.describe = describe
RuleTester.it = it

const ruleTester = new RuleTester()

ruleTester.run('no-explicit-any', noExplicitAny, {
  valid: [
    'const parsedState: unknown = JSON.parse(text)',
    'type Handler = (...args: unknown[]) => unknown',
    'const value: string = "safe"',
  ],
  invalid: [
    {
      code: 'const parsedState: any = JSON.parse(text)',
      errors: [
        {
          messageId: 'unexpectedAny',
          suggestions: [
            {
              messageId: 'suggestUnknown',
              output: 'const parsedState: unknown = JSON.parse(text)',
            },
            {
              messageId: 'suggestNever',
              output: 'const parsedState: never = JSON.parse(text)',
            },
          ],
        },
      ],
    },
  ],
})
