const showProcessedInfo = (arguments) => {
  const filterArgumentName = (argumentName) => {
    return argumentName.charAt(0).toUpperCase() + argumentName.slice(1);
  };

  const filterArgumentValue = (argumentValue) => {
    return typeof argumentValue === "string"
      ? argumentValue.replace("+", " ")
      : argumentValue;
  };

  console.log("");
  Object.keys(arguments).forEach((argument) => {
    if (arguments[argument] !== undefined) {
      const argumentName = filterArgumentName(argument);
      const argumentValue = filterArgumentValue(arguments[argument]);

      console.log(`${argumentName}: ${argumentValue}`);
    }
  });
  console.log("");
};

module.exports = { showProcessedInfo };
