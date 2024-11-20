/**
 * Internal dependencies.
 */
import { getSearchResultContentSummary, getSearchResultContent } from "@utilities";

export const POST = async (req, res) => {
  const { searchResults } = await req.json();

  // Summarize search result.
  const searchContent = await getSearchResultContent(searchResults);
  const searchResultsSummary = await getSearchResultContentSummary(searchContent);

  // Prepare response.
  const response = {
    profileSummary: searchResultsSummary,
  };

  return new Response(JSON.stringify(response), {
    status: 200,
  });
};
