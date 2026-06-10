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
    edge_win.restore()
    edge_win.maximize()
    edge_win.activate()
    time.sleep(1)
    
    # Let's try physical coordinate (560, 45) first.
    # We will move the mouse to X=560, Y=45, wait 1 second, and click.
    print("Moving mouse to (560, 45)...")
    pyautogui.moveTo(560, 45)
    time.sleep(1)
    pyautogui.click()
    time.sleep(2)
    
    screenshot = pyautogui.screenshot()
    screenshot.save("C:/Users/APJ Sir/.gemini/antigravity/brain/0e49b380-35c3-4079-8b53-2b9c93f82243/current_screen.png")
    print("Screenshot saved to current_screen.png.")
else:
    print("Edge window not found.")
