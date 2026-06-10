import pyautogui
import time
import pygetwindow as gw

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
    
    print("Closing active tab...")
    pyautogui.hotkey('ctrl', 'w')
    time.sleep(2)
    
    screenshot = pyautogui.screenshot()
    screenshot.save("C:/Users/APJ Sir/.gemini/antigravity/brain/0e49b380-35c3-4079-8b53-2b9c93f82243/current_screen.png")
    print("Screenshot saved to current_screen.png.")
else:
    print("Edge window not found.")
