module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  globals: {
    page: true,
    REACT_APP_ENV: true,
  },
  plugins: ['prettier'],
  rules: {
    'import/order': 'error',
    'prettier/prettier': 'error',
    'import/no-extraneous-dependencies': 'off',
    '@typescript-eslint/no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'no-console': 'off',
    'consistent-return': 'off',
    '@typescript-eslint/consistent-type-imports': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',
  },
};
