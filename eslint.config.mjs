import { createRequire } from "node:module";
import path from "node:path";
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// Polyfill RuleContext methods removed in ESLint 10 for plugins (like eslint-plugin-react)
// that haven't released ESLint 10 updates yet.
const require = createRequire(import.meta.url);
try {
  const eslintPkg = require.resolve("eslint/package.json");
  const fileContextPath = path.join(path.dirname(eslintPkg), "lib/linter/file-context.js");
  const { FileContext } = require(fileContextPath);
  if (FileContext && FileContext.prototype) {
    if (!FileContext.prototype.getFilename) {
      FileContext.prototype.getFilename = function () {
        return this.filename;
      };
    }
    if (!FileContext.prototype.getPhysicalFilename) {
      FileContext.prototype.getPhysicalFilename = function () {
        return this.physicalFilename;
      };
    }
    if (!FileContext.prototype.getCwd) {
      FileContext.prototype.getCwd = function () {
        return this.cwd;
      };
    }
    if (!FileContext.prototype.getSourceCode) {
      FileContext.prototype.getSourceCode = function () {
        return this.sourceCode;
      };
    }
    if (!Object.getOwnPropertyDescriptor(FileContext.prototype, "parserOptions")) {
      Object.defineProperty(FileContext.prototype, "parserOptions", {
        get() {
          return this.languageOptions?.parserOptions || {};
        },
        configurable: true,
      });
    }
    if (!Object.getOwnPropertyDescriptor(FileContext.prototype, "parserPath")) {
      Object.defineProperty(FileContext.prototype, "parserPath", {
        get() {
          return this.languageOptions?.parserPath;
        },
        configurable: true,
      });
    }
  }
} catch {
  // Ignore fallback
}

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
