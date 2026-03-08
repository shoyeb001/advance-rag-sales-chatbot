import { pool } from "../db/db";
import { TDocument } from "../@types";
export const createDocumentService = async (document: TDocument) => {
    try {
        const result = await pool.query(
            `
        INSERT INTO documents (tenant_id, file_type, module_type, storage_key, status)
        VALUES ($1, $2, $3, $4, 'uploaded')
        RETURNING *
        `,
            [document.tenantId, document.fileType, document.moduleType, document.storageKey]
        )
        return result.rows[0]
    } catch (error) {
        console.error("ERROR: Failed to create document", error)
        throw new Error("Failed to create document")
    }

}

export const updateDocumetStatusService = async (documentId: string, status: string) => {
    try {
        await pool.query(
            `
        UPDATE documents SET status= $1 WHERE id = $2`, [status, documentId]
        )
        console.log('DEBUG: Document status updated successfully')
    } catch (error) {
        console.error("ERROR: Failed to update document status", error)
        throw new Error("Failed to update document status")
    }

}

export const getDocumentStatusService = async (documentId: string) => {
    try {
        const status = await pool.query(
            `
        SELECT status FROM documents WHERE id = $1`, [documentId]
        )
        return status.rows[0].status
    } catch (error) {
        console.error("ERROR: Failed to get document status", error)
        throw new Error("Failed to get document status")
    }
}