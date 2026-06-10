from PIL import Image
import os

img_path = "C:/Users/APJ Sir/.gemini/antigravity/brain/0e49b380-35c3-4079-8b53-2b9c93f82243/current_screen.png"
if os.path.exists(img_path):
    img = Image.open(img_path)
    # Scan Y=590, from X=700 to 1300
    row_pixels = []
    for x in range(700, 1300):
        r, g, b, *a = img.getpixel((x, 590))
        # Look for the blue "Verify and save" button or gray button background
        # Let's print the pixel color if it is not white (i.e. not R=255, G=255, B=255) and not gray background (R=240, G=242, B=245)
        if not (r > 240 and g > 240 and b > 240):
            row_pixels.append((x, (r, g, b)))
            
    print(f"Non-white pixels on Y=590: {len(row_pixels)}")
    # Print contiguous non-white regions
    if row_pixels:
        start_x = row_pixels[0][0]
        prev_x = start_x
        for i in range(1, len(row_pixels)):
            curr_x = row_pixels[i][0]
            if curr_x - prev_x > 5:
                print(f"Region from X={start_x} to X={prev_x} | Example color: {row_pixels[i-1][1]}")
                start_x = curr_x
            prev_x = curr_x
        print(f"Region from X={start_x} to X={prev_x} | Example color: {row_pixels[-1][1]}")
else:
    print("Screenshot not found.")
