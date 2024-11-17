/**
 * Internal dependencies.
 */
import { hasSearchArgument, getSearchQuery, getSearchResult, summarizeSearchResult } from "@utilities";

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

  // Summarize search result.
  const searchContent = searchResults.map((result) => result.content).join("\n\n");
  const searchResultsSummary = await summarizeSearchResult(searchContent);

  // Prepare response.
  const response = {
    data: searchResults,
    summary: searchResultsSummary,
  };

  return new Response(JSON.stringify(response), {
    status: 200,
  });
};
