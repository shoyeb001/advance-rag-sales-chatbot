import { contextualChunk } from "../chunking/contextual.chunker";
import { mergeSymanticChunks } from "../chunking/symantic.merge";
import { embedChunks } from "../embeddings/embedding.service";
import { insertChunks } from "../insert-chunk.service";

export const ingestDocument = async (text: string, documentId: string, metadata: any) => {
    const contextual = contextualChunk(text);
    const symantic = await mergeSymanticChunks(contextual);
    console.log("INFO: Contextual chunks:", contextual);
    const enrichedChunks = symantic.map((chunk) => {
        const embeddingText = `
        Document: ${metadata.title}
        Summary: ${metadata.summary}
        ${chunk}
        `;
        console.log("DEBUG: Embedding Text in ingestDocument", embeddingText);
        return {
            raw: chunk,
            embeddingText,
            embedding_text: text
        }
    });

    const vectors = await embedChunks(
        enrichedChunks.map((chunk) => chunk.embeddingText)
    )
    console.log("DEBUG: Embedding vectors", vectors);

    const rowsToInsert = enrichedChunks.map((chunk, index) => ({
        document_id: documentId,
        content: chunk.raw,
        embedding_text: chunk.embeddingText,
        embedding: vectors[index],
        metadata: {
            title: metadata.title,
            keywords: metadata.keywords,
            semantic_type: "paragraph"
        }
    }))
    await insertChunks(rowsToInsert)
}