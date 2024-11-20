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
        const prompt = `Act as a personal analyst and create a concise summary of an individual's key attributes and insights. Begin with an "Overview" that evaluates the following aspects: personality, economic status, social status, relationship status, age, and any other relevant characteristics. Use only the available data—exclude unsupported details, ads, navigation text, or unrelated information. Organize the summary into clearly defined sections with descriptive headings. Maintain a neutral tone, avoid repetition, and present the response as if it reflects your own analysis based on the data you collected. The data gathered from various internet sources is as follows: ${content}`;

        contentSummary = await session.prompt(prompt);
    } catch (error) {
        console.error("Error running the Llama model:", error);
    }

    return contentSummary;
};

export default getSearchResultContentSummary;