import { getChannel } from "../queue/queue";
import { updateDocumetStatusService } from "./document.service";

export const startEmbeddingConsumer = async () => {
    const channel = getChannel();
    await channel.consume('embedding-results-queue', async (msg) => {
        if (!msg) {
            return;
        }
        try {
            const data = JSON.parse(msg.content.toString());
            console.log('INFO: Received message:', data)
            await updateDocumetStatusService(data.documentId, data.status)
            channel.ack(msg)
        } catch (error) {
            console.error("ERROR: Failed to update document status", error)
        }
    })
}