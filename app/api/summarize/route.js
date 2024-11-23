/**
 * Internal dependencies.
 */
import { getSearchResultContentSummary } from "@utilities";

export const POST = async (req, res) => {
  const { profileContent, dataAnalystType } = await req.json();

  // Summarize search result.
  const profileContentSummary = await getSearchResultContentSummary(profileContent, dataAnalystType);

  // Prepare response.
  const response = {
    profileSummary: profileContentSummary,
  };

  return new Response(JSON.stringify(response), {
    status: 200,
  });
};
