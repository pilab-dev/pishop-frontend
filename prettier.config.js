/** @type {import('prettier').Config} */
const prettierConfig = {
  singleQuote: true,
  arrowParens: "always",
  trailingComma: "none",
  printWidth: 100,
  tabWidth: 2,
  plugins: ["prettier-plugin-tailwindcss"],
};

export default prettierConfig;
