import pyautogui
import time
import pygetwindow as gw

print("Focusing Edge window...")
windows = gw.getWindowsWithTitle("Developers")
if not windows:
    print("Edge window not found.")
    exit(1)

win = windows[0]
safe_title = win.title.encode("ascii", errors="replace").decode("ascii")
print(f"Found window: {safe_title}")

win.restore()
win.maximize()
win.activate()
time.sleep(1)

# Close active tab
print("Sending Ctrl+W to close active tab...")
pyautogui.hotkey('ctrl', 'w')
time.sleep(2)

# Take screenshot
screenshot = pyautogui.screenshot()
screenshot.save("C:/Users/APJ Sir/.gemini/antigravity/brain/0e49b380-35c3-4079-8b53-2b9c93f82243/current_screen.png")
print("Screenshot saved to current_screen.png.")
