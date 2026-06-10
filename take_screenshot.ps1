Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing
$Screen = [System.Windows.Forms.Screen]::PrimaryScreen
$Bounds = $Screen.Bounds
$Bitmap = New-Object System.Drawing.Bitmap $Bounds.Width, $Bounds.Height
$Graphics = [System.Drawing.Graphics]::FromImage($Bitmap)
$Graphics.CopyFromScreen($Bounds.X, $Bounds.Y, 0, 0, $Bounds.Size)
$Bitmap.Save("C:\Users\APJ Sir\.gemini\antigravity\brain\0e49b380-35c3-4079-8b53-2b9c93f82243\current_screen.png", [System.Drawing.Imaging.ImageFormat]::Png)
$Graphics.Dispose()
$Bitmap.Dispose()
Write-Host "Screenshot saved successfully to C:\Users\APJ Sir\.gemini\antigravity\brain\0e49b380-35c3-4079-8b53-2b9c93f82243\current_screen.png"
