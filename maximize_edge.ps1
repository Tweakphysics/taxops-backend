Add-Type @"
using System;
using System.Runtime.InteropServices;
public class User32 {
    [DllImport("user32.dll")]
    public static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);
    
    [DllImport("user32.dll")]
    [return: MarshalAs(UnmanagedType.Bool)]
    public static extern bool SetForegroundWindow(IntPtr hWnd);
}
"@

$process = Get-Process -Name msedge | Where-Object { $_.MainWindowTitle -like "*WhatsApp Business*" }
if ($process) {
    $hwnd = $process[0].MainWindowHandle
    [User32]::ShowWindow($hwnd, 3) # SW_MAXIMIZE = 3
    [User32]::SetForegroundWindow($hwnd)
    Start-Sleep -Seconds 1
    Write-Host "Maximized and focused Edge window."
} else {
    Write-Host "Edge window not found."
}
