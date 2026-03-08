//we merge all the chunks if they are similar highly. 
import similarity from "compute-cosine-similarity";
import { embedChunks } from "../embeddings/embedding.service";

export const mergeSymanticChunks = async (chunks: string[]) => {
    const vectors = await embedChunks(chunks);
    const mergedChunks: string[] = [];
    let current = chunks[0]
    let currentVector = vectors[0];
    for (let i = 1; i < chunks.length; i++) {
        const sim: number = similarity(currentVector, vectors[i]) || 0
        if (sim > 0.85 && current.length < 1600) {
            current += ""+ chunks[i]
        }else{
            mergedChunks.push(current);
            current = chunks[i];
            currentVector = vectors[i]
        }
    }
    mergedChunks.push(current)
    return mergedChunks;

}