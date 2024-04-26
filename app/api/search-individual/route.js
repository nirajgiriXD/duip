import {
  hasSearchArgument,
  getSearchQuery,
  getIndividualSearchResult,
} from "@utilities";

export const POST = async (req, res) => {
  const formData = await req.json();

  // Check whether any arguments were present.
  if (!hasSearchArgument(formData)) {
    return new Response(
      JSON.stringify({
        message: "Minimum one argument expected, received none.",
      }),
      {
        status: 400,
      }
    );
  }

  // Get search query.
  const searchQuery = getSearchQuery(formData);

  // Get search result.
  const searchResults = await getIndividualSearchResult(searchQuery);

  return new Response(JSON.stringify({ data: [...searchResults] }), {
    status: 200,
  });
};
