module.exports = {
  extends: [
    '@ngmd/linter/stylelint',
    '@ngmd/linter/stylelint-prettier',
  ],
  rules: {
    'scss/function-no-unknown': [
      true,
      {
        ignoreFunctions: ['/^assets/', '/^cdn/'],
      },
    ],
  },
};
