import pyautogui
import time
import pygetwindow as gw

VERIFY_SAVE_COORD = (853, 602)

print("Focusing window and clicking Verify and Save...")
windows = gw.getWindowsWithTitle("Meta for Developers")
if not windows:
    print("Edge window with 'Meta for Developers' not found.")
    exit(1)

win = windows[0]
safe_title = win.title.encode("ascii", errors="replace").decode("ascii")
print(f"Found window: {safe_title}")

win.restore()
win.maximize()
win.activate()
time.sleep(1.5)

# Click the Verify and Save button
print(f"Clicking Verify and Save at {VERIFY_SAVE_COORD}...")
pyautogui.click(VERIFY_SAVE_COORD[0], VERIFY_SAVE_COORD[1])
time.sleep(6) # Wait for handshake verification

# Capture screenshot to verify success
screenshot = pyautogui.screenshot()
screenshot.save("C:/Users/APJ Sir/.gemini/antigravity/brain/0e49b380-35c3-4079-8b53-2b9c93f82243/current_screen.png")
print("Screenshot saved to current_screen.png.")
