import pyautogui
import time
import pygetwindow as gw

CALLBACK_URL_COORD = (580, 495)
VERIFY_TOKEN_COORD = (580, 585)
VERIFY_SAVE_COORD = (890, 675) # Verify and Save button location

# Active tunnel URL
TUNNEL_URL = "https://088e35e5fd8e4a.lhr.life/api/v1/whatsapp/webhook"
VERIFY_TOKEN = "taxops_secure_webhook_token_2026"

print("Starting final Webhook update...")
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

# Click Callback URL field
print(f"Clicking Callback URL field at {CALLBACK_URL_COORD}...")
pyautogui.click(CALLBACK_URL_COORD[0], CALLBACK_URL_COORD[1])
time.sleep(0.5)
pyautogui.hotkey('ctrl', 'a')
time.sleep(0.2)
pyautogui.press('backspace')
time.sleep(0.2)
pyautogui.write(TUNNEL_URL, interval=0.01)
time.sleep(0.5)

# Click Verify Token field
print(f"Clicking Verify Token field at {VERIFY_TOKEN_COORD}...")
pyautogui.click(VERIFY_TOKEN_COORD[0], VERIFY_TOKEN_COORD[1])
time.sleep(0.5)
pyautogui.hotkey('ctrl', 'a')
time.sleep(0.2)
pyautogui.press('backspace')
time.sleep(0.2)
pyautogui.write(VERIFY_TOKEN, interval=0.01)
time.sleep(0.5)

# Move mouse to Verify and Save area to see where it lands (without clicking yet)
print("Moving to Verify and Save...")
pyautogui.moveTo(VERIFY_SAVE_COORD[0], VERIFY_SAVE_COORD[1])
time.sleep(1)

# Take screenshot to verify mouse position
screenshot = pyautogui.screenshot()
screenshot.save("C:/Users/APJ Sir/.gemini/antigravity/brain/0e49b380-35c3-4079-8b53-2b9c93f82243/mouse_verify.png")
print("Saved hover screenshot.")
