-- Production-Grade PostgreSQL Schema Seed for TaxOps AI (Supabase Database)

-- 1. Create Enums and Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE invoice_type AS ENUM ('Sales', 'Purchase');
CREATE TYPE filing_status AS ENUM ('Draft', 'Awaiting CA Review', 'Approved by CA', 'Filed');
CREATE TYPE notice_status AS ENUM ('Awaiting Action', 'Replied', 'Resolved');

-- 2. Business Clients Table
CREATE TABLE IF NOT EXISTS clients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    pan VARCHAR(10) NOT NULL UNIQUE CHECK (pan ~ '^[A-Z]{5}[0-9]{4}[A-Z]{1}$'),
    legal_name TEXT NOT NULL,
    gstin VARCHAR(15) UNIQUE CHECK (gstin IS NULL OR gstin ~ '^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$'),
    state TEXT NOT NULL,
    mobile VARCHAR(20) NOT NULL,
    employee_mobile VARCHAR(20),
    active_template VARCHAR(30) NOT NULL DEFAULT 'consultant',
    scheme TEXT NOT NULL DEFAULT 'Regular Scheme',
    status VARCHAR(20) NOT NULL DEFAULT 'Active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexing for rapid credentials retrieval
CREATE INDEX idx_clients_pan ON clients(pan);
CREATE INDEX idx_clients_gstin ON clients(gstin);
CREATE INDEX idx_clients_mobile ON clients(mobile);

-- 3. Invoices Ledger Table
CREATE TABLE IF NOT EXISTS invoices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
    type invoice_type NOT NULL,
    invoice_no TEXT NOT NULL,
    date DATE NOT NULL,
    particulars TEXT NOT NULL,
    sac_hsn_code VARCHAR(10) NOT NULL,
    taxable_value NUMERIC(15, 2) NOT NULL CHECK (taxable_value >= 0),
    cgst NUMERIC(15, 2) NOT NULL DEFAULT 0 CHECK (cgst >= 0),
    sgst NUMERIC(15, 2) NOT NULL DEFAULT 0 CHECK (sgst >= 0),
    igst NUMERIC(15, 2) NOT NULL DEFAULT 0 CHECK (igst >= 0),
    total_amount NUMERIC(15, 2) NOT NULL CHECK (total_amount >= 0),
    status VARCHAR(30) NOT NULL DEFAULT 'Pending CA Review',
    source TEXT NOT NULL DEFAULT 'WhatsApp (Owner)',
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_invoices_client_type ON invoices(client_id, type);
CREATE INDEX idx_invoices_status ON invoices(status);

-- 4. Returns & Filings Table
CREATE TABLE IF NOT EXISTS filings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
    return_type VARCHAR(10) NOT NULL, -- GSTR-1, GSTR-3B, ITR-4
    period VARCHAR(20) NOT NULL, -- e.g., 'May 2026'
    due_date DATE NOT NULL,
    taxable_sales NUMERIC(15, 2) NOT NULL DEFAULT 0,
    total_output_tax NUMERIC(15, 2) NOT NULL DEFAULT 0,
    total_input_tax NUMERIC(15, 2) NOT NULL DEFAULT 0,
    net_tax_due NUMERIC(15, 2) NOT NULL DEFAULT 0,
    status filing_status NOT NULL DEFAULT 'Draft',
    arn TEXT,
    cpin VARCHAR(20),
    payment_status VARCHAR(20) NOT NULL DEFAULT 'NA',
    filing_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_filings_client_period ON filings(client_id, period);

-- 5. Legal Notices Table
CREATE TABLE IF NOT EXISTS notices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
    notice_type TEXT NOT NULL, -- e.g., ASMT-10
    discrepancy_type TEXT NOT NULL,
    issued_date DATE NOT NULL,
    reply_deadline DATE NOT NULL,
    amount_discrepancy TEXT NOT NULL,
    severity VARCHAR(10) NOT NULL DEFAULT 'Medium',
    status notice_status NOT NULL DEFAULT 'Awaiting Action',
    content TEXT NOT NULL,
    ai_reply_template TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. AI Telemetry & Support Tickets Table
CREATE TABLE IF NOT EXISTS tickets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id TEXT NOT NULL,
    user_name TEXT NOT NULL,
    page_url TEXT,
    timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    audio_duration VARCHAR(10),
    transcription TEXT NOT NULL,
    diagnosis TEXT NOT NULL,
    solution TEXT NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'Diagnosed',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
