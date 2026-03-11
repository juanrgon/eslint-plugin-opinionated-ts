import { AST_NODE_TYPES } from '@typescript-eslint/utils'
import { createRule } from '../create-rule.js'

export const noTypeAssertion = createRule({
  name: 'no-type-assertion',
  defaultOptions: [],
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Disallow `as` type assertions — use `satisfies` instead',
    },
    schema: [],
    messages: {
      noAs: 'Do not use `as` for type assertions. Use `satisfies` instead.',
    },
  },
  create(context) {
    return {
      TSAsExpression(node) {
        // Allow `as const` — that's a const assertion, not a type assertion
        if (
          node.typeAnnotation.type === AST_NODE_TYPES.TSTypeReference &&
          node.typeAnnotation.typeName.type === AST_NODE_TYPES.Identifier &&
          node.typeAnnotation.typeName.name === 'const'
        ) {
          return
        }
        context.report({ node, messageId: 'noAs' })
      },
    }
  },
})
