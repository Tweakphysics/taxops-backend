Add-Type -AssemblyName System.Drawing
$bmp = New-Object System.Drawing.Bitmap("C:\Users\APJ Sir\.gemini\antigravity\brain\0e49b380-35c3-4079-8b53-2b9c93f82243\current_screen.png")

# Let's map pixels to 2D array
$w = $bmp.Width
$h = $bmp.Height
$grid = New-Object "int[]" ($w * $h)

# Define blue color match
for ($y = 0; $y -lt $h; $y++) {
    for ($x = 0; $x -lt $w; $x++) {
        $pixel = $bmp.GetPixel($x, $y)
        # Check for blue button color specifically:
        # R is very low, G is moderate, B is high (standard Meta blue is R=8, G=102, B=255)
        # Let's check R < 40, G between 80 and 130, B > 230
        if ($pixel.R -lt 40 -and $pixel.G -gt 80 -and $pixel.G -lt 130 -and $pixel.B -gt 230) {
            $grid[$y * $w + $x] = 1
        } else {
            $grid[$y * $w + $x] = 0
        }
    }
}
$bmp.Dispose()

# Now find connected components (clusters)
# Simple grid scanning to find continuous horizontal lines of blue, and then vertical
# Let's look for a solid block of blue of size around 60-120px wide and 25-45px high.
$clusters = New-Object System.Collections.Generic.List[PSObject]
$visited = New-Object "bool[]" ($w * $h)

for ($y = 0; $y -lt $h; $y += 2) {
    for ($x = 0; $x -lt $w; $x += 2) {
        $idx = $y * $w + $x
        if ($grid[$idx] -eq 1 -and -not $visited[$idx]) {
            # Start flood fill or simple bounding box check
            $queue = New-Object System.Collections.Generic.Queue[System.Drawing.Point]
            $queue.Enqueue((New-Object System.Drawing.Point($x, $y)))
            $visited[$idx] = $true
            
            $minX = $x; $maxX = $x; $minY = $y; $maxY = $y
            $count = 0
            
            while ($queue.Count -gt 0) {
                $p = $queue.Dequeue()
                $count++
                
                if ($p.X -lt $minX) { $minX = $p.X }
                if ($p.X -gt $maxX) { $maxX = $p.X }
                if ($p.Y -lt $minY) { $minY = $p.Y }
                if ($p.Y -gt $maxY) { $maxY = $p.Y }
                
                # Check 4 directions (step size 2 for speed)
                $dirs = @(
                    @(-2, 0), @(2, 0), @(0, -2), @(0, 2)
                )
                
                foreach ($d in $dirs) {
                    $nx = $p.X + $d[0]
                    $ny = $p.Y + $d[1]
                    if ($nx -ge 0 -and $nx -lt $w -and $ny -ge 0 -and $ny -lt $h) {
                        $nidx = $ny * $w + $nx
                        if ($grid[$nidx] -eq 1 -and -not $visited[$nidx]) {
                            $visited[$nidx] = $true
                            $queue.Enqueue((New-Object System.Drawing.Point($nx, $ny)))
                        }
                    }
                }
            }
            
            $width = $maxX - $minX
            $height = $maxY - $minY
            if ($width -gt 10 -and $height -gt 5) {
                $clusters.Add([PSCustomObject]@{
                    X = [int](($minX + $maxX) / 2)
                    Y = [int](($minY + $maxY) / 2)
                    Width = $width
                    Height = $height
                    Area = $count
                    MinX = $minX
                    MaxX = $maxX
                    MinY = $minY
                    MaxY = $maxY
                })
            }
        }
    }
}

Write-Host "Found $($clusters.Count) candidate blue clusters:"
foreach ($c in $clusters) {
    Write-Host "Cluster at X=$($c.X), Y=$($c.Y) | Size: $($c.Width)x$($c.Height) | Area count: $($c.Area)"
}
