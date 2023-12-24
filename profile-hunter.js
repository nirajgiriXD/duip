/**
 * Internal dependencies.
 */
const {
  getSearchArguments,
  hasSearchArgument,
  getSearchQuery,
  getSearchResult,
} = require("./utilities");

/**
 * Main class of the application responsible for initializing and starting the application.
 */
class ProfileHunter {
  constructor() {
    // Initialize data members.
    this.data = getSearchArguments();

    // Call the main function.
    this.main();
  }

  /**
   * Manages the overall application lifecycle.
   */
  main() {
    // Check whether any arguments were present.
    if (!hasSearchArgument(this.data)) {
      console.error("Error: Minimum one argument expected, received none.");
      return;
    }

    const searchQuery = getSearchQuery(this.data);

    // Show query for debugging.
    console.log(searchQuery);

    getSearchResult(searchQuery);
  }
}

new ProfileHunter();
