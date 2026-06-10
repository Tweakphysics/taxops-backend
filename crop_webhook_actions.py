from PIL import Image
import os

img_path = "C:/Users/APJ Sir/.gemini/antigravity/brain/0e49b380-35c3-4079-8b53-2b9c93f82243/current_screen.png"
if os.path.exists(img_path):
    img = Image.open(img_path)
    # Crop X from 600 to 1100, Y from 540 to 640
    crop = img.crop((600, 540, 1100, 640))
    crop.save("C:/Users/APJ Sir/.gemini/antigravity/brain/0e49b380-35c3-4079-8b53-2b9c93f82243/crop_webhook_actions.png")
    print("Crop saved successfully.")
else:
    print("Screenshot not found.")
