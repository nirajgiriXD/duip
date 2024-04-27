/**
 * ASCII Encoding Reference
 *
 * %20     space
 * %22     "
 * %27     '
 * %3A     :
 */

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
  gender,
  address,
  interest,
  profession,
  organization,
  year_of_birth,
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

  // Add parameters to search query
  addParameterToSearchQuery(name ? `intext%3A"${name}"` : "");
  addParameterToSearchQuery(username ? `inurl%3A"${username}"` : "");
  addParameterToSearchQuery(gender ? `intext%3A"${gender}"` : "");
  addParameterToSearchQuery(email ? `intext%3A"${email}"` : "");
  addParameterToSearchQuery(phone ? `intext%3A"${phone}"` : "");
  addParameterToSearchQuery(interest ? `~${interest}` : "");
  addParameterToSearchQuery(profession ? `~${profession}` : "");
  addParameterToSearchQuery(address ? `intext%3A"${address}"` : "");
  addParameterToSearchQuery(organization ? `intext%3A"${organization}"` : "");

  // Add year of birth to query
  if (year_of_birth) {
    const year = parseInt(year_of_birth);
    if (year > 0) {
      const yearLowerBound = year - 1;
      const yearUpperBound = year + 1;
      addParameterToSearchQuery(`${yearLowerBound}..${yearUpperBound}`);
    }
  }

  return finalQuery;
};

export default getSearchQuery;
