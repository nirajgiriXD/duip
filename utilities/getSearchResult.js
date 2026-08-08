/**
 * External dependencies.
 */
import { setTimeout } from "node:timers/promises";

/**
 * Internal dependencies.
 */
import launchBrowser from "./launchBrowser";

/**
 * Fetch the search result
 * @returns array Search Result
 */
const getSearchResult = async (searchQuery) => {
  const browser = await launchBrowser();

  try {
    const page = await browser.newPage();

    // Block dialogs
    page.on("dialog", async (dialog) => {
      await dialog.dismiss();
    });

    await page.goto(searchQuery);

    // Wait for the search results page to load.
    await page.waitForSelector("div#rso");

    // Scroll the page 3 times
    for (let i = 0; i < 3; i++) {
      await page.evaluate(() => {
        window.scrollBy(0, window.innerHeight);
      });

      // Wait for 0.5 second after each scroll
      await setTimeout(500);
    }

    // Extract search results.
    const searchResults = await page.evaluate(() => {
      const results = [];
      const resultElements = document.querySelectorAll("div#rso > div");

      resultElements.forEach((resultElement) => {
        const linkElement = resultElement.querySelector("a");
        const imgElement = resultElement.querySelector("img");

        // Remove unwanted text content.
        const citationElement = resultElement.querySelector("cite");
        if (
          citationElement &&
          citationElement.parentElement &&
          citationElement.parentElement.parentElement
        ) {
          citationElement.parentElement.parentElement.innerText = "";
        }

        if (linkElement) {
          const title = linkElement.textContent;
          const url = linkElement.getAttribute("href");
          const imageUrl = imgElement ? imgElement.getAttribute("src") : null;

          // Check if the URL contains any of the exclude patterns.
          if (!url.includes("google.com")) {
            results.push({
              title,
              url,
              imageUrl,
              isSelected: true,
              isSaved: false,
            });
          }
        }
      });

      return results;
    });

    return searchResults;
  } finally {
    // Close browser once the search is complete (or has failed).
    await browser.close();
  }
};

export default getSearchResult;
