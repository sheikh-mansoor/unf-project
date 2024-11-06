const prettierConfigPath = "../../prettier.config.precommit.js";

export default {
  "*.{js,ts}": [
    `prettier --config=${prettierConfigPath} --write`,
    `eslint --fix`,
  ],
};
