import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { ignores: ["build/**", "node_modules/**"] },

  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: { globals: globals.browser },
  },

  pluginReact.configs.flat.recommended,

  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    settings: {
      react: {
        // שנה את "detect" לגרסה קבועה (למשל "18.0" או "19.0")
        version: "18.0",
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off",
    },
  },
]);
