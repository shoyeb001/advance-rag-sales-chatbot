import ampq from 'amqplib';

let channel: ampq.Channel;

export async function connectQueue() {
    console.log("INFO:" + process.env.RABBITMQ_URL!, "rabbit mq url")
    const connection = await ampq.connect(process.env.RABBITMQ_URL!);
    channel = await connection.createChannel(); //creating channel
    console.log('DEBUG:RabbitMQ connected');
    await channel.assertExchange('file-upload-events', 'direct', { durable: true });//creating the exchange
    await channel.assertQueue('embedding-results-queue', { durable: true })
}

export const getChannel = () => {
    if (!channel) {
        throw new Error("ERROR: RabbitMQ connection not established")
    }
    return channel;
}

export const publishToQueue = async (exchange: string, route: string, message: any) => {
    if (!channel) {
        throw new Error('RabbitMQ connection not estalished');
    }
    channel.publish(
        exchange,
        route,
        Buffer.from(JSON.stringify(message)),
        { persistent: true }
    )
}