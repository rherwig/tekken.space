module.exports = {
    rules: {
        'prettier/prettier': [
            'warn',
            {
                printWidth: 80,
                tabWidth: 4,
                useTabs: false,
                semi: true,
                singleQuote: true,
                quoteProps: 'consistent',
                jsxSingleQuote: false,
                trailingComma: 'all',
                bracketSpacing: true,
                bracketSameLine: false,
                arrowParens: 'always',
                proseWrap: 'preserve',
                htmlWhitespaceSensitivity: 'css',
                vueIndentScriptAndStyle: false,
                endOfLine: 'auto',
                embeddedLanguageFormatting: 'auto',
                singleAttributePerLine: true,
            },
        ],
        'arrow-body-style': 'off',
        'prefer-arrow-callback': 'off',
    },
};
