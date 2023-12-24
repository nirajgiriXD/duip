/**
 * External dependencies.
 */
const yargs = require("yargs");
const puppeteer = require("puppeteer-extra");
const stealthPluginPuppeteer = require("puppeteer-extra-plugin-stealth");

/**
 * Main class of the application responsible for initializing and starting the application.
 */
class ProfileHunter {
  constructor() {
    // Call the main function.
    this.main();
  }

  /**
   * Manages the overall application lifecycle.
   */
  main() {
    // Initialize data members.
    this.handleSearchArguments();

    // Check whether any arguments were present.
    if (!this.hasArguments()) {
      console.log("Error: Minimum one argument expected, received none.");
      return;
    }

    // Show query for debugging.
    console.log(this.getSearchQuery());

    this.handleCrawl(this.getSearchQuery());
  }

  /**
   * Handle arguments received from CLI.
   */
  handleSearchArguments() {
    const argv = yargs
      .option("name", {
        describe: "Display Name",
        demandOption: false, // Make this option required
        type: "string", // Specify the type of the option
      })
      .option("username", {
        describe: "Username",
        demandOption: false,
        type: "string",
      })
      .option("email", {
        describe: "Email",
        demandOption: false,
        type: "string",
      })
      .option("phone", {
        describe: "Phone",
        demandOption: false,
        type: "string",
      })
      .option("address", {
        describe: "Address",
        demandOption: false,
        type: "string",
      })
      .option("site", {
        describe: "Site",
        demandOption: false,
        type: "string",
      })
      .option("organization", {
        describe: "Organization",
        demandOption: false,
        type: "string",
      }).argv;

    // Initialize data members using argv object.
    this.name = argv["name"];
    this.username = argv["username"];
    this.email = argv["email"];
    this.phone = argv["phone"];
    this.address = argv["address"];
    this.site = argv["site"];
    this.organization = argv["organization"];
  }

  /**
   * Checks whether any arguments were received.
   * @returns boolean True if any argument, else false.
   */
  hasArguments() {
    return this.name ||
      this.username ||
      this.email ||
      this.phone ||
      this.address ||
      this.site ||
      this.organization
      ? true
      : false;
  }

  /**
   * @todo Improve search query
   * @returns string Search Query
   */
  getSearchQuery() {
    const initialQuery = "https://www.google.com/search?q=";
    let finalQuery = initialQuery;

    finalQuery = this.site
      ? finalQuery === initialQuery
        ? `${finalQuery}site%3A${this.site}`
        : `${finalQuery}+site%3A${this.site}`
      : finalQuery;

    finalQuery = this.name
      ? finalQuery === initialQuery
        ? `${finalQuery}intext%3A${this.name}`
        : `${finalQuery}+intext%3A${this.name}`
      : finalQuery;

    finalQuery = this.username
      ? finalQuery === initialQuery
        ? `${finalQuery}inurl%3A${this.username}`
        : `${finalQuery}+inurl%3A${this.username}`
      : finalQuery;

    return finalQuery;
  }

  /**
   * @todo Logic to handle search query result
   */
  async handleCrawl(searchQuery) {
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
  }
}

new ProfileHunter();
