import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

const s3Client = new S3Client({
    region: process.env.S3_REGION,
    endpoint: process.env.S3_ENDPOINT,
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY!,
        secretAccessKey: process.env.S3_SECRET_KEY!
    },
    forcePathStyle: true
})

export async function uploadToS3(file: Express.Multer.File) {
    const key = `${uuidv4()}-${file.originalname.replace(/\s+/g, "-")}`;
    try {
        await s3Client.send(
            new PutObjectCommand({
                Bucket: process.env.S3_BUCKET!,
                Key: key,
                Body: file.buffer,
            })
        );
        return key
    } catch (error) {
        console.log("ERROR: Error uploading to S3:", error);
        throw error;
    }

}