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
    headless: false,
    // args: [],
    // userDataDir: "",
    // executablePath: "",
  });
  const page = await browser.newPage();

  await page.goto(searchQuery);

  // Do not close browser after search is complete.
  // await browser.close();
};

module.exports = { getSearchResult };
