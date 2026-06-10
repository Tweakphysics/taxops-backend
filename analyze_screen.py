import sys
import os
from dotenv import load_dotenv

# Load env variables from backend/.env
load_dotenv("d:/antigravity_projects/backend/.env")

# Add backend folder to path to import query_claude
sys.path.append("d:/antigravity_projects/backend")
from main import query_claude

def analyze():
    img_path = "C:/Users/APJ Sir/.gemini/antigravity/brain/0e49b380-35c3-4079-8b53-2b9c93f82243/current_screen.png"
    if not os.path.exists(img_path):
        print("Screenshot not found.")
        return
        
    with open(img_path, "rb") as f:
        img_bytes = f.read()
        
    system_prompt = (
        "You are a helpful UI automation assistant. Analyze this screenshot of Microsoft Edge showing the Meta Developer Portal Webhook configuration page.\n"
        "We need to locate the following three elements to click and type into:\n"
        "1. The 'Callback URL' text input field (currently containing 'https://842c2cca7ebf29.lhr.life/api/v1/whatsapp/webhook')\n"
        "2. The 'Verify token' text input field (currently containing dots)\n"
        "3. The blue 'Verify and save' button on the right side.\n"
        "The image resolution is exactly 1920x1080. Estimate the center (X, Y) coordinate for each of these three elements in the 1920x1080 coordinate space.\n"
        "Output the result as a JSON dictionary with keys 'callback_url', 'verify_token', and 'verify_and_save'."
    )
    
    user_msg = "Please find the coordinates in the 1920x1080 pixel space."
    
    try:
        response = query_claude(
            system_prompt=system_prompt,
            user_message=user_msg,
            image_bytes=img_bytes,
            mime_type="image/png"
        )
        print("--- Screen Analysis ---")
        # Prevent charmap encoding crash
        safe_response = response.encode('ascii', errors='replace').decode('ascii')
        print(safe_response)
    except Exception as e:
        print(f"Error during analysis: {e}")

if __name__ == "__main__":
    analyze()
