import urllib.request
import json
import pymongo
import os
from dotenv import load_dotenv

url = "http://127.0.0.1:8000/api/v1/whatsapp/webhook"
payload = {
  "object": "whatsapp_business_account",
  "entry": [
    {
      "id": "1971075423538575",
      "changes": [
        {
          "value": {
            "messaging_product": "whatsapp",
            "metadata": {
              "display_phone_number": "15556581553",
              "phone_number_id": "1114713575060715"
            },
            "contacts": [
              {
                "profile": {
                  "name": "Rohan Tech"
                },
                "wa_id": "917668430117"
              }
            ],
            "messages": [
              {
                "from": "917668430117",
                "id": "wamid.HBgMOTE3NjY4NDMwMTE3FQIAERgSMTZEQTMxRTcyM0EzQ0I0M0NDAA==",
                "timestamp": "1781084226",
                "text": {
                  "body": "GST no. 27BDYPP3251L1ZR"
                },
                "type": "text"
              }
            ]
          },
          "field": "messages"
        }
      ]
    }
  ]
}

print("1. Sending mock webhook payload for GSTIN submission...")
req = urllib.request.Request(
    url,
    data=json.dumps(payload).encode("utf-8"),
    headers={"Content-Type": "application/json"},
    method="POST"
)

try:
    response = urllib.request.urlopen(req)
    print("Webhook response code:", response.getcode())
    print("Response payload:", response.read().decode("utf-8"))
except Exception as e:
    print("Error during request:")
    if hasattr(e, "read"):
        print(e.read().decode("utf-8"))
    else:
        print(e)

print("\n2. Checking client state in MongoDB...")
load_dotenv("backend/.env")
client = pymongo.MongoClient(os.getenv("MONGO_URI"))
db = client["taxops"]
c_doc = db["clients"].find_one({"id": "cli_rohan_tech"})
if c_doc:
    print(f"Client ID: {c_doc.get('id')}")
    print(f"Legal Name: {c_doc.get('legalName')}")
    print(f"Conversation State: {c_doc.get('conversation_state')}")
    print(f"Language: {c_doc.get('language')}")
else:
    print("No client document found for cli_rohan_tech")
