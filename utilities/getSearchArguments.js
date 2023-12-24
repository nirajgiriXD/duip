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
      describe: "Display Name",
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

  return {
    username: argv["username"],
    name: argv["name"],
    site: argv["site"],
    email: argv["email"],
    phone: argv["phone"],
    address: argv["address"],
    organization: argv["organization"],
  };
};

module.exports = { getSearchArguments };
