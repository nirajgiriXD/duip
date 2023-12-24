/**
 * External dependencies.
 */
const open = require("open");

/**
 * Internal dependencies.
 */
const {
  getSearchArguments,
  hasSearchArgument,
  getSearchQuery,
  getSearchResult,
  setSearchResult,
  showLoadingAnimation,
} = require("./utilities");

/**
 * Main class of the application responsible for initializing and starting the application.
 */
class Duip {
  constructor() {
    // Initialize data members.
    this.data = getSearchArguments();

    // Call the main function.
    this.main();
  }

  /**
   * Manages the overall application lifecycle.
   */
  async main() {
    // Handle loading animation.
    let loadingAnimationIndex = 0;
    const loadingAnimation = ["|", "/", "-", "\\"];
    const loadingInterval = setInterval(() => {
      loadingAnimationIndex = showLoadingAnimation(
        loadingAnimation,
        loadingAnimationIndex
      );
    }, 100);

    // Check whether any arguments were present.
    if (!hasSearchArgument(this.data)) {
      console.error("Error: Minimum one argument expected, received none.");
      return;
    }

    const searchQuery = getSearchQuery(this.data);
    const searchResults = await getSearchResult(searchQuery);

    // Set search results.
    await setSearchResult(searchResults);

    // Display search results page.
    await open("index.html");

    clearInterval(loadingInterval);
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    console.log("✔ Loaded");
    console.log("✔ Task complete");
  }
}

new Duip();
