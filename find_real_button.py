from PIL import Image
import os

img_path = "C:/Users/APJ Sir/.gemini/antigravity/brain/0e49b380-35c3-4079-8b53-2b9c93f82243/current_screen.png"
if os.path.exists(img_path):
    img = Image.open(img_path)
    # Scan X from 1000 to 1350, Y from 560 to 640
    non_white_pixels = []
    for x in range(1000, 1350):
        for y in range(560, 640):
            r, g, b, *a = img.getpixel((x, y))
            # Find pixels that are not white (background is 255, 255, 255 or 240, 242, 245)
            if not (r > 240 and g > 240 and b > 240):
                non_white_pixels.append((x, y, (r, g, b)))
                
    print(f"Found {len(non_white_pixels)} non-white pixels.")
    # Find bounding boxes of regions
    clusters = []
    visited = set()
    for pt in non_white_pixels:
        p = (pt[0], pt[1])
        if p in visited:
            continue
        cluster = [pt]
        queue = [pt]
        visited.add(p)
        while queue:
            curr = queue.pop(0)
            for other in non_white_pixels:
                op = (other[0], other[1])
                if op not in visited:
                    if abs(other[0] - curr[0]) <= 8 and abs(other[1] - curr[1]) <= 8:
                        visited.add(op)
                        cluster.append(other)
                        queue.append(other)
        if len(cluster) > 20:
            xs = [o[0] for o in cluster]
            ys = [o[1] for o in cluster]
            print(f"Region: Box X from {min(xs)} to {max(xs)}, Y from {min(ys)} to {max(ys)} | Center=({sum(xs)//len(xs)}, {sum(ys)//len(ys)}) | Size={len(cluster)}")
else:
    print("Screenshot not found.")
