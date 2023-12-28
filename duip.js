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
  showProcessedInfo,
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
   * Clear loading animation.
   */
  clearLoadingAnimation(interval, displayMessage) {
    clearInterval(interval);
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    displayMessage.forEach((message) => {
      console.log(message);
    });
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

    if (hasSearchArgument(this.data)) {
      // Display processed info.
      showProcessedInfo(this.data);
    } else {
      this.clearLoadingAnimation(loadingInterval, [
        "Error: Minimum one argument expected, received none.",
      ]);
      return;
    }

    // Get search query.
    const searchQuery = getSearchQuery(this.data);

    // Get search result.
    const searchResults = await getSearchResult(searchQuery);

    // Save search results.
    await setSearchResult(searchQuery, searchResults);

    // Complete loading animation.
    this.clearLoadingAnimation(loadingInterval, [
      "✔ Loaded",
      "✔ Task complete",
    ]);

    // Display search results page.
    await open("index.html");
  }
}

new Duip();
