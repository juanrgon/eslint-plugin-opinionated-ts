import type { TSESTree } from '@typescript-eslint/utils'
import { AST_NODE_TYPES } from '@typescript-eslint/utils'
import { createRule } from '../create-rule.js'

function isThisParameter(args: { param: TSESTree.Parameter }) {
  return (
    args.param.type === AST_NODE_TYPES.Identifier && args.param.name === 'this'
  )
}

// Functions in callback position are exempt: their signatures are dictated by
// the caller (array methods, promise chains, event handlers, ESLint visitors,
// option objects). This intentionally includes every function used as an
// object-literal property value — handler maps and returned visitor objects
// make a tighter check too noisy.
function isCallbackPosition(args: { node: TSESTree.Node }) {
  const parent = args.node.parent
  if (!parent) return false

  // Direct call argument: .map(x => x), .then(x => x)
  if (parent.type === AST_NODE_TYPES.CallExpression) return true

  // Object property value: { onMutate(input) {...} }
  if (parent.type === AST_NODE_TYPES.Property) return true

  // JSX expression: onChange={(e) => ...}
  if (parent.type === AST_NODE_TYPES.JSXExpressionContainer) return true

  return false
}

type StrictArgsOptions = {
  // When omitted, any parameter name is accepted; providing a list opts in
  // to name enforcement.
  allowedNames?: string[]
  optionalAllowedFor: string[]
}

export const strictArgs = createRule<[StrictArgsOptions], 'singleArg' | 'argName' | 'inlineType' | 'noOptional' | 'noDestructure'>({
  name: 'strict-args',
  defaultOptions: [{ optionalAllowedFor: [] }],
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Require functions to use a single object parameter with an inline type annotation and no optional properties',
    },
    schema: [
      {
        type: 'object',
        properties: {
          allowedNames: {
            type: 'array',
            items: { type: 'string' },
            minItems: 1,
          },
          optionalAllowedFor: {
            type: 'array',
            items: { type: 'string' },
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      singleArg:
        'Functions with parameters must use a single object parameter.',
      argName: 'The parameter must be named {{allowed}}.',
      inlineType:
        'The parameter must have an inline object type annotation (not a type reference).',
      noOptional:
        'Properties in the `{{name}}` type must not be optional. Make all properties required.',
      noDestructure:
        'Do not destructure function parameters. Use `args.property` instead.',
    },
  },
  create(context, [options]) {
    const allowedNames = options.allowedNames
    const optionalAllowedFor = options.optionalAllowedFor

    function check(args: { params: TSESTree.Parameter[] }) {
      const params = args.params.filter(
        (param) => !isThisParameter({ param }),
      )

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

      if (param.type === AST_NODE_TYPES.ArrayPattern) {
        context.report({ node: param, messageId: 'noDestructure' })
        return
      }

      if (param.type === AST_NODE_TYPES.RestElement) {
        context.report({ node: param, messageId: 'singleArg' })
        return
      }

      if (param.type !== AST_NODE_TYPES.Identifier) {
        context.report({ node: param, messageId: 'singleArg' })
        return
      }

      if (allowedNames && !allowedNames.includes(param.name)) {
        context.report({
          node: param,
          messageId: 'argName',
          data: { allowed: allowedNames.map((n) => `\`${n}\``).join(' or ') },
        })
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

      // Optionality is correct modeling for React props (`className?`), but a
      // hidden decision for function args — configurable per parameter name.
      if (optionalAllowedFor.includes(param.name)) return

      for (const member of typeNode.members) {
        if (
          member.type === AST_NODE_TYPES.TSPropertySignature &&
          member.optional
        ) {
          context.report({
            node: member,
            messageId: 'noOptional',
            data: { name: param.name },
          })
        }
      }
    }

    return {
      FunctionDeclaration(node) {
        check({ params: node.params })
      },
      ArrowFunctionExpression(node) {
        if (isCallbackPosition({ node })) return
        check({ params: node.params })
      },
      FunctionExpression(node) {
        if (isCallbackPosition({ node })) return
        check({ params: node.params })
      },
    }
  },
})
