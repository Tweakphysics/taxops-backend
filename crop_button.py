from PIL import Image
import os

img_path = "C:/Users/APJ Sir/.gemini/antigravity/brain/0e49b380-35c3-4079-8b53-2b9c93f82243/current_screen.png"
if os.path.exists(img_path):
    img = Image.open(img_path)
    # Crop around (1299, 484)
    crop = img.crop((1299 - 150, 484 - 50, 1299 + 150, 484 + 50))
    crop.save("C:/Users/APJ Sir/.gemini/antigravity/brain/0e49b380-35c3-4079-8b53-2b9c93f82243/crop_button.png")
    print("Crop button saved.")
else:
    print("Screenshot not found.")
