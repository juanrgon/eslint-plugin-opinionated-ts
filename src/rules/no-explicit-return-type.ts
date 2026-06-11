import type { TSESTree } from '@typescript-eslint/utils'
import { AST_NODE_TYPES } from '@typescript-eslint/utils'
import { createRule } from '../create-rule.js'

function isTypePredicate(args: { returnType: TSESTree.TSTypeAnnotation }) {
  return args.returnType.typeAnnotation.type === AST_NODE_TYPES.TSTypePredicate
}

type NoExplicitReturnTypeOptions = {
  allowExported: boolean
}

function isExported(args: {
  node:
    | TSESTree.FunctionDeclaration
    | TSESTree.ArrowFunctionExpression
    | TSESTree.FunctionExpression
}) {
  const parent = args.node.parent
  if (
    parent.type === AST_NODE_TYPES.ExportNamedDeclaration ||
    parent.type === AST_NODE_TYPES.ExportDefaultDeclaration
  ) {
    return true
  }
  if (
    parent.type === AST_NODE_TYPES.VariableDeclarator &&
    parent.parent.type === AST_NODE_TYPES.VariableDeclaration &&
    parent.parent.parent.type === AST_NODE_TYPES.ExportNamedDeclaration
  ) {
    return true
  }
  return false
}

function functionName(args: {
  node:
    | TSESTree.FunctionDeclaration
    | TSESTree.ArrowFunctionExpression
    | TSESTree.FunctionExpression
}) {
  if ('id' in args.node && args.node.id) return args.node.id.name
  const parent = args.node.parent
  if (
    parent.type === AST_NODE_TYPES.VariableDeclarator &&
    parent.id.type === AST_NODE_TYPES.Identifier
  ) {
    return parent.id.name
  }
  return null
}

export const noExplicitReturnType = createRule<[NoExplicitReturnTypeOptions], 'noReturnType'>({
  name: 'no-explicit-return-type',
  defaultOptions: [{ allowExported: false }],
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Disallow explicit function return type annotations — rely on TypeScript inference instead',
    },
    schema: [
      {
        type: 'object',
        properties: {
          allowExported: { type: 'boolean' },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      noReturnType:
        'Do not annotate return types explicitly. Let TypeScript infer the return type.',
    },
    fixable: 'code',
  },
  create(context, [options]) {
    const allowExported = options.allowExported

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

      // Boundary contract: inference rules inside the module, but exported
      // functions may declare what they promise.
      if (allowExported && isExported({ node: args.node })) return

      // Directly recursive functions cannot infer their own return type
      // (TS7023). Heuristic: a named function whose body mentions its own
      // name keeps its annotation.
      const name = functionName({ node: args.node })
      if (name) {
        const bodyText = context.sourceCode.getText(args.node.body)
        if (new RegExp(`\\b${name}\\b`).test(bodyText)) return
      }

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
