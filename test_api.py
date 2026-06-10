import urllib.request
import json
import os
import urllib.error
from dotenv import load_dotenv

load_dotenv('backend/.env')
key = os.getenv('ANTHROPIC_API_KEY')

payload = {
    'model': 'claude-sonnet-4-6',
    'max_tokens': 100,
    'messages': [{'role': 'user', 'content': 'Hello'}]
}

req = urllib.request.Request(
    'https://api.anthropic.com/v1/messages',
    data=json.dumps(payload).encode('utf-8'),
    headers={
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json'
    },
    method='POST'
)

try:
    response = urllib.request.urlopen(req)
    print("SUCCESS:")
    print(response.read().decode('utf-8'))
except urllib.error.HTTPError as e:
    print('HTTP ERROR:', e.code)
    try:
        print(e.read().decode('utf-8'))
    except Exception as read_err:
        print("Failed to read error body:", read_err)
except Exception as e:
    print("General exception:", e)
