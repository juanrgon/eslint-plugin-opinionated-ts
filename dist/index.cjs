"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  default: () => index_default
});
module.exports = __toCommonJS(index_exports);

// src/rules/strict-args.ts
var import_utils2 = require("@typescript-eslint/utils");

// src/create-rule.ts
var import_utils = require("@typescript-eslint/utils");
var createRule = import_utils.ESLintUtils.RuleCreator(
  (name) => `https://github.com/juanrgon/eslint-plugin-opinionated-ts/blob/main/docs/rules/${name}.md`
);

// src/rules/strict-args.ts
function isThisParameter(args) {
  return args.param.type === import_utils2.AST_NODE_TYPES.Identifier && args.param.name === "this";
}
function isCallbackPosition(args) {
  const parent = args.node.parent;
  if (!parent) return false;
  if (parent.type === import_utils2.AST_NODE_TYPES.CallExpression) return true;
  if (parent.type === import_utils2.AST_NODE_TYPES.Property) return true;
  if (parent.type === import_utils2.AST_NODE_TYPES.JSXExpressionContainer) return true;
  return false;
}
var strictArgs = createRule({
  name: "strict-args",
  defaultOptions: [{ optionalAllowedFor: [] }],
  meta: {
    type: "suggestion",
    docs: {
      description: "Require functions to use a single object parameter with an inline type annotation and no optional properties"
    },
    schema: [
      {
        type: "object",
        properties: {
          allowedNames: {
            type: "array",
            items: { type: "string" },
            minItems: 1
          },
          optionalAllowedFor: {
            type: "array",
            items: { type: "string" }
          }
        },
        additionalProperties: false
      }
    ],
    messages: {
      singleArg: "Functions with parameters must use a single object parameter.",
      argName: "The parameter must be named {{allowed}}.",
      inlineType: "The parameter must have an inline object type annotation (not a type reference).",
      noOptional: "Properties in the `{{name}}` type must not be optional. Make all properties required.",
      noDestructure: "Do not destructure function parameters. Use `args.property` instead."
    }
  },
  create(context, [options]) {
    const allowedNames = options.allowedNames;
    const optionalAllowedFor = options.optionalAllowedFor;
    function check(args) {
      const params = args.params.filter(
        (param2) => !isThisParameter({ param: param2 })
      );
      if (params.length === 0) return;
      if (params.length > 1) {
        context.report({ node: params[1], messageId: "singleArg" });
        return;
      }
      const param = params[0];
      if (param.type === import_utils2.AST_NODE_TYPES.ObjectPattern) {
        context.report({ node: param, messageId: "noDestructure" });
        return;
      }
      if (param.type === import_utils2.AST_NODE_TYPES.ArrayPattern) {
        context.report({ node: param, messageId: "noDestructure" });
        return;
      }
      if (param.type === import_utils2.AST_NODE_TYPES.RestElement) {
        context.report({ node: param, messageId: "singleArg" });
        return;
      }
      if (param.type !== import_utils2.AST_NODE_TYPES.Identifier) {
        context.report({ node: param, messageId: "singleArg" });
        return;
      }
      if (allowedNames && !allowedNames.includes(param.name)) {
        context.report({
          node: param,
          messageId: "argName",
          data: { allowed: allowedNames.map((n) => `\`${n}\``).join(" or ") }
        });
        return;
      }
      const typeAnnotation = param.typeAnnotation;
      if (!typeAnnotation) {
        return;
      }
      const typeNode = typeAnnotation.typeAnnotation;
      if (typeNode.type !== import_utils2.AST_NODE_TYPES.TSTypeLiteral) {
        context.report({ node: typeNode, messageId: "inlineType" });
        return;
      }
      if (optionalAllowedFor.includes(param.name)) return;
      for (const member of typeNode.members) {
        if (member.type === import_utils2.AST_NODE_TYPES.TSPropertySignature && member.optional) {
          context.report({
            node: member,
            messageId: "noOptional",
            data: { name: param.name }
          });
        }
      }
    }
    return {
      FunctionDeclaration(node) {
        check({ params: node.params });
      },
      ArrowFunctionExpression(node) {
        if (isCallbackPosition({ node })) return;
        check({ params: node.params });
      },
      FunctionExpression(node) {
        if (isCallbackPosition({ node })) return;
        check({ params: node.params });
      }
    };
  }
});

