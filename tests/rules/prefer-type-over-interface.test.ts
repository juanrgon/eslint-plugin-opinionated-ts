import { RuleTester } from '@typescript-eslint/rule-tester'
import { describe, it, afterAll } from 'vitest'
import { preferTypeOverInterface } from '../../src/rules/prefer-type-over-interface.js'

RuleTester.afterAll = afterAll
RuleTester.describe = describe
RuleTester.it = it

const ruleTester = new RuleTester()

ruleTester.run('prefer-type-over-interface', preferTypeOverInterface, {
  valid: [
    'type User = { id: string; name: string }',
    'type Callback = () => void',
  ],
  invalid: [
    {
      code: 'interface User { id: string; name: string }',
      errors: [{ messageId: 'preferType' }],
    },
    {
      code: 'export interface Config { host: string; port: number }',
      errors: [{ messageId: 'preferType' }],
    },
  ],
})
