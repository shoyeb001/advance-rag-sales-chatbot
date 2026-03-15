import ampq from 'amqplib';

let channel: ampq.Channel;

export async function connectQueue() {
    const connection = await ampq.connect(process.env.RABBITMQ_URL!);
    channel = await connection.createChannel(); //creating channel
    console.log('DEBUG: RabbitMQ connected');
    const uploadedFileQueue = await channel.assertQueue('excel-ingest-queue', { durable: true })
    //bind queue with exchange 
    await channel.bindQueue(uploadedFileQueue.queue, 'file-upload-events', 'file.excel.uploaded')
    //create queue for sending embedding results
    // await channel.assertQueue('embedding-results-queue', { durable: true })
}

export const getChannel = () => {
    if (!channel) {
        throw new Error("ERROR: RabbitMQ connection not established")
    }
    return channel;
}

export const publishToQueue = async (name: string, message: any) => {
    const channel = getChannel();
    try {
        channel.sendToQueue(name, Buffer.from(JSON.stringify(message)))
        console.log(`INFO: Message published to ${name} queue`, message)
    } catch (error) {
        console.error(`ERROR: Failed to publish message to ${name} queue`, error)
    }
}
