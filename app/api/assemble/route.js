/**
 * Internal dependencies.
 */
import { getSearchResultContent } from "@utilities";

export const runtime = "nodejs";
export const maxDuration = 300;

export const POST = async (request) => {
  try {
    const { profiles } = await request.json();

    if (!Array.isArray(profiles) || profiles.length === 0) {
      return Response.json(
        { message: "Select at least one profile before assembling content." },
        { status: 400 }
      );
    }

    // Crawl each selected profile and collect its readable content.
    const profileContent = await getSearchResultContent(profiles);

    return Response.json({ profileContent: profileContent });
  } catch (error) {
    console.error("Assembling profile content failed:", error);

    return Response.json(
      {
        message:
          error?.message ||
          "The profile content could not be assembled. Please try again.",
      },
      { status: 500 }
    );
  }
};
