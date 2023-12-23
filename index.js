const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const yargs = require("yargs");

const argv = yargs
  .option("display-name", {
    describe: "Display Name",
    demandOption: false, // Make this option required
    type: "string", // Specify the type of the option
  })
  .option("user-name", {
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
  .option("organization", {
    describe: "Organization",
    demandOption: false,
    type: "string",
  }).argv;

// Access the values using argv object
const display_name = argv["display-name"];
const user_name = argv["user-name"];
const email = argv["email"];
const phone = argv["phone"];
const address = argv["address"];
const organization = argv["organization"];

console.log("Display Name:", display_name);
console.log("Username:", user_name);
console.log("Email:", email);
console.log("Phone:", phone);
console.log("Address:", address);
console.log("Organization:", organization);

const searchQuery =
  "https://www.google.com/search?q=" +
  // Sitename
  "site%3A" +
  '"sitename.com"' +
  // Text that must be included
  "+intext%3A" +
  '"musIncludeText"';

/**
 * Puppeteer
 */
(async () => {
  puppeteer.use(StealthPlugin());
  const browser = await puppeteer.launch({
    headless: false,
    // args: ["--proxy-server=http://123.123.123.123:8080"],
    // executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    // userDataDir: "C:/Users/niraj/AppData/Local/Google/Chrome/User Data/Default",
  });
  const page = await browser.newPage();

  await page.goto(searchQuery);
  // await browser.close();
})();
