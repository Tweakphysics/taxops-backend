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

$process = Get-Process -Name msedge | Where-Object { $_.MainWindowTitle -like "*WhatsApp Business*" }
if ($process) {
    $hwnd = $process[0].MainWindowHandle
    [User32]::ShowWindow($hwnd, 9) # Restore/Activate
    [User32]::SetForegroundWindow($hwnd)
    Start-Sleep -Seconds 1
    
    Add-Type -AssemblyName System.Windows.Forms
    
    # Type the test message
    $message = "How can I claim laptop depreciation under Section 32?"
    Write-Host "Typing message: $message"
    [System.Windows.Forms.SendKeys]::SendWait($message)
    Start-Sleep -Milliseconds 500
    
    # Send the message by pressing ENTER
    Write-Host "Sending ENTER..."
    [System.Windows.Forms.SendKeys]::SendWait("{ENTER}")
    
    # Wait for the AI backend to process webhook and respond
    Write-Host "Waiting 8 seconds for AI reply..."
    Start-Sleep -Seconds 8
    
    # Capture the screen to verify receipt and response
    Add-Type -AssemblyName System.Drawing
    $Screen = [System.Windows.Forms.Screen]::PrimaryScreen
    $Bounds = $Screen.Bounds
    $Bitmap = New-Object System.Drawing.Bitmap $Bounds.Width, $Bounds.Height
    $Graphics = [System.Drawing.Graphics]::FromImage($Bitmap)
    $Graphics.CopyFromScreen($Bounds.X, $Bounds.Y, 0, 0, $Bounds.Size)
    $Bitmap.Save("C:\Users\APJ Sir\.gemini\antigravity\brain\0e49b380-35c3-4079-8b53-2b9c93f82243\current_screen.png", [System.Drawing.Imaging.ImageFormat]::Png)
    $Graphics.Dispose()
    $Bitmap.Dispose()
    Write-Host "Screenshot saved."
} else {
    Write-Host "Edge window showing WhatsApp Business not found."
}
