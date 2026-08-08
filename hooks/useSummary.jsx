"use client";

/**
 * External dependencies.
 */
import { useCallback } from "react";

/**
 * Internal dependencies.
 */
import { postJson } from "@/lib/api";
import { STORAGE_KEYS } from "@/lib/constants";
import { writeStored } from "@/lib/storage";

const useSummary = ({ setProfileSummary, setSummaryLens }) => {
  const fetchProfileSummary = useCallback(
    async (_profileContent, _dataAnalystType) => {
      // Check if the profile content is empty
      if (!_profileContent || _profileContent.trim() === "") {
        throw new Error("Please provide profile content to summarize.");
      }

      const data = await postJson("/api/summarize", {
        profileContent: _profileContent,
        dataAnalystType: _dataAnalystType,
      });

      // Retrieve data from the response data
      const _profileSummary = data.profileSummary || "";

      if (_profileSummary.trim() === "") {
        throw new Error(
          "The language model returned an empty summary. Try again with more content."
        );
      }

      // Save the stringified JSON object to local storage
      writeStored(STORAGE_KEYS.profileSummary, _profileSummary);
      writeStored(STORAGE_KEYS.summaryLens, _dataAnalystType);

      // Set the summary, remembering which lens produced it.
      setProfileSummary(_profileSummary);
      setSummaryLens(_dataAnalystType);

      return { _profileSummary };
    },
    [setProfileSummary, setSummaryLens]
  );

  return { fetchProfileSummary };
};

export default useSummary;
