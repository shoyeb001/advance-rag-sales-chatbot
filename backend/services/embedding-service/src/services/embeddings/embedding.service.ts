import { OpenAIEmbeddings } from "@langchain/openai";

export const embeddings = new OpenAIEmbeddings({
    model: "nvidia/nemotron-3-nano-30b-a3b:free",
    apiKey: process.env.OPENROUTER_API_KEY!,
    configuration: {
        baseURL: "https://openrouter.ai/api/v1",
    }
});

export const embedChunks = async (chunks: string[]) => {
    return await embeddings.embedDocuments(chunks);
}

