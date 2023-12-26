/**
 * Generates the search query
 *
 * @todo Improve search query
 * @returns string Search Query
 */
const getSearchQuery = ({
  username,
  name,
  email,
  phone,
  address,
  site,
  organization,
}) => {
  // Start with the base search query URL
  let finalQuery = "https://www.google.com/search?q=";

  // Helper function to add a term to the query
  const addTermToQuery = (term, isQuoted, operator) => {
    if (term) {
      finalQuery +=
        finalQuery === "https://www.google.com/search?q="
          ? isQuoted
            ? `${operator}%3A%27${term}%27`
            : `${operator}%3A${term}`
          : isQuoted
          ? `+${operator}%3A%27${term}%27`
          : `+${operator}%3A${term}`;
    }
  };

  // Add each term to the query using the helper function
  addTermToQuery(site, false, "site");
  addTermToQuery(name, true, "intext");
  addTermToQuery(username, false, "inurl");
  addTermToQuery(email, false, "intext");
  addTermToQuery(phone, false, "intext");
  addTermToQuery(address, true, "intext");
  addTermToQuery(organization, true, "intext");

  return finalQuery;
};

module.exports = { getSearchQuery };
