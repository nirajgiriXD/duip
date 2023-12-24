/**
 * External dependencies.
 */
const fs = require("fs/promises");

const setSearchResult = async (profiles) => {
  await fs.writeFile(
    "data/profiles.js",
    `const profiles = ${JSON.stringify(profiles)};`
  );
};

module.exports = { setSearchResult };
