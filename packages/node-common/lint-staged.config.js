const prettierConfigPath = "prettier.config.precommit.js";
const projectDir = "packages/node-common";

export default {
  "*.{js,ts}": [
    `prettier --config=${prettierConfigPath} --write`,
    `eslint --fix --config=${projectDir}/eslint.config.js`,
  ],
};
