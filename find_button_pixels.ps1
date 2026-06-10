Add-Type -AssemblyName System.Drawing
$bmp = New-Object System.Drawing.Bitmap("C:\Users\APJ Sir\.gemini\antigravity\brain\0e49b380-35c3-4079-8b53-2b9c93f82243\current_screen.png")

$w = $bmp.Width
$h = $bmp.Height

Write-Host "Scanning specific button region X:600-950, Y:480-680..."
$count = 0
$sumX = 0
$sumY = 0
$minX = 9999; $maxX = 0; $minY = 9999; $maxY = 0

for ($y = 480; $y -lt 680; $y += 2) {
    for ($x = 600; $x -lt 950; $x += 2) {
        $pixel = $bmp.GetPixel($x, $y)
        # Check for blue button pixels: B > 200, R < 100, G between 80 and 160
        if ($pixel.B -gt 200 -and $pixel.R -lt 100 -and $pixel.G -gt 80 -and $pixel.G -lt 160) {
            $count++
            $sumX += $x
            $sumY += $y
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}
$bmp.Dispose()

if ($count -gt 0) {
    $avgX = [int]($sumX / $count)
    $avgY = [int]($sumY / $count)
    Write-Host "Found $count blue pixels."
    Write-Host "Bounding Box: X from $minX to $maxX, Y from $minY to $maxY"
    Write-Host "Average Click Location: X=$avgX, Y=$avgY"
} else {
    Write-Host "No blue pixels found in target region."
}
