import { pool } from "../db/db";
import { TDocument } from "../@types";
const createDocumentService = async (document: TDocument) => {
    const result = await pool.query(
        `
        INSERT INTO documents (tenant_id, file_type, module_type, storage_key, staus)
        VALUES ($1, $2, $3, $4, 'uploaded')
        RETURNING *
        `,
        [document.tenantId, document.fileType, document.moduleType, document.storageKey]
    )
    return result.rows[0]
}
export default createDocumentService