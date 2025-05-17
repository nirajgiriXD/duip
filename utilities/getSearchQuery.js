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
  // Collect all query parts
  const queryParts = [];

  if (name) queryParts.push(`intext:"${name}"`);
  if (username) queryParts.push(`inurl:"${username}"`);
  if (email) queryParts.push(`intext:"${email}"`);
  if (phone) queryParts.push(`intext:"${phone}"`);
  if (profession) queryParts.push(`~${profession}`);
  if (address) queryParts.push(`intext:"${address}"`);
  if (organization) queryParts.push(`intext:"${organization}"`);

  // Join all parts with spaces and encode
  const query = queryParts.join(' ');
  const finalQuery = `https://www.google.com/search?q=${encodeURIComponent(query)}`;

  return finalQuery;
};

export default getSearchQuery;
