Add-Type @"
using System;
using System.Runtime.InteropServices;
public class User32 {
    [DllImport("user32.dll")]
    [return: MarshalAs(UnmanagedType.Bool)]
    public static extern bool SetForegroundWindow(IntPtr hWnd);
    
    [DllImport("user32.dll")]
    public static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);
    
    [DllImport("user32.dll")]
    public static extern void mouse_event(int dwFlags, int dx, int dy, int cButtons, int dwExtraInfo);
}
"@

$process = Get-Process -Name msedge | Where-Object { $_.MainWindowTitle -like "*Meta for Developers*" }
if ($process) {
    $hwnd = $process[0].MainWindowHandle
    [User32]::ShowWindow($hwnd, 9)
    [User32]::SetForegroundWindow($hwnd)
    Start-Sleep -Seconds 1
    
    # Target coordinates (average click location)
    $x = 833
    $y = 596
    
    Add-Type -AssemblyName System.Windows.Forms
    [System.Windows.Forms.Cursor]::Position = New-Object System.Drawing.Point($x, $y)
    Start-Sleep -Milliseconds 300
    
    # Click 1
    Write-Host "Clicking at X=$x, Y=$y first time..."
    [User32]::mouse_event(0x02, 0, 0, 0, 0)
    Start-Sleep -Milliseconds 100
    [User32]::mouse_event(0x04, 0, 0, 0, 0)
    Start-Sleep -Milliseconds 500
    
    # Click 2
    Write-Host "Clicking second time..."
    [User32]::mouse_event(0x02, 0, 0, 0, 0)
    Start-Sleep -Milliseconds 100
    [User32]::mouse_event(0x04, 0, 0, 0, 0)
    
    Start-Sleep -Seconds 5
    
    # Capture new screen
    Add-Type -AssemblyName System.Drawing
    $Screen = [System.Windows.Forms.Screen]::PrimaryScreen
    $Bounds = $Screen.Bounds
    $Bitmap = New-Object System.Drawing.Bitmap $Bounds.Width, $Bounds.Height
    $Graphics = [System.Drawing.Graphics]::FromImage($Bitmap)
    $Graphics.CopyFromScreen($Bounds.X, $Bounds.Y, 0, 0, $Bounds.Size)
    $Bitmap.Save("C:\Users\APJ Sir\.gemini\antigravity\brain\0e49b380-35c3-4079-8b53-2b9c93f82243\current_screen.png", [System.Drawing.Imaging.ImageFormat]::Png)
    $Graphics.Dispose()
    $Bitmap.Dispose()
    Write-Host "Saved updated screenshot to current_screen.png."
} else {
    Write-Host "Edge window not found."
}
