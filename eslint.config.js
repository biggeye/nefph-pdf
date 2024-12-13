import typescriptParser from '@typescript-eslint/parser';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';

export default [
    {
        ignores: [".git", ".next", ".vs", "node_modules", "__pycache__"],
    },
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            parser: typescriptParser,
        },
        plugins: {
            '@typescript-eslint': typescriptPlugin,
        },
        rules: {
            ...typescriptPlugin.configs.recommended.rules,
            // Add any custom rules here
        },
    },
    {
        files: ['**/*.js', '**/*.jsx'],
        languageOptions: {
            ecmaVersion: 2021,
            sourceType: 'module',
        },
        rules: {
            // Add any custom rules here
        },
    },
];
