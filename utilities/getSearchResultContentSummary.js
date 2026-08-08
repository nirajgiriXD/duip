/**
 * External dependencies.
 */
import { getLlama, LlamaChatSession } from "node-llama-cpp";
import path from "path";

/**
 * Prompt templates keyed by the persona the analysis should be written from.
 */
const prompts = {
  researcher: (content) => `
  Act as a neutral researcher analyzing an individual based strictly on the provided data.

  Begin the response directly with the "Overview" heading. Do not include an introduction before it.

  Create a concise, evidence-based profile covering the individual's key attributes, background, activities, interests, and other characteristics that are meaningfully supported by the available information.

  Organize the analysis into clear sections with descriptive headings. Where useful, distinguish between:
  - Directly observed information
  - Reasonable inferences supported by multiple pieces of evidence

  Do not make unsupported assumptions about the individual's personality, financial situation, social status, relationship status, age, or other personal characteristics. Only include such information when it is explicitly supported by the source data and relevant to the analysis.

  Prioritize meaningful patterns and insights over simply restating the source material. Avoid repetition and do not include advertisements, navigation text, boilerplate, duplicated content, or unrelated information.

  Maintain a neutral, analytical tone and base every substantive conclusion strictly on the provided data.

  Provided data:
  ${content}
  `,

  investor: (content) => `
  Act as an investor conducting an evidence-based assessment of a potential business partner, entrepreneur, or startup founder.

  Begin the response directly with the "Overview" heading. Do not include an introduction before it.

  Create a concise professional profile based strictly on the provided data. Focus on information relevant to evaluating entrepreneurial capability and potential business impact.

  Cover relevant areas such as:
  - Professional Experience
  - Entrepreneurial Experience
  - Skills and Expertise
  - Leadership and Execution
  - Business/Market Experience
  - Notable Achievements

  Distinguish clearly between facts directly supported by the data and reasonable inferences. Do not invent revenue, funding, valuation, market traction, leadership qualities, or business outcomes that are not supported by the available information.

  Conclude with an "Investment Recommendation" that evaluates the available evidence. Do not present the recommendation as a definitive investment decision when critical information is missing. Instead, explain:
  - Positive signals
  - Potential concerns or unknowns
  - What additional information would be useful before making an investment decision

  Ignore advertisements, navigation text, duplicated content, and unrelated information. Maintain a professional, neutral, evidence-driven tone.

  Provided data:
  ${content}
  `,

  hr: (content) => `
  Act as an HR analyst conducting an evidence-based professional profile assessment of a potential candidate.

  Begin the response directly with the "Overview" heading. Do not include an introduction before it.

  Create a concise profile based strictly on the provided data, focusing on job-relevant information.

  Organize the analysis into sections such as:
  - Professional Experience
  - Skills and Expertise
  - Career Progression
  - Relevant Achievements
  - Professional Presence
  - Potential Strengths
  - Potential Development Areas

  Only describe personality or behavioral characteristics when they are directly supported by relevant evidence. Do not infer or evaluate protected or sensitive characteristics, and do not make employment decisions based on information unrelated to job performance.

  Conclude with a "Hiring Recommendation" that assesses the candidate only against the professional evidence available. Clearly identify strengths, potential concerns, and important information that is missing. Do not make a definitive hiring decision when the available data is insufficient.

  Do not include advertisements, navigation text, duplicated content, personal information that is irrelevant to employment, or unrelated material.

  Maintain a neutral, professional, evidence-based tone.

  Provided data:
  ${content}
  `,

  matchmaker: (content) => `
  Act as a relationship-compatibility analyst creating a respectful, evidence-based profile from the provided data.

  Begin the response directly with the "Overview" heading. Do not include an introduction before it.

  Focus on information that is explicitly relevant to understanding relationship preferences, communication patterns, interests, values, lifestyle, and compatibility.

  Organize the analysis into sections such as:
  - Personality and Interests
  - Values and Lifestyle
  - Relationship Preferences
  - Communication and Social Patterns
  - Potential Compatibility Factors
  - Potential Areas of Difference

  Do not invent relationship history, values, personality traits, preferences, or behavioral patterns. Clearly distinguish between directly stated information and reasonable inferences. Do not infer sensitive personal characteristics or make judgments based on protected traits.

  Conclude with a "Compatibility Recommendation" that evaluates potential compatibility only from the evidence available. Highlight:
  - Potential areas of compatibility
  - Potential areas of difference
  - Important unknowns that would require direct conversation

  Do not present the recommendation as a definitive judgment about whether two people should enter a relationship. Avoid stereotypes, moral judgments, and unsupported assumptions.

  Exclude advertisements, navigation text, duplicated content, and unrelated information.

  Maintain a respectful, neutral, and evidence-based tone.

  Provided data:
  ${content}
  `,
};

export const dataAnalystTypes = Object.keys(prompts);

/**
 * Summarizes the search result content.
 *
 * @returns string
 */
const getSearchResultContentSummary = async (content, dataAnalystType) => {
	const LLAMA_MODEL_NAME = process.env.LLAMA_MODEL_NAME;

	if (!dataAnalystTypes.includes(dataAnalystType)) {
		throw new Error("Invalid data analyst type");
	}

	if (!LLAMA_MODEL_NAME) {
		throw new Error(
			"No language model configured. Set LLAMA_MODEL_NAME in your .env file.",
		);
	}

	try {
		const llama = await getLlama();

		// Models live in `<project root>/models`, which is stable in both dev
		// and production because the server is started from the project root.
		const modelPath = path.join(process.cwd(), "models", LLAMA_MODEL_NAME);
		const model = await llama.loadModel({ modelPath });

		const context = await model.createContext();
		const session = new LlamaChatSession({
			contextSequence: context.getSequence(),
		});

		return await session.prompt(prompts[dataAnalystType](content));
	} catch (error) {
		console.error("Error running the Llama model:", error);

		throw new Error(
			`The local language model could not generate a summary: ${error.message}`,
		);
	}
};

export default getSearchResultContentSummary;
