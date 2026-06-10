import pyautogui
import time
import pygetwindow as gw

# Logical Coordinates
CALLBACK_URL_COORD = (387, 317)
VERIFY_TOKEN_COORD = (387, 370)
VERIFY_SAVE_COORD = (569, 401)

# URLs
CONFIG_URL = "https://developers.facebook.com/apps/2054162575213125/use_cases/customize/wa-settings/?product_route=whatsapp-business&business_id=1971075423538575"
TUNNEL_URL = "https://2c5d82f66f564b.lhr.life/api/v1/whatsapp/webhook"
VERIFY_TOKEN = "taxops_secure_webhook_token_2026"

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
    
    # 1. Navigate to Config URL
    print(f"Navigating to: {CONFIG_URL}")
    pyautogui.hotkey('ctrl', 'l')
    time.sleep(0.5)
    pyautogui.write(CONFIG_URL, interval=0.005)
    time.sleep(0.5)
    pyautogui.press('enter')
    
    print("Waiting 12 seconds for page to load...")
    time.sleep(12)
    
    # 2. Click Callback URL field
    print(f"Clicking Callback URL field at {CALLBACK_URL_COORD}...")
    pyautogui.click(CALLBACK_URL_COORD[0], CALLBACK_URL_COORD[1])
    time.sleep(0.5)
    pyautogui.hotkey('ctrl', 'a')
    time.sleep(0.2)
    pyautogui.press('backspace')
    time.sleep(0.2)
    pyautogui.write(TUNNEL_URL, interval=0.005)
    time.sleep(0.5)
    
    # 3. Click Verify Token field
    print(f"Clicking Verify Token field at {VERIFY_TOKEN_COORD}...")
    pyautogui.click(VERIFY_TOKEN_COORD[0], VERIFY_TOKEN_COORD[1])
    time.sleep(0.5)
    pyautogui.hotkey('ctrl', 'a')
    time.sleep(0.2)
    pyautogui.press('backspace')
    time.sleep(0.2)
    pyautogui.write(VERIFY_TOKEN, interval=0.005)
    time.sleep(0.5)
    
    # 4. Click Verify and Save
    print(f"Clicking Verify and Save at {VERIFY_SAVE_COORD}...")
    pyautogui.click(VERIFY_SAVE_COORD[0], VERIFY_SAVE_COORD[1])
    time.sleep(6) # Wait for Meta validation handshake
    
    # 5. Capture final screenshot
    screenshot = pyautogui.screenshot()
    screenshot.save("C:/Users/APJ Sir/.gemini/antigravity/brain/0e49b380-35c3-4079-8b53-2b9c93f82243/current_screen.png")
    print("Screenshot saved to current_screen.png.")
else:
    print("Edge window not found.")
