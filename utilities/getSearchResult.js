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

  const profiles = [];
  const links = await page.$$("a");
  for (const link of links) {
    const src = await page.evaluate((el) => {
      return {
        title: el.textContent,
        src: el.href,
      };
    }, link);

    profiles.push(src);
  }

  console.log(profiles);

  // Do not close browser after search is complete.
  // await browser.close();
};

module.exports = { getSearchResult };
