const showProcessedInfo = (arguments) => {
  console.log("");
  Object.keys(arguments).forEach((argument) => {
    const argumentName = argument.charAt(0).toUpperCase() + argument.slice(1);
    const argumentValue = arguments[argument]?.replace("+", " ");

    if (argumentValue) {
      console.log(`${argumentName}: ${argumentValue}`);
    }
  });
  console.log("");
};

module.exports = { showProcessedInfo };
