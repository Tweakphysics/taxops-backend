Get-Process | Where-Object { $_.MainWindowTitle } | Select-Object MainWindowTitle, ProcessName | Format-Table -AutoSize

Write-Host "`n--- Edge Window Handles ---"
Get-Process msedge | Where-Object { $_.MainWindowHandle -ne 0 } | Select-Object Id, MainWindowTitle, MainWindowHandle | Format-Table -AutoSize
