Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

$signature = '[DllImport("user32.dll")] public static extern bool SetForegroundWindow(IntPtr hWnd);'
$type = Add-Type -MemberDefinition $signature -Name Win32Utils -Namespace Win32 -PassThru

$chrome = Get-Process chrome | Where-Object { $_.MainWindowHandle -ne 0 } | Select-Object -First 1
if ($chrome) {
    # 1. Activate Chrome
    [Win32.Win32Utils]::SetForegroundWindow($chrome.MainWindowHandle)
    Start-Sleep -Milliseconds 500

    # 2. Focus Repository Name input field via Find
    [System.Windows.Forms.SendKeys]::SendWait("^f")
    Start-Sleep -Milliseconds 300
    [System.Windows.Forms.SendKeys]::SendWait("Repository name")
    Start-Sleep -Milliseconds 500
    [System.Windows.Forms.SendKeys]::SendWait("{ESC}")
    Start-Sleep -Milliseconds 300
    [System.Windows.Forms.SendKeys]::SendWait("{TAB}") # TAB into the input field
    Start-Sleep -Milliseconds 300
    [System.Windows.Forms.SendKeys]::SendWait("taxops-backend")
    Start-Sleep -Milliseconds 1000 # Wait for name availability check

    # 3. Focus and select "Private" visibility
    [System.Windows.Forms.SendKeys]::SendWait("^f")
    Start-Sleep -Milliseconds 300
    [System.Windows.Forms.SendKeys]::SendWait("Private")
    Start-Sleep -Milliseconds 500
    [System.Windows.Forms.SendKeys]::SendWait("{ESC}")
    Start-Sleep -Milliseconds 300
    [System.Windows.Forms.SendKeys]::SendWait(" ") # Space bar to select the radio button
    Start-Sleep -Milliseconds 500

    # 4. Focus and click "Create repository" button
    [System.Windows.Forms.SendKeys]::SendWait("^f")
    Start-Sleep -Milliseconds 300
    [System.Windows.Forms.SendKeys]::SendWait("Create repository")
    Start-Sleep -Milliseconds 500
    [System.Windows.Forms.SendKeys]::SendWait("{ESC}")
    Start-Sleep -Milliseconds 300
    [System.Windows.Forms.SendKeys]::SendWait("{ENTER}") # Enter key to click the button
    
    Write-Output "Clicked Create Repository. Waiting 6 seconds..."
    Start-Sleep -Seconds 6

    # 5. Capture screenshot directly
    $Screen = [System.Windows.Forms.Screen]::PrimaryScreen
    $Width   = $Screen.Bounds.Width
    $Height  = $Screen.Bounds.Height
    $Bitmap  = New-Object System.Drawing.Bitmap $Width, $Height
    $Graphic = [System.Drawing.Graphics]::FromImage($Bitmap)
    $Graphic.CopyFromScreen($Screen.Bounds.X, $Screen.Bounds.Y, 0, 0, $Bitmap.Size)
    $Bitmap.Save("d:\antigravity_projects\screen.png", [System.Drawing.Imaging.ImageFormat]::Png)
    $Graphic.Dispose()
    $Bitmap.Dispose()

    Write-Output "Screenshot captured."
} else {
    Write-Output "Chrome not running"
}
