/**
 * Internal dependencies.
 */
import { getSearchResultContentSummary } from "@utilities";

export const runtime = "nodejs";
export const maxDuration = 300;

export const POST = async (request) => {
  try {
    const { profileContent, dataAnalystType } = await request.json();

    if (!profileContent) {
      return Response.json(
        { message: "There is no profile content to summarize." },
        { status: 400 }
      );
    }

    // Summarize search result.
    const profileContentSummary = await getSearchResultContentSummary(
      profileContent,
      dataAnalystType
    );

    return Response.json({ profileSummary: profileContentSummary });
  } catch (error) {
    console.error("Summarizing profile content failed:", error);

    return Response.json(
      {
        message:
          error?.message ||
          "The profile content could not be summarized. Please try again.",
      },
      { status: 500 }
    );
  }
};
