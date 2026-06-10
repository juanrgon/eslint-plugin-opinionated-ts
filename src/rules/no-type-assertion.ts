import type { TSESTree } from '@typescript-eslint/utils'
import { AST_NODE_TYPES } from '@typescript-eslint/utils'
import { createRule } from '../create-rule.js'

function isConstAssertion(args: { typeAnnotation: TSESTree.TypeNode }) {
  return (
    args.typeAnnotation.type === AST_NODE_TYPES.TSTypeReference &&
    args.typeAnnotation.typeName.type === AST_NODE_TYPES.Identifier &&
    args.typeAnnotation.typeName.name === 'const'
  )
}

export const noTypeAssertion = createRule({
  name: 'no-type-assertion',
  defaultOptions: [],
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Disallow type assertions (`as` and angle-bracket syntax) — use `satisfies` instead',
    },
    schema: [],
    messages: {
      noAs: 'Do not use `as` for type assertions. Use `satisfies` instead.',
      noAngleBracket:
        'Do not use angle-bracket type assertions. Use `satisfies` instead.',
    },
  },
  create(context) {
    return {
      TSAsExpression(node) {
        if (isConstAssertion({ typeAnnotation: node.typeAnnotation })) return
        context.report({ node, messageId: 'noAs' })
      },
      TSTypeAssertion(node) {
        if (isConstAssertion({ typeAnnotation: node.typeAnnotation })) return
        context.report({ node, messageId: 'noAngleBracket' })
      },
    }
  },
})