// src/rules/no-explicit-return-type.ts
var import_utils3 = require("@typescript-eslint/utils");
function isTypePredicate(args) {
  return args.returnType.typeAnnotation.type === import_utils3.AST_NODE_TYPES.TSTypePredicate;
}
function isExported(args) {
  const parent = args.node.parent;
  if (parent.type === import_utils3.AST_NODE_TYPES.ExportNamedDeclaration || parent.type === import_utils3.AST_NODE_TYPES.ExportDefaultDeclaration) {
    return true;
  }
  if (parent.type === import_utils3.AST_NODE_TYPES.VariableDeclarator && parent.parent.type === import_utils3.AST_NODE_TYPES.VariableDeclaration && parent.parent.parent.type === import_utils3.AST_NODE_TYPES.ExportNamedDeclaration) {
    return true;
  }
  return false;
}
function functionName(args) {
  if ("id" in args.node && args.node.id) return args.node.id.name;
  const parent = args.node.parent;
  if (parent.type === import_utils3.AST_NODE_TYPES.VariableDeclarator && parent.id.type === import_utils3.AST_NODE_TYPES.Identifier) {
    return parent.id.name;
  }
  return null;
}
var noExplicitReturnType = createRule({
  name: "no-explicit-return-type",
  defaultOptions: [{ allowExported: false }],
  meta: {
    type: "suggestion",
    docs: {
      description: "Disallow explicit function return type annotations \u2014 rely on TypeScript inference instead"
    },
    schema: [
      {
        type: "object",
        properties: {
          allowExported: { type: "boolean" }
        },
        additionalProperties: false
      }
    ],
    messages: {
      noReturnType: "Do not annotate return types explicitly. Let TypeScript infer the return type."
    },
    fixable: "code"
  },
  create(context, [options]) {
    const allowExported = options.allowExported;
    function check(args) {
      const returnType = args.node.returnType;
      if (!returnType) return;
      if (isTypePredicate({ returnType })) return;
      if (allowExported && isExported({ node: args.node })) return;
      const name = functionName({ node: args.node });
      if (name) {
        const bodyText = context.sourceCode.getText(args.node.body);
        if (new RegExp(`\\b${name}\\b`).test(bodyText)) return;
      }
      context.report({
        node: returnType,
        messageId: "noReturnType",
        fix(fixer) {
          return fixer.remove(returnType);
        }
      });
    }
    return {
      FunctionDeclaration(node) {
        if (!node.body) return;
        check({ node });
      },
      ArrowFunctionExpression(node) {
        check({ node });
      },
      FunctionExpression(node) {
        check({ node });
      }
    };
  }
});

// src/rules/no-enum.ts
var noEnum = createRule({
  name: "no-enum",
  defaultOptions: [],
  meta: {
    type: "suggestion",
    docs: {
      description: "Disallow enums \u2014 use `as const` objects with derived types instead"
    },
    schema: [],
    messages: {
      noEnum: "Do not use enums. Use an `as const` object with a derived type instead."
    }
  },
  create(context) {
    return {
      TSEnumDeclaration(node) {
        context.report({ node, messageId: "noEnum" });
      }
    };
  }
});

// src/rules/no-type-assertion.ts
var import_utils4 = require("@typescript-eslint/utils");
function isConstAssertion(args) {
  return args.typeAnnotation.type === import_utils4.AST_NODE_TYPES.TSTypeReference && args.typeAnnotation.typeName.type === import_utils4.AST_NODE_TYPES.Identifier && args.typeAnnotation.typeName.name === "const";
}
var noTypeAssertion = createRule({
  name: "no-type-assertion",
  defaultOptions: [],
  meta: {
    type: "suggestion",
    docs: {
      description: "Disallow type assertions (`as` and angle-bracket syntax) \u2014 use `satisfies` instead"
    },
    schema: [],
    messages: {
      noAs: "Do not use `as` for type assertions. Use `satisfies` instead.",
      noAngleBracket: "Do not use angle-bracket type assertions. Use `satisfies` instead."
    }
  },
  create(context) {
    return {
      TSAsExpression(node) {
        if (isConstAssertion({ typeAnnotation: node.typeAnnotation })) return;
        context.report({ node, messageId: "noAs" });
      },
      TSTypeAssertion(node) {
        if (isConstAssertion({ typeAnnotation: node.typeAnnotation })) return;
        context.report({ node, messageId: "noAngleBracket" });
      }
    };
  }
});

