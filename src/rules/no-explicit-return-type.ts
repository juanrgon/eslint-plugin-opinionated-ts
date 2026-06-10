import type { TSESTree } from '@typescript-eslint/utils'
import { AST_NODE_TYPES } from '@typescript-eslint/utils'
import { createRule } from '../create-rule.js'

function isTypePredicate(args: { returnType: TSESTree.TSTypeAnnotation }) {
  return args.returnType.typeAnnotation.type === AST_NODE_TYPES.TSTypePredicate
}

export const noExplicitReturnType = createRule({
  name: 'no-explicit-return-type',
  defaultOptions: [],
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Disallow explicit function return type annotations — rely on TypeScript inference instead',
    },
    schema: [],
    messages: {
      noReturnType:
        'Do not annotate return types explicitly. Let TypeScript infer the return type.',
    },
    fixable: 'code',
  },
  create(context) {
    function check(args: {
      node:
        | TSESTree.FunctionDeclaration
        | TSESTree.ArrowFunctionExpression
        | TSESTree.FunctionExpression
    }) {
      const returnType = args.node.returnType
      if (!returnType) return

      // Type predicates (`x is Foo`, `asserts x is Foo`) cannot be inferred —
      // removing them silently breaks narrowing, so they are always allowed.
      if (isTypePredicate({ returnType })) return

      context.report({
        node: returnType,
        messageId: 'noReturnType',
        fix(fixer) {
          return fixer.remove(returnType)
        },
      })
    }

    return {
      FunctionDeclaration(node) {
        // Skip overload signatures (no body) — return types are required there
        if (!node.body) return
        check({ node })
      },
      ArrowFunctionExpression(node) {
        check({ node })
      },
      FunctionExpression(node) {
        check({ node })
      },
    }
  },
})
