/**
 * Internal dependencies.
 */
import { getSearchResultContent } from "@utilities";

export const POST = async (req, res) => {
  const { profiles } = await req.json();

  // Summarize search result.
  const profileContent = await getSearchResultContent(profiles);

  // Prepare response.
  const response = {
    profileContent: profileContent,
  };

  return new Response(JSON.stringify(response), {
    status: 200,
  });
};
