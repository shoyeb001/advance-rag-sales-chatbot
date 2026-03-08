import { getChannel } from "../queue/queue";
import { enrichDocument } from "./enrishers/document.enricher";
import { fetchFileFromS3 } from "./file.service";
import {  loadPDFBuffer } from "./loaders/pdf.loader";
import { ingestDocument } from "./pipeline/embed.pipeline";

export const startFileConsumer = async () => {
    const channel = getChannel();
    await channel.prefetch(1); //fetch one message at a time
    await channel.consume('embedding-queue', async (msg) => {
        if (!msg) {
            return;
        }
        try {
            const data = JSON.parse(msg.content.toString());
            console.log('Received message:', data);
            const fileBuffer = await fetchFileFromS3(data.storage_key);
            const docs = await loadPDFBuffer(fileBuffer);
            const fullText = docs.map((doc) => doc.content).join("\n");
            const metadata = await enrichDocument(fullText);
            await ingestDocument(fullText, data.id, metadata);
            channel.ack(msg!)
        } catch (error) {
            console.error('ERROR: Error processing message:', error);
        }
    })
    console.log('INFO: File consumer started')
}