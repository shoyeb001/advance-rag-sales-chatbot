import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { Readable } from "stream";

const s3 = new S3Client({
    region: process.env.S3_REGION,
    endpoint: process.env.S3_ENDPOINT,
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY!,
        secretAccessKey: process.env.S3_SECRET_KEY!,
    },
    forcePathStyle: true,
});

async function streamToBuffer(stream: Readable): Promise<Buffer> {

    const chunks: Buffer[] = [];

    for await (const chunk of stream) {
        chunks.push(chunk as Buffer);
    }

    return Buffer.concat(chunks);
}

export async function fetchFileFromS3(storageKey: string): Promise<Buffer> {

    const command = new GetObjectCommand({
        Bucket: process.env.S3_BUCKET!,
        Key: storageKey
    });

    const response = await s3.send(command);

    const body = response.Body as Readable;

    return streamToBuffer(body);
}