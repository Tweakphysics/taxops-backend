Add-Type -AssemblyName System.Drawing
$bmp = New-Object System.Drawing.Bitmap("C:\Users\APJ Sir\.gemini\antigravity\brain\0e49b380-35c3-4079-8b53-2b9c93f82243\current_screen.png")

$matchingPixels = New-Object System.Collections.Generic.List[System.Drawing.Point]

for ($x = 0; $x -lt $bmp.Width; $x += 2) {
    for ($y = 0; $y -lt $bmp.Height; $y += 2) {
        $pixel = $bmp.GetPixel($x, $y)
        # Scan for blue color: B > 200, R < 100, G is moderate
        if ($pixel.B -gt 200 -and $pixel.R -lt 80 -and $pixel.G -gt 50 -and $pixel.G -lt 180) {
            $matchingPixels.Add((New-Object System.Drawing.Point($x, $y)))
        }
    }
}

$bmp.Dispose()

if ($matchingPixels.Count -gt 0) {
    Write-Host "Found $($matchingPixels.Count) matching blue pixels."
    
    # Group them to find the largest cluster if there are multiple.
    # But usually, standard averaging works if there's only one major blue button on screen.
    # Let's print out some stats.
    $sumX = 0
    $sumY = 0
    foreach ($p in $matchingPixels) {
        $sumX += $p.X
        $sumY += $p.Y
    }
    $avgX = [int]($sumX / $matchingPixels.Count)
    $avgY = [int]($sumY / $matchingPixels.Count)
    Write-Host "Average location: X=$avgX, Y=$avgY"
    
    # Print the coordinates of some bounding boxes to see where clusters are
    $minX = 9999; $maxX = 0; $minY = 9999; $maxY = 0
    foreach ($p in $matchingPixels) {
        if ($p.X -lt $minX) { $minX = $p.X }
        if ($p.X -gt $maxX) { $maxX = $p.X }
        if ($p.Y -lt $minY) { $minY = $p.Y }
        if ($p.Y -gt $maxY) { $maxY = $p.Y }
    }
    Write-Host "Bounding box: X from $minX to $maxX, Y from $minY to $maxY"
} else {
    Write-Host "No matching pixels found."
}
