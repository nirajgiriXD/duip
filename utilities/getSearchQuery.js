/**
 * Generates the search query
 *
 * @todo Improve search query
 * @returns string Search Query
 */
const getSearchQuery = ({
  username,
  mode,
  name,
  email,
  phone,
  address,
  site,
  organization,
  preciseName,
  preciseAddress,
  preciseOrganization,
}) => {
  // Start with the base search query URL
  let finalQuery = "https://www.google.com/search?q=";
  const joinQueryOperator = mode === "precise" ? "+AND+" : "+";

  // Helper function to add a term to the query
  const addTermToQuery = (term, operator, isPrecise, isWrapped) => {
    const searchOperator = isPrecise ? "" : `${operator}%3A`;
    const quotationMark = isPrecise ? `"` : isWrapped ? `%27` : ``;

    if (term) {
      finalQuery +=
        finalQuery === "https://www.google.com/search?q="
          ? `${searchOperator}${quotationMark}${term}${quotationMark}`
          : `${joinQueryOperator}${searchOperator}${quotationMark}${term}${quotationMark}`;
    }
  };

  // Add each term to the query using the helper function
  addTermToQuery(site, "site", false, false);
  addTermToQuery(
    preciseName === undefined ? name : preciseName,
    "intext",
    Boolean(preciseName),
    true
  );
  addTermToQuery(username, "intext", false, false);
  addTermToQuery(email, "intext", false, false);
  addTermToQuery(phone, "intext", false, false);
  addTermToQuery(
    preciseAddress === undefined ? address : preciseAddress,
    "intext",
    Boolean(preciseAddress),
    true
  );
  addTermToQuery(
    preciseOrganization === undefined ? organization : preciseOrganization,
    "intext",
    Boolean(preciseOrganization),
    true
  );

  return finalQuery;
};

module.exports = { getSearchQuery };
