import { RuleTester } from '@typescript-eslint/rule-tester'
import { describe, it, afterAll } from 'vitest'
import { noTypeAssertion } from '../../src/rules/no-type-assertion.js'

RuleTester.afterAll = afterAll
RuleTester.describe = describe
RuleTester.it = it

const ruleTester = new RuleTester()

ruleTester.run('no-type-assertion', noTypeAssertion, {
  valid: [
    // satisfies is allowed
    'const config = { host: "localhost" } satisfies ServerConfig',
    // as const is allowed
    'const ITEMS = ["a", "b"] as const',
    'const OBJ = { a: 1 } as const',
    // no assertion at all
    'const x = 42',
  ],
  invalid: [
    {
      code: 'const config = { host: "localhost" } as ServerConfig',
      errors: [{ messageId: 'noAs' }],
    },
    {
      code: 'const x = value as string',
      errors: [{ messageId: 'noAs' }],
    },
    {
      code: 'const y = foo as unknown as Bar',
      errors: [{ messageId: 'noAs' }, { messageId: 'noAs' }],
    },
  ],
})
