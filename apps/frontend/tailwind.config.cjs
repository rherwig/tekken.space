const { resolve, join } = require('path');
const colors = require('tailwindcss/colors');

const NX_ROOT = resolve(__dirname, '../../');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        join(NX_ROOT, 'apps/frontend/src/**/*.{js,ts,jsx,tsx,mdx}'),
        join(NX_ROOT, 'packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}'),
    ],
    theme: {
        extend: {
            container: {
                center: true,
            },

            colors: {
                primary: colors.teal[500],
                error: colors.red[500],
                success: colors.green[500],
                info: colors.blue[500],
                background: colors.zinc[900],
                copy: colors.zinc[100],
            },

            fontSize: {
                display: '8rem',
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('tailwind-scrollbar')({
            nocompatible: true,
        }),
        require('tailwindcss-debug-screens'),
    ],
};
