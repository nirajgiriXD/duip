/**
 * Internal dependencies.
 */
import { hasSearchArgument, getSearchQuery, getSearchResult } from "@utilities";

export const runtime = "nodejs";
export const maxDuration = 300;

export const POST = async (request) => {
  try {
    const formData = await request.json();

    // Check whether any arguments were present.
    if (!hasSearchArgument(formData)) {
      return Response.json(
        { message: "Minimum one argument expected, received none." },
        { status: 400 }
      );
    }

    // Get search query and result.
    const searchQuery = getSearchQuery(formData);
    const searchResults = await getSearchResult(searchQuery);

    return Response.json({
      searchQuery: searchQuery,
      profiles: searchResults,
    });
  } catch (error) {
    console.error("Search failed:", error);

    return Response.json(
      {
        message:
          error?.message ||
          "The search could not be completed. Please try again.",
      },
      { status: 500 }
    );
  }
};
