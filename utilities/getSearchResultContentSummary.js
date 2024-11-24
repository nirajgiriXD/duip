/**
 * External dependencies.
 */
import { getLlama, LlamaChatSession } from "node-llama-cpp";
import { fileURLToPath } from "url";
import path from "path";

/**
 * Summarizes the search result content.
 *
 * @returns string
 */
const getSearchResultContentSummary = async (content, dataAnalystType) => {
    let contentSummary = "";
    const LLAMA_MODEL_NAME = process.env.LLAMA_MODEL_NAME;

    const prompts = {
        general: `Act as a personal analyst and create a concise summary of an individual's key attributes and insights based on the available data. Begin the response directly with the 'Overview' heading, without any introductory text. Evaluate aspects such as personality, economic status, social status, relationship status, age, and other relevant characteristics. Then, organize the summary into clearly defined sections with descriptive headings. Exclude unsupported details, ads, navigation text, or unrelated information. Maintain a neutral tone, avoid repetition, and base your analysis strictly on the provided data: ${content}`,
        investor: `Act as an investor analyzing a potential business partner or startup founder. Create a concise profile based on the available data. Begin the response directly with the 'Overview' heading, without any introductory text. Cover their professional background, entrepreneurial experience, and key attributes. Then, provide insights under sections such as 'Professional Experience,' 'Skills and Expertise,' 'Leadership Qualities,' and 'Market Impact.' Conclude with an 'Investment Recommendation' explaining whether the individual or business is a good investment opportunity and why. Exclude unsupported details or unrelated information, maintain a neutral tone, and base your analysis strictly on the provided data: ${content}`,
        hr: `Act as an HR analyst evaluating a potential candidate for employment. Create a concise profile based on the available data. Begin the response directly with the 'Overview' heading, without any introductory text, and cover their professional background, skills, experience, personality traits, and social presence. Then, provide insights under sections such as 'Professional Experience,' 'Skills,' 'Personality,' and 'Social Presence.' Conclude with a 'Hiring Recommendation' explaining whether the candidate is a good fit and why. Exclude unsupported details or unrelated information, maintain a neutral tone, and base your analysis strictly on the provided data: ${content}`,
        matchmaker: `Act as a matchmaker evaluating a potential life partner. Create a concise profile based on the available data. Directly begin with the 'Overview' section, without any introductory text, and cover their personal background, relationship history, personality traits, values, and social presence. Then, provide insights under sections such as 'Personality and Values,' 'Relationship History,' 'Social Presence,' and 'Compatibility.' Conclude with a 'Compatibility Recommendation' explaining whether the individual is a good match for a long-term relationship and why. Exclude unsupported details or unrelated information, maintain a neutral tone, and base your analysis strictly on the provided data: ${content}`
    };

    const acceptedDataAnalystTypes = Object.keys(prompts);
    if (!acceptedDataAnalystTypes.includes(dataAnalystType)) {
        throw new Error("Invalid data analyst type");
    }

    try {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);

        const llama = await getLlama();
        const modelPath = path.join(__dirname, "../models", LLAMA_MODEL_NAME);
        const model = await llama.loadModel({ modelPath });

        const context = await model.createContext();
        const session = new LlamaChatSession({
            contextSequence: context.getSequence()
        });

        // Generate prompt to summarize the content
        const prompt = prompts[dataAnalystType];

        contentSummary = await session.prompt(prompt);
    } catch (error) {
        console.error("Error running the Llama model:", error);
    }

    return contentSummary;
};

export default getSearchResultContentSummary;