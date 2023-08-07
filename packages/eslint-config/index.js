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
].map((file) => require.resolve(file));

module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        ...rules,
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
    },
    plugins: ['import', '@typescript-eslint'],
    env: {
        browser: true,
        node: true,
    },
};
