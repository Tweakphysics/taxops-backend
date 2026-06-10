import pyautogui
import time
import pygetwindow as gw

# Coordinates from screen analysis (using physical screen resolution 1920x1080)
CALLBACK_URL_COORD = (853, 377)
VERIFY_TOKEN_COORD = (853, 429)
VERIFY_SAVE_COORD = (1299, 484)
TUNNEL_URL = "https://12954b2d8274a9.lhr.life/api/v1/whatsapp/webhook"
VERIFY_TOKEN = "taxops_secure_webhook_token_2026"

print("Starting Webhook update sequence...")
windows = gw.getWindowsWithTitle("Meta for Developers")
if not windows:
    print("Edge window with 'Meta for Developers' not found.")
    exit(1)

win = windows[0]
safe_title = win.title.encode("ascii", errors="replace").decode("ascii")
print(f"Found window: {safe_title}")

# Restore and maximize
win.restore()
win.maximize()
win.activate()
time.sleep(1.5)

# Click Callback URL field
print(f"Clicking Callback URL field at {CALLBACK_URL_COORD}...")
pyautogui.click(CALLBACK_URL_COORD[0], CALLBACK_URL_COORD[1])
time.sleep(0.5)

# Clear existing text using Ctrl+A and Backspace
pyautogui.hotkey('ctrl', 'a')
time.sleep(0.2)
pyautogui.press('backspace')
time.sleep(0.2)

# Type the new Callback URL
print(f"Typing Callback URL: {TUNNEL_URL}")
pyautogui.write(TUNNEL_URL, interval=0.01)
time.sleep(0.5)

# Click Verify Token field
print(f"Clicking Verify Token field at {VERIFY_TOKEN_COORD}...")
pyautogui.click(VERIFY_TOKEN_COORD[0], VERIFY_TOKEN_COORD[1])
time.sleep(0.5)

# Clear existing text
pyautogui.hotkey('ctrl', 'a')
time.sleep(0.2)
pyautogui.press('backspace')
time.sleep(0.2)

# Type the verify token
print("Typing Verify Token...")
pyautogui.write(VERIFY_TOKEN, interval=0.01)
time.sleep(0.5)

# Click 'Verify and save' button
print(f"Clicking Verify and Save button at {VERIFY_SAVE_COORD}...")
pyautogui.click(VERIFY_SAVE_COORD[0], VERIFY_SAVE_COORD[1])

# Wait for handshake verification to complete (which makes requests to our backend)
print("Waiting 6 seconds for verification to complete...")
time.sleep(6)

# Save the final screen to verify the outcome
screenshot = pyautogui.screenshot()
screenshot_path = "C:/Users/APJ Sir/.gemini/antigravity/brain/0e49b380-35c3-4079-8b53-2b9c93f82243/current_screen.png"
screenshot.save(screenshot_path)
print(f"Screenshot saved to {screenshot_path}.")
