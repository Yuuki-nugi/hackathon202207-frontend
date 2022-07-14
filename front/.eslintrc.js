const config = {
  // 設定の内容
};

if (process.env.DISABLE_ESLINT) {
  config.ignorePatterns = ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"];
}

module.exports = config;

// module.exports = {
//   env: {
//     browser: true,
//     es2021: true,
//     "jest/globals": true
//   },
//   extends: [
//     'plugin:react/recommended',
//     'standard',
//     "plugin:@typescript-eslint/recommended",
//     "prettier"
//   ],
//   parser: '@typescript-eslint/parser',
//   parserOptions: {
//     ecmaFeatures: {
//       jsx: true
//     },
//     ecmaVersion: 'latest',
//     sourceType: 'module'
//   },
//   plugins: [
//     'react',
//     '@typescript-eslint',
//     "jest", 
//     "prettier"
//   ],
//   rules: {
//     "no-use-before-define": "off",
//     "@typescript-eslint/no-use-before-define": ["error"],
//     "prettier/prettier": "error",
//     "react/prop-types": "off",
//     "react/jsx-uses-react": "off",
//     "react/react-in-jsx-scope": "off"
//   },
//   settings: {
//     react: {
//         version: "detect"
//     },
// },
// }
