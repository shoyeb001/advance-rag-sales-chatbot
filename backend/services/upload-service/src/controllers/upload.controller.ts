import { Request, Response } from "express";
import { uploadToS3 } from "../services/s3.service";
import { createDocumentService } from "../services/document.service";
import { publishToQueue } from "../queue/queue";

export const uploadFile = async (req: Request, res: Response) => {
    try {
        const file = req.file;
        //enter validation for body
        const { tenantId, moduleType } = req.body;
        if (!file) {
            return res.status(400).json({ message: "No file uploaded" })
        }
        const storageKey = await uploadToS3(file);
        const document = await createDocumentService({ tenantId, fileType: file.mimetype, moduleType, storageKey });
        //checking if the file is excel file
        const isExcel = moduleType === 'excel';
        console.log("INFO: File mimetype:", file.mimetype)

        const routingKey = isExcel ? 'file.uploaded.excel' : 'file.uploaded';
        //publishing event to rabbitmq for file uploaded
        await publishToQueue('file-upload-events', routingKey, document);
        return res.status(200).json({ message: "File uploaded successfully", document })
    } catch (e) {
        console.log("ERROR:", e)
        res.status(200).json({ message: "Error uploading file" })
    }
}