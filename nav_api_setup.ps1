Add-Type @"
using System;
using System.Runtime.InteropServices;
public class User32 {
    [DllImport("user32.dll")]
    [return: MarshalAs(UnmanagedType.Bool)]
    public static extern bool SetForegroundWindow(IntPtr hWnd);
    
    [DllImport("user32.dll")]
    public static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);
}
"@

$process = Get-Process -Name msedge | Where-Object { $_.MainWindowTitle -like "*Meta for Developers*" }
if ($process) {
    $hwnd = $process[0].MainWindowHandle
    [User32]::ShowWindow($hwnd, 9)
    [User32]::SetForegroundWindow($hwnd)
    Start-Sleep -Seconds 1
    
    Add-Type -AssemblyName System.Windows.Forms
    
    # 1. Focus address bar
    Write-Host "Sending Ctrl+L to focus address bar..."
    [System.Windows.Forms.SendKeys]::SendWait("^l")
    Start-Sleep -Milliseconds 500
    
    # 2. Paste dev console URL
    $url = "https://developers.facebook.com/apps/2054162575213125/use_cases/customize/wa-dev-console/?use_case_enum=WHATSAPP_BUSINESS_MESSAGING"
    Write-Host "Pasting URL..."
    [System.Windows.Forms.SendKeys]::SendWait($url)
    Start-Sleep -Milliseconds 500
    
    # 3. Press Enter
    Write-Host "Pressing Enter..."
    [System.Windows.Forms.SendKeys]::SendWait("{ENTER}")
    Start-Sleep -Seconds 6
    
    # 4. Capture screen
    Add-Type -AssemblyName System.Drawing
    $Screen = [System.Windows.Forms.Screen]::PrimaryScreen
    $Bounds = $Screen.Bounds
    $Bitmap = New-Object System.Drawing.Bitmap $Bounds.Width, $Bounds.Height
    $Graphics = [System.Drawing.Graphics]::FromImage($Bitmap)
    $Graphics.CopyFromScreen($Bounds.X, $Bounds.Y, 0, 0, $Bounds.Size)
    $Bitmap.Save("C:\Users\APJ Sir\.gemini\antigravity\brain\0e49b380-35c3-4079-8b53-2b9c93f82243\current_screen.png", [System.Drawing.Imaging.ImageFormat]::Png)
    $Graphics.Dispose()
    $Bitmap.Dispose()
    Write-Host "Saved dev console screenshot successfully."
} else {
    Write-Host "Edge window not found."
}
