// Production API Connector Utility for TaxOps AI Platform
// Connects to local FastAPI backend or deployed Render/Railway service

const API_BASE_URL = "http://localhost:8000/api/v1";

export const api = {
  // 1. Template Engine
  getTemplateConfig: async (key) => {
    try {
      const response = await fetch(`${API_BASE_URL}/templates/${key}`);
      if (!response.ok) throw new Error("Failed to load business template.");
      return await response.json();
    } catch (error) {
      console.warn("API Error (getTemplateConfig): Falling back to offline client models.", error);
      return null;
    }
  },

  // 2. OCR Ingestion
  parseInvoiceOCR: async (fileBlob, clientId) => {
    try {
      const formData = new FormData();
      formData.append("file", fileBlob);
      formData.append("client_id", clientId);

      const response = await fetch(`${API_BASE_URL}/ocr/parse`, {
        method: "POST",
        body: formData
      });
      if (!response.ok) throw new Error("OCR Server failed to process invoice.");
      return await response.json();
    } catch (error) {
      console.warn("API Error (parseInvoiceOCR): Falling back to offline client models.", error);
      return null;
    }
  },

  // 3. CA Return Filings Approvals
  approveFiling: async (filingId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/filings/${filingId}/approve`, {
        method: "POST"
      });
      if (!response.ok) throw new Error("Filing approval submission failed.");
      return await response.json();
    } catch (error) {
      console.warn("API Error (approveFiling): Falling back to offline client models.", error);
      return null;
    }
  },

  // 4. Notice Scrutiny Reply Submissions
  resolveNotice: async (noticeId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/notices/${noticeId}/resolve`, {
        method: "POST"
      });
      if (!response.ok) throw new Error("Notice resolution submission failed.");
      return await response.json();
    } catch (error) {
      console.warn("API Error (resolveNotice): Falling back to offline client models.", error);
      return null;
    }
  },

  // 5. Help Desk Diagnostics
  logDiagnosticTicket: async (userId, userName, pageUrl, transcription) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tickets`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, userName, pageUrl, transcription })
      });
      if (!response.ok) throw new Error("Failed to log diagnostic ticket.");
      return await response.json();
    } catch (error) {
      console.warn("API Error (logDiagnosticTicket): Falling back to offline client models.", error);
      return null;
    }
  }
};
