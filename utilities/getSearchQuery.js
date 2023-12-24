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
  const initialQuery = "https://www.google.com/search?q=";
  let finalQuery = initialQuery;

  finalQuery = site
    ? finalQuery === initialQuery
      ? `${finalQuery}site%3A${site}`
      : `${finalQuery}+site%3A${site}`
    : finalQuery;

  finalQuery = name
    ? finalQuery === initialQuery
      ? `${finalQuery}intext%3A${name}`
      : `${finalQuery}+intext%3A${name}`
    : finalQuery;

  finalQuery = username
    ? finalQuery === initialQuery
      ? `${finalQuery}inurl%3A${username}`
      : `${finalQuery}+inurl%3A${username}`
    : finalQuery;

  return finalQuery;
};

module.exports = { getSearchQuery };
