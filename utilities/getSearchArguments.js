/**
 * External dependencies.
 */
const yargs = require("yargs");

/**
 * Prepare arguments received from CLI.
 */
const getSearchArguments = () => {
  const argv = yargs
    .option("name", {
      describe: "Display name",
      demandOption: false,
      type: "string",
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

  const filterArgument = (argument) => {
    // Remove special character and trim.
    return argument?.replace(/[^a-zA-Z0-9. ]/g, "")?.replace(/ +/g, "+");
  };

  return {
    username: filterArgument(argv["username"]),
    name: filterArgument(argv["name"]),
    site: filterArgument(argv["site"]),
    email: filterArgument(argv["email"]),
    phone: filterArgument(argv["phone"]),
    address: filterArgument(argv["address"]),
    organization: filterArgument(argv["organization"]),
  };
};

module.exports = { getSearchArguments };
