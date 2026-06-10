import pymongo
import os
from dotenv import load_dotenv

load_dotenv("d:/antigravity_projects/backend/.env")
mongo_uri = os.getenv("MONGO_URI")
client = pymongo.MongoClient(mongo_uri)
db = client["taxops"]

print("--- Clients in MongoDB ---")
for c in db["clients"].find():
    print(f"ID: {c.get('id')} | Mobile: {c.get('mobile')} | State: {c.get('conversation_state')} | Lang: {c.get('language')}")
