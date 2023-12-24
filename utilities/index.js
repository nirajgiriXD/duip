// Import modules.
const getSearchArguments = require("./getSearchArguments");
const hasSearchArgument = require("./hasSearchArgument");
const getSearchQuery = require("./getSearchQuery");
const getSearchResult = require("./getSearchResult");

// Export modules.
module.exports = {
  ...getSearchArguments,
  ...hasSearchArgument,
  ...getSearchQuery,
  ...getSearchResult,
};
