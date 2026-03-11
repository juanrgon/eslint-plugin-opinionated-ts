import { createRule } from '../create-rule.js'

export const noEnum = createRule({
  name: 'no-enum',
  defaultOptions: [],
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Disallow enums — use `as const` objects with derived types instead',
    },
    schema: [],
    messages: {
      noEnum:
        'Do not use enums. Use an `as const` object with a derived type instead.',
    },
  },
  create(context) {
    return {
      TSEnumDeclaration(node) {
        context.report({ node, messageId: 'noEnum' })
      },
    }
  },
})
