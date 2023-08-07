const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    rules: {
        'no-console': isProduction ? 'warn' : 'off',
        'no-debugger': isProduction ? 'error' : 'off',
    },
};
