/**
 * External dependencies.
 */
import { setTimeout } from "node:timers/promises";
import puppeteer from "puppeteer-extra";
import stealthPluginPuppeteer from "puppeteer-extra-plugin-stealth";

/**
 * @todo Logic to handle search query result
 * @returns array Search Result
 */
const getSearchResult = async (searchQuery, numOfScroll) => {
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

  // Scroll the page numOfScroll times
  for (let i = 0; i < numOfScroll; i++) {
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
          results.push({ title, url, imageUrl });
        }
      }
    });

    return results;
  });

  // Loop the pages to get the content.
  for (let i = 0; i < searchResults.length; i++) {
    const profileLink = searchResults[i].url;
    try {
      await page.goto(profileLink, { waitUntil: ['domcontentloaded', 'networkidle2'] });
  
      const content = await page.evaluate(() => {
        const selectorsToRemove = ['header', 'footer', 'nav', 'aside', '.sidebar', '.advertisement'];
        selectorsToRemove.forEach(selector => {
          document.querySelectorAll(selector).forEach(el => el.remove());
        });
  
        const selectors = ['main', 'article', 'section', 'div.content', 'div.main', 'div.article', 'address'];
        for (let selector of selectors) {
          const element = document.querySelector(selector);
          if (element) return element.innerText.trim();
        }
  
        return document.body.innerText.trim();
      });
  
      searchResults[i].content = content;
  
    } catch (error) {
      console.error(`Error fetching content from ${profileLink}:`, error);
    }
  }

  // Close browser after search is complete.
  await browser.close();

  return searchResults;
};

export default getSearchResult;
