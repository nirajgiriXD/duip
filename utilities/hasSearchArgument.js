/**
 * Checks whether any arguments were received.
 *
 * @returns boolean True if any argument, else false.
 */
const hasSearchArgument = (data) => {
  const values = Object.values({
    ...data,
    parameterAccuracy: "",
    parameterJoinMode: "",
  });

  for (let i = 0; i < values.length; i++) {
    if (values[i]) {
      return true;
    }
  }

  return false;
};

export default hasSearchArgument;
