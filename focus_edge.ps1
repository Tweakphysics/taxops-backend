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
    [User32]::ShowWindow($hwnd, 9) # Restore/Activate
    [User32]::SetForegroundWindow($hwnd)
    Start-Sleep -Milliseconds 500
    Write-Host "Activated Edge window with handle $hwnd"
} else {
    Write-Host "Edge window not found."
}
