import pygetwindow as gw

for w in gw.getAllWindows():
    if w.title:
        safe_title = w.title.encode("ascii", errors="replace").decode("ascii")
        print(f"Title: {safe_title} | ID: {w._hWnd}")
