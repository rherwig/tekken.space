const rules = [
    './rules/best-practices',
    './rules/debug',
    './rules/declarations',
    './rules/es6',
    './rules/formatting',
    './rules/imports',
    './rules/node',
    './rules/variables',
    './rules/typescript',
    './rules/prettier'
].map(file => require.resolve(file));

module.exports = {
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', ...rules, 'prettier'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        parser: '@typescript-eslint/parser'
    },
    plugins: ['@typescript-eslint', 'import', 'prettier'],
    env: {
        browser: true,
        node: true
    },
    overrides: [
        {
            files: ['*.json'],
            parser: 'jsonc-eslint-parser',
            rules: {
                '@nx/dependency-checks': 'error'
            }
        }
    ]
};
