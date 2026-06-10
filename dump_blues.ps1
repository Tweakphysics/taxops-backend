Add-Type -AssemblyName System.Drawing
$bmp = New-Object System.Drawing.Bitmap("C:\Users\APJ Sir\.gemini\antigravity\brain\0e49b380-35c3-4079-8b53-2b9c93f82243\current_screen.png")

$w = $bmp.Width
$h = $bmp.Height

Write-Host "Scanning pixels in current_screen.png with B > 180..."

for ($y = 0; $y -lt $h; $y += 8) {
    for ($x = 0; $x -lt $w; $x += 8) {
        $pixel = $bmp.GetPixel($x, $y)
        if ($pixel.B -gt 200 -and $pixel.R -lt 150) {
            Write-Host "Pixel at X=$x, Y=$y | R=$($pixel.R), G=$($pixel.G), B=$($pixel.B)"
        }
    }
}

$bmp.Dispose()
