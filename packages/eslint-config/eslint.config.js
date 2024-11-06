import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import ts from "typescript-eslint";

const config = [js.configs.recommended, ...ts.configs.recommended, prettier];
export default config;
