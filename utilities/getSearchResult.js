/**
 * External dependencies.
 */
const puppeteer = require("puppeteer-extra");
const stealthPluginPuppeteer = require("puppeteer-extra-plugin-stealth");

/**
 * @todo Logic to handle search query result
 * @returns string Search Query
 */
const getSearchResult = async (searchQuery) => {
  puppeteer.use(stealthPluginPuppeteer());
  const browser = await puppeteer.launch({
    headless: "new",
    // args: [],
    // userDataDir: "",
    // executablePath: "",
  });
  const page = await browser.newPage();

  await page.goto(searchQuery);

  // Wait for the search results page to load.
  await page.waitForSelector("div.g");

  // Extract search results.
  const searchResults = await page.evaluate(() => {
    const results = [];
    const resultElements = document.querySelectorAll("div.g");

    resultElements.forEach((resultElement) => {
      const linkElement = resultElement.querySelector("a");
      const imgElement = resultElement.querySelector("img");

      // Remove unwanted text content.
      const citationELement = resultElement.querySelector("cite");
      if (
        citationELement &&
        citationELement.parentElement &&
        citationELement.parentElement
      ) {
        citationELement.parentElement.parentElement.innerText = "";
      }

      if (linkElement) {
        const title = linkElement.textContent;
        const url = linkElement.getAttribute("href");
        const imageUrl = imgElement ? imgElement.getAttribute("src") : null;

        // Check if the URL contains any of the exclude patterns.
        if (!url.includes("google.com")) {
          results.push({ title, url, imageUrl });
        }
      }
    });

    return results;
  });

  // console.log(searchResults);

  // Do not close browser after search is complete.
  await browser.close();

  return searchResults;
};

module.exports = { getSearchResult };
