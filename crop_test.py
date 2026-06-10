from PIL import Image
import os

img_path = "C:/Users/APJ Sir/.gemini/antigravity/brain/0e49b380-35c3-4079-8b53-2b9c93f82243/current_screen.png"
if os.path.exists(img_path):
    img = Image.open(img_path)
    print("Image size:", img.size)
    
    # Crop around (853, 377)
    crop1 = img.crop((853 - 100, 377 - 50, 853 + 100, 377 + 50))
    crop1.save("C:/Users/APJ Sir/.gemini/antigravity/brain/0e49b380-35c3-4079-8b53-2b9c93f82243/crop1.png")
    print("Crop 1 saved.")
    
    # Crop around (585, 460) - our hypothesized location
    crop2 = img.crop((585 - 100, 460 - 50, 585 + 100, 460 + 50))
    crop2.save("C:/Users/APJ Sir/.gemini/antigravity/brain/0e49b380-35c3-4079-8b53-2b9c93f82243/crop2.png")
    print("Crop 2 saved.")
    
    # Crop around (585, 520) - verify token hypothesized
    crop3 = img.crop((585 - 100, 520 - 50, 585 + 100, 520 + 50))
    crop3.save("C:/Users/APJ Sir/.gemini/antigravity/brain/0e49b380-35c3-4079-8b53-2b9c93f82243/crop3.png")
    print("Crop 3 saved.")
else:
    print("Screenshot not found.")
