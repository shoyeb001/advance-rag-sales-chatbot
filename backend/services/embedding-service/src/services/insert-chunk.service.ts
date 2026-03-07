import { pool } from "../db/db";

// export const insertRagDocument = async (document: any) => {
//   try {
//     const insertedDoc = await pool.query(
//       `
//       INSERT INTO rag.documents (tenant_id, title, summary, keywords) ValUES ($1, $2, $3, $4)
//       `, [document.tenant_id, document.title, document.summary, document.keywords]
//     )
//     console.log("DEBUG: Document data inserted")
//     return insertedDoc.rows[0].id;

//   } catch (error) {
//     console.error("ERROR: Failed to insert document", error)
//     throw error;
//   }
// }

export const insertChunks = async (chunks: any[]) => {

  for (const chunk of chunks) {
    const vector = `[${chunk.embedding.join(",")}]`;
    await pool.query(
      `
      INSERT INTO rag.document_chunks
      (
        document_id,
        content,
        embedding_text,
        embedding,
        metadata
      )
      VALUES ($1,$2,$3, $4,$5)
      `,
      [
        chunk.document_id,
        chunk.content,
        chunk.embedding_text,
        vector,
        chunk.metadata
      ]
    );

  }

}