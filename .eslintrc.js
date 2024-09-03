module.exports = {
  root: true,
  extends: [
    '@react-native',                // Existing React Native ESLint rules
    'plugin:prettier/recommended'   // Integrates Prettier with ESLint
  ],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error', { singleQuote: false }]  // Configures Prettier rules
  },
};