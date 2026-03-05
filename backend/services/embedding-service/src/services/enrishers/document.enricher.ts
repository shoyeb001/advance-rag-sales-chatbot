import { ChatOpenAI } from "@langchain/openai";

const llm = new ChatOpenAI({
    modelName: "nvidia/nemotron-3-nano-30b-a3b:free",
    apiKey: process.env.OPENROUTER_API_KEY!,
    configuration: {
        baseURL: "https://openrouter.ai/api/v1",
    }
})

export const enrichDocument = async (document: string) => {
    const prompt = `
     You are a helpful assistant that summarizes the following document in a concise and informative manner. Extract a title, a detailed summary, a list of ketwords. 

     Extract:
     - title
     - summary
     - keywords 
    
     Return JSON.

     Document: 
      ${document.slice(0, 5000)}
    `

    try {
        const res = await llm.invoke(prompt)
        console.log("LLM enrichment response:", res)
        return JSON.parse(res.content as string)
    } catch (error) {
        console.error("LLM enrichment error:", error)
        return null
    }
}
