import { describe, expect, it } from 'vitest'
import opinionatedTs from '../src/index.js'

describe('plugin configs', () => {
  it('exports both any-safety rules', () => {
    expect(opinionatedTs.rules['no-explicit-any']).toBeDefined()
    expect(opinionatedTs.rules['no-unsafe-assignment']).toBeDefined()
  })

  it('enables no-explicit-any in the recommended config', () => {
    expect(
      opinionatedTs.configs.recommended.rules[
        'opinionated-ts/no-explicit-any'
      ],
    ).toBe('error')
    expect(
      opinionatedTs.configs.recommended.rules[
        'opinionated-ts/no-unsafe-assignment'
      ],
    ).toBeUndefined()
  })

  it('enables both rules in the type-checked config', () => {
    const rules = opinionatedTs.configs['recommended-type-checked'].rules

    expect(rules['opinionated-ts/no-explicit-any']).toBe('error')
    expect(rules['opinionated-ts/no-unsafe-assignment']).toBe('error')
  })
})
