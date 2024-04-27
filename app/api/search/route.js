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
      }),
      {
        status: 400,
      }
    );
  }

  let numOfScroll;
  if (formData.search_type === "normal") {
    numOfScroll = 5;
  } else {
    numOfScroll = 0;
  }

  // Get search query.
  const searchQuery = getSearchQuery(formData);

  // Get search result.
  const searchResults = await getSearchResult(searchQuery, numOfScroll);

  return new Response(JSON.stringify({ data: [...searchResults] }), {
    status: 200,
  });
};
