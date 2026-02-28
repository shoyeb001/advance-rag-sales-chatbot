CREATE TABLE IF NOT EXISTS tenants (
    id UUID PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS documents (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    tenant_id UUID,
    file_type TEXT,
    module_type TEXT,
    storage_key TEXT,
    status TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);