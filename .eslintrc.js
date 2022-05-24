module.exports = {
  env: {
    browser: true,
    jest: true,
    node: true,
  },
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier', 'prettier/react'],
  rules: {
    'import/no-extraneous-dependencies': ['error', { 'devDependencies': true }],
    'no-plusplus': ['error', { 'allowForLoopAfterthoughts': true }],
    'no-underscore-dangle': ['error', { 'allow': ['__REDUX_DEVTOOLS_EXTENSION__'] }],
    'import/prefer-default-export': 'off',
  },
  settings: {
    'import/resolver': {
      'node': {
        'paths': ['src'],
      },
    },
  },
};
