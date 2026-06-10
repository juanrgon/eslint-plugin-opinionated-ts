import { RuleTester } from '@typescript-eslint/rule-tester'
import { describe, it, afterAll } from 'vitest'
import { noExplicitReturnType } from '../../src/rules/no-explicit-return-type.js'

RuleTester.afterAll = afterAll
RuleTester.describe = describe
RuleTester.it = it

const ruleTester = new RuleTester()

ruleTester.run('no-explicit-return-type', noExplicitReturnType, {
  valid: [
    'function add(args: { a: number; b: number }) { return args.a + args.b }',
    'const greet = (args: { name: string }) => `Hello ${args.name}`',
    'export function doStuff() { return 42 }',
    // Overload signatures (no body) should be allowed
    'function generate(args: { id: string }): string;',
    // Type predicates cannot be inferred — removing them breaks narrowing
    'function isString(value: unknown): value is string { return typeof value === "string" }',
    'const isNumber = (value: unknown): value is number => typeof value === "number"',
    'function assertDefined(value: unknown): asserts value is NonNullable<unknown> { if (value == null) throw new Error() }',
    'const ids = values.filter((id): id is number => id != null)',
    'const obj = { isFoo(value: unknown): value is string { return typeof value === "string" } }',
  ],
  invalid: [
    {
      code: 'function add(args: { a: number; b: number }): number { return args.a + args.b }',
      output: 'function add(args: { a: number; b: number }) { return args.a + args.b }',
      errors: [{ messageId: 'noReturnType' }],
    },
    {
      code: 'const greet = (args: { name: string }): string => `Hello ${args.name}`',
      output: 'const greet = (args: { name: string }) => `Hello ${args.name}`',
      errors: [{ messageId: 'noReturnType' }],
    },
    {
      code: 'const handler = { run(): void {} }',
      output: 'const handler = { run() {} }',
      errors: [{ messageId: 'noReturnType' }],
    },
  ],
})
