/**
 * Internal dependencies.
 */
import launchBrowser from "./launchBrowser";

/**
 * Fetch search result content.
 * @returns string Search Result Content
 */
const getSearchResultContent = async (searchResults) => {
  const browser = await launchBrowser();

  try {
    const page = await browser.newPage();

    let searchContent = "";

    // Loop the pages to get the content.
    for (let i = 0; i < searchResults.length; i++) {
      const profileLink = searchResults[i].url;
      try {
        await page.goto(profileLink, { waitUntil: "domcontentloaded" });

        const content = await page.evaluate(() => {
          const selectorsToRemove = [
            "header",
            "footer",
            "nav",
            "aside",
            ".sidebar",
            ".advertisement",
          ];
          selectorsToRemove.forEach((selector) => {
            document.querySelectorAll(selector).forEach((el) => el.remove());
          });

          const selectors = [
            "main",
            "article",
            "section",
            "div.content",
            "div.main",
            "div.article",
            "address",
          ];
          for (let selector of selectors) {
            const element = document.querySelector(selector);
            if (element) return element.innerText.trim();
          }

          return document.body.innerText.trim();
        });

        // Append content to searchContent.
        searchContent += content + "\n\n";
      } catch (error) {
        console.error(`Error fetching content from ${profileLink}:`, error);
      }
    }

    return searchContent;
  } finally {
    // Close browser once the crawl is complete (or has failed).
    await browser.close();
  }
};

export default getSearchResultContent;
