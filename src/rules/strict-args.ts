import type { TSESTree } from '@typescript-eslint/utils'
import { AST_NODE_TYPES } from '@typescript-eslint/utils'
import { createRule } from '../create-rule.js'

export const strictArgs = createRule({
  name: 'strict-args',
  defaultOptions: [],
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Require functions to use a single `args` parameter with an inline type annotation and no optional properties',
    },
    schema: [],
    messages: {
      singleArg:
        'Functions with parameters must use a single `args` parameter.',
      argName: 'The parameter must be named `args`.',
      inlineType:
        'The `args` parameter must have an inline object type annotation (not a type reference).',
      noOptional:
        'Properties in the `args` type must not be optional. Make all properties required.',
      noDestructure:
        'Do not destructure function parameters. Use `args.property` instead.',
    },
  },
  create(context) {
    function check(params: TSESTree.Parameter[]) {
      if (params.length === 0) return
      if (params.length > 1) {
        context.report({ node: params[1]!, messageId: 'singleArg' })
        return
      }

      const param = params[0]!

      if (param.type === AST_NODE_TYPES.ObjectPattern) {
        context.report({ node: param, messageId: 'noDestructure' })
        return
      }

      if (param.type !== AST_NODE_TYPES.Identifier) {
        return
      }

      if (param.name !== 'args') {
        context.report({ node: param, messageId: 'argName' })
        return
      }

      const typeAnnotation = param.typeAnnotation
      if (!typeAnnotation) {
        return
      }

      const typeNode = typeAnnotation.typeAnnotation
      if (typeNode.type !== AST_NODE_TYPES.TSTypeLiteral) {
        context.report({ node: typeNode, messageId: 'inlineType' })
        return
      }

      for (const member of typeNode.members) {
        if (
          member.type === AST_NODE_TYPES.TSPropertySignature &&
          member.optional
        ) {
          context.report({ node: member, messageId: 'noOptional' })
        }
      }
    }

    return {
      FunctionDeclaration(node) {
        check(node.params)
      },
      ArrowFunctionExpression(node) {
        check(node.params)
      },
      FunctionExpression(node) {
        check(node.params)
      },
    }
  },
})
