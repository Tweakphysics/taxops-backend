import urllib.request
import json

from dotenv import load_dotenv
import os

load_dotenv('backend/.env')
token = os.getenv('WHATSAPP_ACCESS_TOKEN')

url = "https://graph.facebook.com/v25.0/1114713575060715/messages"
headers = {
    "Authorization": f"Bearer {token}",
    "Content-Type": "application/json"
}
payload = {
    "messaging_product": "whatsapp",
    "to": "917668430117",
    "type": "template",
    "template": {
        "name": "hello_world",
        "language": {
            "code": "en_US"
        }
    }
}

req = urllib.request.Request(
    url,
    data=json.dumps(payload).encode("utf-8"),
    headers=headers,
    method="POST"
)

try:
    response = urllib.request.urlopen(req)
    print("SUCCESS:")
    print(response.read().decode("utf-8"))
except Exception as e:
    print("ERROR:")
    if hasattr(e, 'read'):
        print(e.read().decode("utf-8"))
    else:
        print(e)
