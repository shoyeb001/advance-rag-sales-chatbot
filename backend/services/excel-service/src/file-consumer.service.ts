import { getChannel } from "./queue/queue";

export const startFileConsumer = async () => {
    const channel = getChannel();
    await channel.prefetch(1); //fetch one message at a time
    await channel.consume('excel-ingest-queue', async (msg) => {
        if (!msg) {
            return;
        }
        try {
            const data = JSON.parse(msg.content.toString());
            console.log('Received message:', data);

        } catch (error) {
            console.error('ERROR: Error processing message:', error);
        }
    })
    console.log('INFO: File consumer started')
}