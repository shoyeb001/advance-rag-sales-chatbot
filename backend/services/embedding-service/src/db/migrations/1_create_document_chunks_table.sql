-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create schema for RAG
CREATE SCHEMA IF NOT EXISTS rag;


----------------------------------------------------
-- Chunk table with embeddings
----------------------------------------------------

CREATE TABLE IF NOT EXISTS rag.document_chunks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    document_id UUID NOT NULL,

    content TEXT NOT NULL,

    -- enriched embedding text (document + section context)
    embedding_text TEXT NOT NULL,

    -- vector embedding
    embedding VECTOR(1536),

    -- metadata for hybrid search
    metadata JSONB,

    created_at TIMESTAMP DEFAULT NOW()
);

----------------------------------------------------
-- Indexes
----------------------------------------------------

-- vector index for similarity search
CREATE INDEX IF NOT EXISTS idx_chunks_embedding
ON rag.document_chunks
USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

-- document lookup
CREATE INDEX IF NOT EXISTS idx_chunks_document
ON rag.document_chunks(document_id);

-- metadata filtering
CREATE INDEX IF NOT EXISTS idx_chunks_metadata
ON rag.document_chunks
USING GIN(metadata);

-- keyword search
CREATE INDEX IF NOT EXISTS idx_chunks_content
ON rag.document_chunks
USING GIN(to_tsvector('english', content));