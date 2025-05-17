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

  const puppeteerArgs = ["--start-maximized"];
  if (process.env.PROXY_SERVER) {
    puppeteerArgs.push(`--proxy-server=${process.env.PROXY_SERVER}`);
  }

  const browser = await puppeteer.launch({
    headless: process.env.HEADLESS === "false" ? false : process.env.HEADLESS,
    args: puppeteerArgs,
  });
  const page = await browser.newPage();

  // Block dialogs
  await page.on("dialog", async (dialog) => {
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

  // Close browser after search is complete.
  await browser.close();

  return searchResults;
};

export default getSearchResult;
