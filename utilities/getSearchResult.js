/**
 * External dependencies.
 */
import { setTimeout } from "node:timers/promises";
import puppeteer from "puppeteer-extra";
import stealthPluginPuppeteer from "puppeteer-extra-plugin-stealth";

/**
 * Fetch the search result
 * @returns array Search Result
 */
const getSearchResult = async (searchQuery) => {
  // Use puppeteer stealth plugin.
  puppeteer.use(stealthPluginPuppeteer());

  const browser = await puppeteer.launch({
    headless: "new",
  });
  const page = await browser.newPage();

  // Block dialogs
  await page.on("dialog", async (dialog) => {
    await dialog.dismiss();
  });

  await page.goto(searchQuery);

  // Wait for the search results page to load.
  await page.waitForSelector("div.g");

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
    const resultElements = document.querySelectorAll("div.g");

    let id = 0;
    resultElements.forEach((resultElement) => {
      id++;
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
        const isSelected = true;
        const title = linkElement.textContent;
        const url = linkElement.getAttribute("href");
        const imageUrl = imgElement ? imgElement.getAttribute("src") : null;

        // Check if the URL contains any of the exclude patterns.
        if (!url.includes("google.com")) {
          results.push({ id, title, url, imageUrl, isSelected });
        }
      }
    });

    return results;
  });

  // Close browser after search is complete.
  await browser.close();

  return searchResults;
};

export default getSearchResult;
