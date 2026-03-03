import ampq from 'amqplib';

let channel: ampq.Channel;

export async function connectQueue() {
    const connection = await ampq.connect(process.env.RABBITMQ_URL!);
    channel = await connection.createChannel(); //creating channel
    console.log('RabbitMQ connected');
    await channel.assertExchange('file-upload-events', 'direct', { durable: true });//creating the exchange
}

export const publishToQueue = async (exchange: string, route: string, message: any) => {
    if (!channel) {
        throw new Error('RabbitMQ connection not estalished');
    }
    channel.publish(
        exchange,
        route,
        Buffer.from(JSON.stringify(message)),
        {persistent:true}
    )
}