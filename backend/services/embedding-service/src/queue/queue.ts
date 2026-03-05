import ampq from 'amqplib';

let channel: ampq.Channel;

export async function connectQueue() {
    console.log(process.env.RABBITMQ_URL!)
    const connection = await ampq.connect(process.env.RABBITMQ_URL!);
    channel = await connection.createChannel(); //creating channel
    console.log('RabbitMQ connected');
    const uploadedFileQueue = await channel.assertQueue('embedding-queue', { durable: true })
    //bind queue with exchange 
    await channel.bindQueue(uploadedFileQueue.queue, 'file-upload-events', 'file.uploaded')
}

export const getChannel = () => {
    if (!channel) {
        throw new Error("RabbitMQ connection not established")
    }
    return channel;
}
