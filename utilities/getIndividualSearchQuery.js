/**
 * Generates the search query
 *
 * @returns string Search Query
 */
const getIndividualSearchQuery = ({
  username,
  name,
  email,
  phone,
  address,
  site,
  organization,
  parameterAccuracy,
  parameterJoinMode,
}) => {
  // Start with the base search query URL
  let finalQuery = "https://www.google.com/search?q=";
  const joinQueryOperator = parameterJoinMode === "and" ? "+AND+" : "+";

  // Helper function to add a term to the query
  const addTermToQuery = (term, operator, isWrapped) => {
    const searchOperator = `${operator}%3A`;
    const quotationMark =
      parameterAccuracy === "strict" ? `"` : isWrapped ? "%27" : "";

    if (term) {
      finalQuery +=
        finalQuery === "https://www.google.com/search?q="
          ? `${searchOperator}${quotationMark}${term}${quotationMark}`
          : `${joinQueryOperator}${searchOperator}${quotationMark}${term}${quotationMark}`;
    }
  };

  // Add each term to the query using the helper function
  addTermToQuery(site, "site", false);
  addTermToQuery(username, "intext", false);
  addTermToQuery(email, "intext", false);
  addTermToQuery(phone, "intext", false);
  addTermToQuery(name, "intext", false);
  addTermToQuery(address, "intext", false);
  addTermToQuery(organization, "intext", false);

  // Replace whitespace
  finalQuery = finalQuery.replaceAll(" ", "%20");

  return finalQuery;
};

export default getIndividualSearchQuery;
