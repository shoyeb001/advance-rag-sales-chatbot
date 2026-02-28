import { Request, Response } from "express";
import { uploadToS3 } from "../services/s3.service";
import createDocumentService from "../services/document.service";

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
        return res.status(200).json({ message: "File uploaded successfully", document })
    } catch (e) {
        console.log(e)
        res.status(200).json({ message: "Error uploading file" })
    }
}