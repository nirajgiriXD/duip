/**
 * External dependencies.
 */
import puppeteer from "puppeteer-extra";
import stealthPluginPuppeteer from "puppeteer-extra-plugin-stealth";

let isStealthPluginRegistered = false;

/**
 * Resolves the `HEADLESS` environment variable into a value Puppeteer accepts.
 *
 * Puppeteer >= 23 only understands `true`, `false` and `"shell"`; the legacy
 * `"new"` value now maps onto the default headless mode.
 *
 * @returns {boolean|"shell"} Headless mode.
 */
const getHeadlessMode = () => {
  const headless = (process.env.HEADLESS || "").trim().toLowerCase();

  if (headless === "false" || headless === "0") return false;
  if (headless === "shell" || headless === "old") return "shell";

  return true;
};

/**
 * Launches a stealth-enabled browser using the shared project configuration.
 *
 * @returns {Promise<import("puppeteer").Browser>} Browser instance.
 */
const launchBrowser = async () => {
  // Register the stealth plugin once per process.
  if (!isStealthPluginRegistered) {
    puppeteer.use(stealthPluginPuppeteer());
    isStealthPluginRegistered = true;
  }

  const args = ["--start-maximized"];
  if (process.env.PROXY_SERVER) {
    args.push(`--proxy-server=${process.env.PROXY_SERVER}`);
  }

  return puppeteer.launch({
    headless: getHeadlessMode(),
    args,
  });
};

export default launchBrowser;
