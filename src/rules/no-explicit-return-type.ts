import { createRule } from '../create-rule.js'

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
    return {
      FunctionDeclaration(node) {
        if (node.returnType) {
          context.report({
            node: node.returnType,
            messageId: 'noReturnType',
            fix(fixer) {
              return fixer.remove(node.returnType!)
            },
          })
        }
      },
      ArrowFunctionExpression(node) {
        if (node.returnType) {
          context.report({
            node: node.returnType,
            messageId: 'noReturnType',
            fix(fixer) {
              return fixer.remove(node.returnType!)
            },
          })
        }
      },
      FunctionExpression(node) {
        if (node.returnType) {
          context.report({
            node: node.returnType,
            messageId: 'noReturnType',
            fix(fixer) {
              return fixer.remove(node.returnType!)
            },
          })
        }
      },
    }
  },
})
