import pyautogui
import time
import pygetwindow as gw

VERIFY_SAVE_COORD = (1002, 702)

print("Searching for Edge window...")
edge_win = None
for w in gw.getAllWindows():
    if "Edge" in w.title:
        edge_win = w
        break

if edge_win:
    safe_title = edge_win.title.encode("ascii", errors="replace").decode("ascii")
    print(f"Found Edge window: {safe_title} (ID: {edge_win._hWnd})")
    edge_win.restore()
    edge_win.maximize()
    edge_win.activate()
    time.sleep(1)
    
    # Click the Verify and Save button
    print(f"Clicking Verify and Save at {VERIFY_SAVE_COORD}...")
    pyautogui.click(VERIFY_SAVE_COORD[0], VERIFY_SAVE_COORD[1])
    time.sleep(6) # Wait for handshake verification
    
    screenshot = pyautogui.screenshot()
    screenshot.save("C:/Users/APJ Sir/.gemini/antigravity/brain/0e49b380-35c3-4079-8b53-2b9c93f82243/current_screen.png")
    print("Screenshot saved to current_screen.png.")
else:
    print("Edge window not found.")
