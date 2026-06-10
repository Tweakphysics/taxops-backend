from PIL import Image
import os

img_path = "C:/Users/APJ Sir/.gemini/antigravity/brain/0e49b380-35c3-4079-8b53-2b9c93f82243/current_screen.png"
if os.path.exists(img_path):
    img = Image.open(img_path)
    w, h = img.size
    
    # We look for a blue color typical of Meta's "Verify and save" button
    # Usually blue buttons have high blue value, low red value, moderate green.
    # Standard Facebook blue is roughly: R ~ 24, G ~ 119, B ~ 242 (Hex #1877F2)
    # Let's search for pixels matching: B > 200, R < 100, 80 < G < 180
    matching_pixels = []
    for x in range(0, w, 2):
        for y in range(0, h, 2):
            r, g, b, *a = img.getpixel((x, y))
            if b > 200 and r < 100 and 80 < g < 180:
                matching_pixels.append((x, y))
                
    print(f"Found {len(matching_pixels)} matching pixels.")
    
    # Simple cluster grouping
    clusters = []
    visited = set()
    for p in matching_pixels:
        if p in visited:
            continue
        # BFS/DFS to find cluster
        cluster = []
        queue = [p]
        visited.add(p)
        while queue:
            curr = queue.pop(0)
            cluster.append(curr)
            # Find neighbors in matching_pixels within distance of 10
            for neighbor in matching_pixels:
                if neighbor not in visited:
                    if abs(neighbor[0] - curr[0]) <= 8 and abs(neighbor[1] - curr[1]) <= 8:
                        visited.add(neighbor)
                        queue.append(neighbor)
        if len(cluster) > 30: # Only significant clusters
            xs = [pt[0] for pt in cluster]
            ys = [pt[1] for pt in cluster]
            avg_x = sum(xs) // len(xs)
            avg_y = sum(ys) // len(ys)
            min_x, max_x = min(xs), max(xs)
            min_y, max_y = min(ys), max(ys)
            print(f"Cluster at Center: ({avg_x}, {avg_y}), Bounding Box: X from {min_x} to {max_x}, Y from {min_y} to {max_y}, Area: {len(cluster)}")
            clusters.append((avg_x, avg_y))
else:
    print("Screenshot not found.")
