// Import modules.
const getSearchArguments = require("./getSearchArguments");
const hasSearchArgument = require("./hasSearchArgument");
const getSearchQuery = require("./getSearchQuery");
const getSearchResult = require("./getSearchResult");
const setSearchResult = require("./setSearchResult");
const showProcessedInfo = require("./showProcessedInfo");
const showLoadingAnimation = require("./showLoadingAnimation");

// Export modules.
module.exports = {
  ...getSearchArguments,
  ...hasSearchArgument,
  ...getSearchQuery,
  ...getSearchResult,
  ...setSearchResult,
  ...showProcessedInfo,
  ...showLoadingAnimation,
};
