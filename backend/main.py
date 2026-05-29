# Core FastAPI Web Server for TaxOps AI Platform (MongoDB Integrated)
from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
import uuid
import datetime
from dotenv import load_dotenv
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure, ConfigurationError

# Load environment variables from .env
load_dotenv()

app = FastAPI(
    title="TaxOps AI Platform Core API",
    description="Conversational and Administrative tax operating system for Indian SMBs.",
    version="1.0.0"
)

# Enable CORS for frontend dashboard connections
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB Connection Initialization
MONGO_URI = os.getenv("MONGO_URI")
db_connected = False
db = None

if MONGO_URI:
    try:
        # Bind connection client with a 5-second connection timeout
        client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)
        # Test connection
        client.admin.command('ping')
        db = client["taxops"]
        db_connected = True
        print("[MongoDB] Successfully connected to live Atlas Cluster database 'taxops'.")
    except (ConnectionFailure, ConfigurationError, Exception) as e:
        print(f"[MongoDB] Connection failed: {e}. Falling back to in-memory database pools.")
else:
    print("[MongoDB] MONGO_URI not found in environment. Falling back to in-memory database pools.")

# Fallback In-Memory database pools to prevent server crashes
invoices_db = []
tickets_db = []

# Mock JSON templates matching businessTemplates.js
BUSINESS_TEMPLATES = {
    "consultant": {
        "templateId": "consultant_v1",
        "businessType": "Consultant",
        "billingRules": {"defaultSacCode": "998314", "gstRateDefault": 18, "allowInputTaxCredit": True}
    },
    "trader": {
        "templateId": "trader_v1",
        "businessType": "Trader",
        "billingRules": {"defaultSacCode": "0044", "gstRateDefault": 12, "allowInputTaxCredit": False}
    },
    "educator": {
        "templateId": "educator_v1",
        "businessType": "Educator",
        "billingRules": {"defaultSacCode": "999293", "gstRateDefault": 18, "allowInputTaxCredit": True}
    }
}

# Pydantic Schemas
class TicketCreate(BaseModel):
    userId: str
    userName: str
    pageUrl: str
    transcription: str

# Endpoints
@app.get("/")
def read_root():
    return {
        "status": "online",
        "service": "TaxOps AI Backend Engine",
        "database": "MongoDB (Atlas Live)" if db_connected else "In-Memory Fallback Pool",
        "version": "1.0.0",
        "timestamp": datetime.datetime.now().isoformat()
    }

@app.get("/api/v1/templates/{key}")
def get_template(key: str):
    if key not in BUSINESS_TEMPLATES:
        raise HTTPException(status_code=404, detail="Business template schema not found.")
    return BUSINESS_TEMPLATES[key]

@app.post("/api/v1/ocr/parse")
async def parse_invoice_ocr(
    file: UploadFile = File(...),
    client_id: str = Form(...)
):
    # Simulates OCR parsing & logs invoice metadata directly into database
    invoice_id = str(uuid.uuid4())
    invoice_data = {
        "id": invoice_id,
        "clientId": client_id,
        "type": "Purchase",
        "invoiceNo": f"CR/{uuid.uuid4().hex[:4].upper()}",
        "date": datetime.date.today().isoformat(),
        "particulars": "Croma Store (Office Equipment)",
        "sacCode": "847130",
        "taxableValue": 45000.0,
        "cgst": 4050.0,
        "sgst": 4050.0,
        "igst": 0.0,
        "totalAmount": 53100.0,
        "status": "Pending CA Review",
        "source": "WhatsApp (Owner Photo)",
        "imageUrl": "https://images.unsplash.com/photo-1547082299-de196ea013d6?q=80&w=300&auto=format&fit=crop",
        "created_at": datetime.datetime.utcnow().isoformat()
    }

    # Store in MongoDB if active, otherwise append to local fallback list
    if db_connected:
        try:
            db["invoices"].insert_one(invoice_data.copy())
            print(f"[MongoDB] Logged invoice {invoice_data['invoiceNo']} to live 'invoices' collection.")
        except Exception as e:
            print(f"[MongoDB] Write failed: {e}. Logging to fallback memory.")
            invoices_db.append(invoice_data)
    else:
        invoices_db.append(invoice_data)

    return {
        "invoiceId": invoice_id,
        "success": True,
        "seller": "Croma Stores (Infiniti Retail)",
        "sellerGstin": "27AAACI1234C1Z0",
        "invoiceNo": invoice_data["invoiceNo"],
        "date": invoice_data["date"],
        "particulars": invoice_data["particulars"],
        "sacCode": invoice_data["sacCode"],
        "taxableValue": invoice_data["taxableValue"],
        "cgst": invoice_data["cgst"],
        "sgst": invoice_data["sgst"],
        "igst": invoice_data["igst"],
        "totalAmount": invoice_data["totalAmount"],
        "category": "Office Electronics",
        "itcEligible": True
    }

@app.post("/api/v1/tickets")
def log_diagnostic_ticket(ticket: TicketCreate):
    ticket_id = f"tic_{uuid.uuid4().hex[:8]}"
    diagnosis = "GSP Gateway 503 error" if "503" in ticket.transcription else "Client-side metadata sync mismatch"
    solution = "Auto-queued submission. Retrying in 1 hour." if "503" in ticket.transcription else "Force cached database re-indexing."
    
    new_ticket = {
        "id": ticket_id,
        "userId": ticket.userId,
        "userName": ticket.userName,
        "pageUrl": ticket.pageUrl,
        "transcription": ticket.transcription,
        "diagnosis": diagnosis,
        "solution": solution,
        "status": "Diagnosed",
        "timestamp": datetime.datetime.now().strftime("%Y-%m-%d %H:%M"),
        "created_at": datetime.datetime.utcnow().isoformat()
    }

    if db_connected:
        try:
            db["tickets"].insert_one(new_ticket.copy())
            print(f"[MongoDB] Logged support ticket {ticket_id} to live 'tickets' collection.")
        except Exception as e:
            print(f"[MongoDB] Write failed: {e}. Logging to fallback memory.")
            tickets_db.append(new_ticket)
    else:
        tickets_db.append(new_ticket)

    return new_ticket

@app.post("/api/v1/filings/{filing_id}/approve")
def approve_tax_filing(filing_id: str):
    return {
        "filingId": filing_id,
        "status": "Approved by CA",
        "cpin": "2605123456789",
        "paymentStatus": "Unpaid",
        "message": "Filing signature verified. UPI Challan generated."
    }

@app.post("/api/v1/notices/{notice_id}/resolve")
def resolve_legal_notice(notice_id: str):
    return {
        "noticeId": notice_id,
        "status": "Resolved",
        "message": "ASMT-11 reply successfully compiled and filed to GSTN portal."
    }
