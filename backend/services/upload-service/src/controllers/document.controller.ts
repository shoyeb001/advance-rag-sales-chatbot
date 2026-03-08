import { Request, Response } from "express";
import { getDocumentStatusService } from "../services/document.service";
import { TDocumentStatusParams } from "../@types";
export const getDocumentStatus = async (req: Request<TDocumentStatusParams>, res: Response) => {
    try {
        const { documentId } = req.params;
        const documentStatus = await getDocumentStatusService(documentId);
        res.status(200).json({ documentId, status: documentStatus });
    } catch (error) {
        console.error("ERROR: Failed to get document status", error);
        res.status(500).json({ error: "Failed to get document status" });
    }
}