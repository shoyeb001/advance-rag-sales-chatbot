import { pool } from "../db/db";

export async function insertChunks(chunks: any[]) {

  for (const chunk of chunks) {

    await pool.query(
      `
      INSERT INTO rag.document_chunks
      (
        document_id,
        content,
        embedding,
        metadata
      )
      VALUES ($1,$2,$3,$4)
      `,
      [
        chunk.document_id,
        chunk.content,
        chunk.embedding,
        chunk.metadata
      ]
    );

  }

}