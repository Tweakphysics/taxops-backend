import pyautogui
import time
import pygetwindow as gw

CONFIG_URL = "https://developers.facebook.com/apps/2054162575213125/use_cases/customize/wa-settings/?product_route=whatsapp-business&business_id=1971075423538575"

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
    
    print(f"Navigating to settings: {CONFIG_URL}")
    pyautogui.hotkey('ctrl', 'l')
    time.sleep(0.5)
    pyautogui.write(CONFIG_URL, interval=0.005)
    time.sleep(0.5)
    pyautogui.press('enter')
    
    print("Waiting 10 seconds for page to load...")
    time.sleep(10)
    
    screenshot = pyautogui.screenshot()
    screenshot.save("C:/Users/APJ Sir/.gemini/antigravity/brain/0e49b380-35c3-4079-8b53-2b9c93f82243/current_screen.png")
    print("Screenshot saved to current_screen.png.")
else:
    print("Edge window not found.")
