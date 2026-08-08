/**
 * Posts JSON to an internal API route and unwraps the response.
 *
 * Centralising this keeps error handling consistent: a failed request always
 * surfaces the server's `message`, never an opaque parsing error.
 *
 * @param {string} url  Route to call.
 * @param {object} body Payload to send.
 * @returns {Promise<object>} Parsed response body.
 */
export const postJson = async (url, body) => {
  let response;

  try {
    response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    throw new Error(
      "Could not reach the DUIP server. Check that it is still running."
    );
  }

  let data = null;
  try {
    data = await response.json();
  } catch {
    // Response had no JSON body; fall back to the status code below.
  }

  if (!response.ok) {
    throw new Error(
      data?.message || `Request failed with status ${response.status}.`
    );
  }

  return data ?? {};
};
