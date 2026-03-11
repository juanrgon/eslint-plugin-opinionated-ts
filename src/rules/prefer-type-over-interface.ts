import { createRule } from '../create-rule.js'

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
      preferType:
        'Use a `type` alias instead of `interface`.',
    },
  },
  create(context) {
    return {
      TSInterfaceDeclaration(node) {
        context.report({ node, messageId: 'preferType' })
      },
    }
  },
})
