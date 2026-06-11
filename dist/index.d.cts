import * as _typescript_eslint_eslint_plugin_use_at_your_own_risk_rules from '@typescript-eslint/eslint-plugin/use-at-your-own-risk/rules';
import * as _typescript_eslint_utils_ts_eslint from '@typescript-eslint/utils/ts-eslint';

declare const _default: {
    configs: {
        recommended: {
            plugins: {
                'opinionated-ts': {
                    meta: {
                        name: string;
                        version: string;
                    };
                    rules: {
                        'strict-args': _typescript_eslint_utils_ts_eslint.RuleModule<"singleArg" | "argName" | "inlineType" | "noOptional" | "noDestructure", [{
                            allowedNames?: string[];
                            optionalAllowedFor: string[];
                        }], unknown, _typescript_eslint_utils_ts_eslint.RuleListener> & {
                            name: string;
                        };
                        'no-explicit-return-type': _typescript_eslint_utils_ts_eslint.RuleModule<"noReturnType", [{
                            allowExported: boolean;
                        }], unknown, _typescript_eslint_utils_ts_eslint.RuleListener> & {
                            name: string;
                        };
                        'no-enum': _typescript_eslint_utils_ts_eslint.RuleModule<"noEnum", [], unknown, _typescript_eslint_utils_ts_eslint.RuleListener> & {
                            name: string;
                        };
                        'no-type-assertion': _typescript_eslint_utils_ts_eslint.RuleModule<"noAs" | "noAngleBracket", [], unknown, _typescript_eslint_utils_ts_eslint.RuleListener> & {
                            name: string;
                        };
                        'prefer-type-over-interface': _typescript_eslint_utils_ts_eslint.RuleModule<"preferType", [], unknown, _typescript_eslint_utils_ts_eslint.RuleListener> & {
                            name: string;
                        };
                        'kebab-case-filename': _typescript_eslint_utils_ts_eslint.RuleModule<"notKebabCase", [], unknown, _typescript_eslint_utils_ts_eslint.RuleListener> & {
                            name: string;
                        };
                        'no-explicit-any': _typescript_eslint_utils_ts_eslint.RuleModuleWithMetaDocs<string, unknown[], _typescript_eslint_eslint_plugin_use_at_your_own_risk_rules.ESLintPluginDocs, _typescript_eslint_utils_ts_eslint.RuleListener>;
                        'no-unsafe-assignment': _typescript_eslint_utils_ts_eslint.RuleModuleWithMetaDocs<string, unknown[], _typescript_eslint_eslint_plugin_use_at_your_own_risk_rules.ESLintPluginDocs, _typescript_eslint_utils_ts_eslint.RuleListener>;
                    };
                };
            };
            rules: {
                'opinionated-ts/strict-args': string;
                'opinionated-ts/no-explicit-return-type': string;
                'opinionated-ts/no-enum': string;
                'opinionated-ts/no-type-assertion': string;
                'opinionated-ts/prefer-type-over-interface': string;
                'opinionated-ts/kebab-case-filename': string;
                'opinionated-ts/no-explicit-any': string;
            };
        };
        'recommended-type-checked': {
            plugins: {
                'opinionated-ts': {
                    meta: {
                        name: string;
                        version: string;
                    };
                    rules: {
                        'strict-args': _typescript_eslint_utils_ts_eslint.RuleModule<"singleArg" | "argName" | "inlineType" | "noOptional" | "noDestructure", [{
                            allowedNames?: string[];
                            optionalAllowedFor: string[];
                        }], unknown, _typescript_eslint_utils_ts_eslint.RuleListener> & {
                            name: string;
                        };
                        'no-explicit-return-type': _typescript_eslint_utils_ts_eslint.RuleModule<"noReturnType", [{
                            allowExported: boolean;
                        }], unknown, _typescript_eslint_utils_ts_eslint.RuleListener> & {
                            name: string;
                        };
                        'no-enum': _typescript_eslint_utils_ts_eslint.RuleModule<"noEnum", [], unknown, _typescript_eslint_utils_ts_eslint.RuleListener> & {
                            name: string;
                        };
                        'no-type-assertion': _typescript_eslint_utils_ts_eslint.RuleModule<"noAs" | "noAngleBracket", [], unknown, _typescript_eslint_utils_ts_eslint.RuleListener> & {
                            name: string;
                        };
                        'prefer-type-over-interface': _typescript_eslint_utils_ts_eslint.RuleModule<"preferType", [], unknown, _typescript_eslint_utils_ts_eslint.RuleListener> & {
                            name: string;
                        };
                        'kebab-case-filename': _typescript_eslint_utils_ts_eslint.RuleModule<"notKebabCase", [], unknown, _typescript_eslint_utils_ts_eslint.RuleListener> & {
                            name: string;
                        };
                        'no-explicit-any': _typescript_eslint_utils_ts_eslint.RuleModuleWithMetaDocs<string, unknown[], _typescript_eslint_eslint_plugin_use_at_your_own_risk_rules.ESLintPluginDocs, _typescript_eslint_utils_ts_eslint.RuleListener>;
                        'no-unsafe-assignment': _typescript_eslint_utils_ts_eslint.RuleModuleWithMetaDocs<string, unknown[], _typescript_eslint_eslint_plugin_use_at_your_own_risk_rules.ESLintPluginDocs, _typescript_eslint_utils_ts_eslint.RuleListener>;
                    };
                };
            };
            rules: {
                'opinionated-ts/no-unsafe-assignment': string;
                'opinionated-ts/strict-args': string;
                'opinionated-ts/no-explicit-return-type': string;
                'opinionated-ts/no-enum': string;
                'opinionated-ts/no-type-assertion': string;
                'opinionated-ts/prefer-type-over-interface': string;
                'opinionated-ts/kebab-case-filename': string;
                'opinionated-ts/no-explicit-any': string;
            };
        };
    };
    meta: {
        name: string;
        version: string;
    };
    rules: {
        'strict-args': _typescript_eslint_utils_ts_eslint.RuleModule<"singleArg" | "argName" | "inlineType" | "noOptional" | "noDestructure", [{
            allowedNames?: string[];
            optionalAllowedFor: string[];
        }], unknown, _typescript_eslint_utils_ts_eslint.RuleListener> & {
            name: string;
        };
        'no-explicit-return-type': _typescript_eslint_utils_ts_eslint.RuleModule<"noReturnType", [{
            allowExported: boolean;
        }], unknown, _typescript_eslint_utils_ts_eslint.RuleListener> & {
            name: string;
        };
        'no-enum': _typescript_eslint_utils_ts_eslint.RuleModule<"noEnum", [], unknown, _typescript_eslint_utils_ts_eslint.RuleListener> & {
            name: string;
        };
        'no-type-assertion': _typescript_eslint_utils_ts_eslint.RuleModule<"noAs" | "noAngleBracket", [], unknown, _typescript_eslint_utils_ts_eslint.RuleListener> & {
            name: string;
        };
        'prefer-type-over-interface': _typescript_eslint_utils_ts_eslint.RuleModule<"preferType", [], unknown, _typescript_eslint_utils_ts_eslint.RuleListener> & {
            name: string;
        };
        'kebab-case-filename': _typescript_eslint_utils_ts_eslint.RuleModule<"notKebabCase", [], unknown, _typescript_eslint_utils_ts_eslint.RuleListener> & {
            name: string;
        };
        'no-explicit-any': _typescript_eslint_utils_ts_eslint.RuleModuleWithMetaDocs<string, unknown[], _typescript_eslint_eslint_plugin_use_at_your_own_risk_rules.ESLintPluginDocs, _typescript_eslint_utils_ts_eslint.RuleListener>;
        'no-unsafe-assignment': _typescript_eslint_utils_ts_eslint.RuleModuleWithMetaDocs<string, unknown[], _typescript_eslint_eslint_plugin_use_at_your_own_risk_rules.ESLintPluginDocs, _typescript_eslint_utils_ts_eslint.RuleListener>;
    };
};

export = _default;
