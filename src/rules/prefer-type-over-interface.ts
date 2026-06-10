import type { TSESTree } from '@typescript-eslint/utils'
import { AST_NODE_TYPES } from '@typescript-eslint/utils'
import { createRule } from '../create-rule.js'

function isInsideAmbientModule(args: { node: TSESTree.Node }) {
  let current: TSESTree.Node | undefined = args.node.parent
  while (current) {
    if (current.type === AST_NODE_TYPES.TSModuleDeclaration) return true
    current = current.parent
  }
  return false
}

export const preferTypeOverInterface = createRule({
  name: 'prefer-type-over-interface',
  defaultOptions: [],
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Prefer `type` aliases over `interface` declarations for object shapes',
    },
    schema: [],
    messages: {
      preferType: 'Use a `type` alias instead of `interface`.',
    },
    fixable: 'code',
  },
  create(context) {
    return {
      TSInterfaceDeclaration(node) {
        // Ambient declaration files exist to describe external shapes; interfaces
        // there often participate in declaration merging.
        if (context.filename.endsWith('.d.ts')) return

        // `declare global { ... }` / `declare module "x" { ... }` — interfaces are
        // required there because merging into existing declarations is the point.
        if (isInsideAmbientModule({ node })) return

        context.report({
          node,
          messageId: 'preferType',
          fix(fixer) {
            const sourceCode = context.sourceCode
            const name = sourceCode.getText(node.id)
            const typeParams = node.typeParameters
              ? sourceCode.getText(node.typeParameters)
              : ''
            const heritage = node.extends.map((h) => sourceCode.getText(h))
            const body = sourceCode.getText(node.body)
            const intersection = heritage.length > 0 ? `${heritage.join(' & ')} & ` : ''
            return fixer.replaceText(
              node,
              `type ${name}${typeParams} = ${intersection}${body}`,
            )
          },
        })
      },
    }
  },
})
