/**
 * External dependencies.
 */
const fs = require("fs/promises");

const setSearchResult = async (query, profiles) => {
  await fs.writeFile(
    "data/data.js",
    `const query = '${query}';const profiles = ${JSON.stringify(profiles)};`
  );
};

module.exports = { setSearchResult };
