import pyautogui
import time
import pygetwindow as gw

print("Screen size:", pyautogui.size())

# Find the Microsoft Edge window
windows = gw.getWindowsWithTitle("Meta for Developers")
if windows:
    win = windows[0]
    safe_title = win.title.encode("ascii", errors="replace").decode("ascii")
    print(f"Found window: {safe_title}")
    # Restore and maximize
    win.restore()
    win.maximize()
    win.activate()
    time.sleep(1.5)
    
    # Click Configuration at (228, 530)
    print("Clicking Configuration at (228, 530)...")
    pyautogui.click(228, 530)
    time.sleep(4)
    
    # Save screenshot
    screenshot = pyautogui.screenshot()
    screenshot.save("C:/Users/APJ Sir/.gemini/antigravity/brain/0e49b380-35c3-4079-8b53-2b9c93f82243/current_screen.png")
    print("Screenshot saved to current_screen.png.")
else:
    print("Edge window with 'Meta for Developers' not found.")