// src/rules/prefer-type-over-interface.ts
var import_utils5 = require("@typescript-eslint/utils");
function isInsideAmbientModule(args) {
  let current = args.node.parent;
  while (current) {
    if (current.type === import_utils5.AST_NODE_TYPES.TSModuleDeclaration) return true;
    current = current.parent;
  }
  return false;
}
var preferTypeOverInterface = createRule({
  name: "prefer-type-over-interface",
  defaultOptions: [],
  meta: {
    type: "suggestion",
    docs: {
      description: "Prefer `type` aliases over `interface` declarations for object shapes"
    },
    schema: [],
    messages: {
      preferType: "Use a `type` alias instead of `interface`."
    },
    fixable: "code"
  },
  create(context) {
    return {
      TSInterfaceDeclaration(node) {
        if (context.filename.endsWith(".d.ts")) return;
        if (isInsideAmbientModule({ node })) return;
        context.report({
          node,
          messageId: "preferType",
          fix(fixer) {
            const sourceCode = context.sourceCode;
            const name = sourceCode.getText(node.id);
            const typeParams = node.typeParameters ? sourceCode.getText(node.typeParameters) : "";
            const heritage = node.extends.map((h) => sourceCode.getText(h));
            const body = sourceCode.getText(node.body);
            const intersection = heritage.length > 0 ? `${heritage.join(" & ")} & ` : "";
            return fixer.replaceText(
              node,
              `type ${name}${typeParams} = ${intersection}${body}`
            );
          }
        });
      }
    };
  }
});

// src/rules/kebab-case-filename.ts
var import_node_path = __toESM(require("path"), 1);
var KEBAB_SEGMENT = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
var kebabCaseFilename = createRule({
  name: "kebab-case-filename",
  defaultOptions: [],
  meta: {
    type: "suggestion",
    docs: {
      description: "Require file names to be kebab-case"
    },
    schema: [],
    messages: {
      notKebabCase: "Filename `{{basename}}` is not kebab-case (expected e.g. `{{expected}}`)."
    }
  },
  create(context) {
    return {
      Program() {
        const filename = context.filename;
        if (!filename || filename.startsWith("<")) return;
        const basename = import_node_path.default.basename(filename);
        if (basename.includes("[")) return;
        const segments = basename.replace(/^_/, "").split(".").filter((segment) => segment.length > 0);
        if (segments.every((segment) => KEBAB_SEGMENT.test(segment))) return;
        context.report({
          loc: { start: { line: 1, column: 0 }, end: { line: 1, column: 0 } },
          messageId: "notKebabCase",
          data: {
            basename,
            expected: segments.map(
              (segment) => segment.replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/_/g, "-").toLowerCase()
            ).join(".")
          }
        });
      }
    };
  }
});

// src/rules/no-explicit-any.ts
var import_eslint_plugin = __toESM(require("@typescript-eslint/eslint-plugin"), 1);
function getNoExplicitAnyRule() {
  const rule = import_eslint_plugin.default.rules["no-explicit-any"];
  if (!rule) {
    throw new Error("@typescript-eslint/eslint-plugin is missing no-explicit-any");
  }
  return rule;
}
var noExplicitAny = getNoExplicitAnyRule();

// src/rules/no-unsafe-assignment.ts
var import_eslint_plugin2 = __toESM(require("@typescript-eslint/eslint-plugin"), 1);
function getNoUnsafeAssignmentRule() {
  const rule = import_eslint_plugin2.default.rules["no-unsafe-assignment"];
  if (!rule) {
    throw new Error(
      "@typescript-eslint/eslint-plugin is missing no-unsafe-assignment"
    );
  }
  return rule;
}
var noUnsafeAssignment = getNoUnsafeAssignmentRule();

// src/index.ts
var plugin = {
  meta: {
    name: "eslint-plugin-opinionated-ts",
    version: "0.3.0"
  },
  rules: {
    "strict-args": strictArgs,
    "no-explicit-return-type": noExplicitReturnType,
    "no-enum": noEnum,
    "no-type-assertion": noTypeAssertion,
    "prefer-type-over-interface": preferTypeOverInterface,
    "kebab-case-filename": kebabCaseFilename,
    "no-explicit-any": noExplicitAny,
    "no-unsafe-assignment": noUnsafeAssignment
  }
};
var recommended = {
  plugins: {
    "opinionated-ts": plugin
  },
  rules: {
    "opinionated-ts/strict-args": "error",
    "opinionated-ts/no-explicit-return-type": "error",
    "opinionated-ts/no-enum": "error",
    "opinionated-ts/no-type-assertion": "error",
    "opinionated-ts/prefer-type-over-interface": "error",
    "opinionated-ts/kebab-case-filename": "error",
    "opinionated-ts/no-explicit-any": "error"
  }
};
var recommendedTypeChecked = {
  plugins: {
    "opinionated-ts": plugin
  },
  rules: {
    ...recommended.rules,
    "opinionated-ts/no-unsafe-assignment": "error"
  }
};
var configs = {
  recommended,
  "recommended-type-checked": recommendedTypeChecked
};
var index_default = { ...plugin, configs };
