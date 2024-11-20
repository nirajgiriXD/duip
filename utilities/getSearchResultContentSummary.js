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
const getSearchResultContentSummary = async (content) => {
    let contentSummary = "";
    const LLAMA_MODEL_NAME = process.env.LLAMA_MODEL_NAME;

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
        const prompt = `Read the following content about a person and generate a concise summary focusing exclusively on their key details, important facts, and main takeaways. Start the summary with an "Overview" section that analyzes and provides insights into the person's characteristics, such as their personality, economic status, social status, relationship status, age, health, and other relevant attributes based on the provided content. If the information is unclear or insufficient to infer certain details, do not include speculative or hallucinated content—only provide insights supported by the content. Structure the rest of the summary into sections with clear and descriptive headings based on the topics covered. Maintain a neutral tone, avoid repetition, and exclude any ads, navigation text, duplicate content, or unrelated information. Ensure the summary focuses only on relevant information about the individual. Here is the content: ${content}`;

        contentSummary = await session.prompt(prompt);
    } catch (error) {
        console.error("Error running the Llama model:", error);
    }

    return contentSummary;
};

export default getSearchResultContentSummary;