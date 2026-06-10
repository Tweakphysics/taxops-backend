from PIL import Image
import os

img_path = "C:/Users/APJ Sir/.gemini/antigravity/brain/0e49b380-35c3-4079-8b53-2b9c93f82243/current_screen.png"
if os.path.exists(img_path):
    img = Image.open(img_path)
    w, h = img.size
    
    # Scan X from 700 to 1300, Y from 580 to 750
    # Find any pixel that is a button color:
    # 1. Blue button: R ~ 24, G ~ 119, B ~ 242 (or disabled blue: R~170, G~210, B~255)
    # 2. Gray button: R ~ 228, G ~ 230, B ~ 235 (#E4E6EB)
    button_pixels = []
    for x in range(700, 1300):
        for y in range(580, 750):
            r, g, b, *a = img.getpixel((x, y))
            # Let's filter for:
            # Blue-like: B > 200 and R < 150
            # Gray-button-like: R == 228 and G == 230 and B == 235 (allow +- 5)
            is_blue = (b > 180 and r < 150 and g > 100)
            is_gray_button = (abs(r - 228) < 8 and abs(g - 230) < 8 and abs(b - 235) < 8)
            if is_blue or is_gray_button:
                button_pixels.append((x, y, "blue" if is_blue else "gray", (r, g, b)))
                
    print(f"Found {len(button_pixels)} candidate button pixels.")
    # Group them by proximity
    clusters = []
    visited = set()
    for pt in button_pixels:
        p = (pt[0], pt[1])
        if p in visited:
            continue
        cluster = [pt]
        queue = [pt]
        visited.add(p)
        while queue:
            curr = queue.pop(0)
            for other in button_pixels:
                op = (other[0], other[1])
                if op not in visited:
                    if abs(other[0] - curr[0]) <= 10 and abs(other[1] - curr[1]) <= 10:
                        visited.add(op)
                        cluster.append(other)
                        queue.append(other)
        if len(cluster) > 20:
            xs = [o[0] for o in cluster]
            ys = [o[1] for o in cluster]
            types = [o[2] for o in cluster]
            avg_x = sum(xs) // len(xs)
            avg_y = sum(ys) // len(ys)
            dominant_type = max(set(types), key=types.count)
            print(f"Button cluster: Center=({avg_x}, {avg_y}) | Type={dominant_type} | Box: X from {min(xs)} to {max(xs)}, Y from {min(ys)} to {max(ys)} | Size={len(cluster)}")
else:
    print("Screenshot not found.")
