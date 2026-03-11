import { RuleTester } from '@typescript-eslint/rule-tester'
import { describe, it, afterAll } from 'vitest'
import { noEnum } from '../../src/rules/no-enum.js'

RuleTester.afterAll = afterAll
RuleTester.describe = describe
RuleTester.it = it

const ruleTester = new RuleTester()

ruleTester.run('no-enum', noEnum, {
  valid: [
    'const STATUS = { PENDING: "pending", DONE: "done" } as const',
    'type Status = "pending" | "done"',
  ],
  invalid: [
    {
      code: 'enum Status { PENDING = "pending", DONE = "done" }',
      errors: [{ messageId: 'noEnum' }],
    },
    {
      code: 'const enum Direction { Up, Down }',
      errors: [{ messageId: 'noEnum' }],
    },
  ],
})
