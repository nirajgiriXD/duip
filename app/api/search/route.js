/**
 * Internal dependencies.
 */
import { hasSearchArgument, getSearchQuery, getSearchResult } from "@utilities";

export const POST = async (req, res) => {
  const formData = await req.json();

  // Check whether any arguments were present.
  if (!hasSearchArgument(formData)) {
    return new Response(
      JSON.stringify({
        message: "Minimum one argument expected, received none.",
      }), { status: 400 }
    );
  }

  // Get search query and result.
  const searchQuery = getSearchQuery(formData);
  const searchResults = await getSearchResult(searchQuery);

  // Prepare response.
  const response = {
    searchQuery: searchQuery,
    profiles: searchResults,
  };

  return new Response(JSON.stringify(response), {
    status: 200,
  });
};
