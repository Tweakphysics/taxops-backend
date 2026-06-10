from PIL import Image
import os

img_path = "C:/Users/APJ Sir/.gemini/antigravity/brain/0e49b380-35c3-4079-8b53-2b9c93f82243/current_screen.png"
if os.path.exists(img_path):
    img = Image.open(img_path)
    # Crop X from 700 to 1300, Y from 580 to 720
    crop = img.crop((700, 580, 1300, 720))
    crop.save("C:/Users/APJ Sir/.gemini/antigravity/brain/0e49b380-35c3-4079-8b53-2b9c93f82243/crop_buttons_full.png")
    print("Crop saved successfully.")
else:
    print("Screenshot not found.")
