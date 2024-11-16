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
const summarizeSearchResult = async (content) => {
    let contentSummary = '';

    try {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);

        const llama = await getLlama();
        const modelPath = path.join(__dirname, "../models", "Llama-3.2-3B-Instruct-IQ3_M.gguf");
        const model = await llama.loadModel({ modelPath });

        const context = await model.createContext();
        const session = new LlamaChatSession({
            contextSequence: context.getSequence()
        });

        // Generate prompt to summarize the content
        const prompt = `Please read the following content and generate a concise summary that captures the main points, important facts, and key takeaways. Focus on providing an overview that would be helpful for someone who wants a quick understanding of the main ideas. Avoid including any ads, navigation text, or unrelated information. Here is the content:

        ${content}`;

        contentSummary = await session.prompt(prompt);
    } catch (error) {
        console.error("Error running the Llama model:", error);
    }

    return contentSummary;
};

export default summarizeSearchResult;