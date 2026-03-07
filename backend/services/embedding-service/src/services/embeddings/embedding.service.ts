// import { OpenAIEmbeddings } from "@langchain/openai";
import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";

// export const embeddings = new OpenAIEmbeddings({
//     model: "nvidia/nemotron-3-nano-30b-a3b:free",
//     apiKey: process.env.OPENROUTER_API_KEY!,
//     configuration: {
//         baseURL: "https://openrouter.ai/api/v1",
//     }
// });
const embeddings = new HuggingFaceInferenceEmbeddings({
    apiKey: process.env.HUGGING_FACE_TOKEN,
    model: "sentence-transformers/all-MiniLM-L6-v2",
});

export const embedChunks = async (chunks: string[]) => {
    return await embeddings.embedDocuments(chunks);
}

