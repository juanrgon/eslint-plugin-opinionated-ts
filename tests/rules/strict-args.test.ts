import { RuleTester } from '@typescript-eslint/rule-tester'
import { describe, it, afterAll } from 'vitest'
import { strictArgs } from '../../src/rules/strict-args.js'

RuleTester.afterAll = afterAll
RuleTester.describe = describe
RuleTester.it = it

const ruleTester = new RuleTester()

ruleTester.run('strict-args', strictArgs, {
  valid: [
    // Zero params is fine
    'function foo() { return 1 }',
    'const foo = () => 1',

    // Single args with inline type
    'function foo(args: { name: string }) { return args.name }',
    'const foo = (args: { id: number; name: string }) => args.id',
    'export function createUser(args: { name: string; email: string }) { return args }',

    // No type annotation (we don't enforce types, just validate shape if present)
    'function foo(args) { return args }',

    // `this` parameter should be ignored
    'function foo(this: Context, args: { id: string }) { return args.id }',
    'function foo(this: Window) { return this }',
  ],
  invalid: [
    // Multiple params
    {
      code: 'function foo(a: string, b: number) { return a }',
      errors: [{ messageId: 'singleArg' }],
    },
    // Wrong param name
    {
      code: 'function foo(opts: { name: string }) { return opts.name }',
      errors: [{ messageId: 'argName' }],
    },
    // Type reference instead of inline
    {
      code: 'type Opts = { name: string }; function foo(args: Opts) { return args }',
      errors: [{ messageId: 'inlineType' }],
    },
    // Optional property
    {
      code: 'function foo(args: { name: string; age?: number }) { return args }',
      errors: [{ messageId: 'noOptional' }],
    },
    // Destructured params
    {
      code: 'function foo({ name }: { name: string }) { return name }',
      errors: [{ messageId: 'noDestructure' }],
    },
    // Arrow with destructured params
    {
      code: 'const foo = ({ id }: { id: string }) => id',
      errors: [{ messageId: 'noDestructure' }],
    },
    // Array destructuring
    {
      code: 'function foo([a, b]: [string, number]) { return a }',
      errors: [{ messageId: 'noDestructure' }],
    },
    // Rest element
    {
      code: 'function foo(...args: string[]) { return args }',
      errors: [{ messageId: 'singleArg' }],
    },
    // `this` param + multiple real params should still error
    {
      code: 'function foo(this: Context, a: string, b: number) { return a }',
      errors: [{ messageId: 'singleArg' }],
    },
  ],
})
