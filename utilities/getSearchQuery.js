/**
 * Generates the search query
 *
 * @returns string Search Query
 */
const getSearchQuery = ({
  username,
  name,
  email,
  phone,
  address,
  profession,
  organization,
}) => {
  // Start with the base search query URL
  let finalQuery = "https://www.google.com/search?q=";

  // Helper function to add parameter to the search query
  const addParameterToSearchQuery = (parameter) => {
    if (parameter) {
      const isFirstParameter =
        finalQuery === "https://www.google.com/search?q=";
      const filteredParameter = parameter.replaceAll(" ", "+");
      finalQuery += isFirstParameter
        ? filteredParameter
        : `+${filteredParameter}`;
    }
  };

  /**
   * ASCII Encoding Reference
   *
   * %20    space
   * %22    "
   * %27    '
   * %3A    :
   */

  // Add parameters to search query
  addParameterToSearchQuery(name ? `intext%3A"${name}"` : "");
  addParameterToSearchQuery(username ? `inurl%3A"${username}"` : "");
  addParameterToSearchQuery(email ? `intext%3A"${email}"` : "");
  addParameterToSearchQuery(phone ? `intext%3A"${phone}"` : "");
  addParameterToSearchQuery(profession ? `~${profession}` : "");
  addParameterToSearchQuery(address ? `intext%3A"${address}"` : "");
  addParameterToSearchQuery(organization ? `intext%3A"${organization}"` : "");

  return finalQuery;
};

export default getSearchQuery;
