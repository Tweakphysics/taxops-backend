import pymongo
import os
from dotenv import load_dotenv

load_dotenv("d:/antigravity_projects/backend/.env")
mongo_uri = os.getenv("MONGO_URI")
client = pymongo.MongoClient(mongo_uri)
db = client["taxops"]

# Delete the duplicate document that has Mobile '917668430117'
res = db["clients"].delete_one({"id": "cli_rohan_tech", "mobile": "917668430117"})
print(f"Deleted duplicate documents: {res.deleted_count}")

# Reset the seed client (cli_rohan_tech) to SELECT_LANGUAGE state to allow testing from scratch
res_reset = db["clients"].update_one(
    {"id": "cli_rohan_tech"},
    {"$set": {"conversation_state": "SELECT_LANGUAGE", "language": "en", "mobile": "917668430117"}}
)
print(f"Reset seed client: {res_reset.matched_count} matched, {res_reset.modified_count} modified")
