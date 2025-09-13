import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: {
        ...globals.node,     // ✅ add Node.js globals like process, __dirname, etc.
        ...globals.browser,  // (optional) keep browser globals if you also want frontend code
      },
    },
  },
]);
