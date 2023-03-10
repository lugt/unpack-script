
# Extract First Level
Get-ChildItem -Filter *.7z | foreach { Write-Host $_.Name; & "C:\Program Files\7z2201-extra\7za.exe" x "-pxb20" "-o." $_.Name; }

# Finish Up 
Get-ChildItem -Filter *7z | foreach { Write-Host $_.FullName; mv -Force $_.FullName ..\fini\ }

# Extract Second Level
Get-ChildItem -R -Filter *7z | foreach { Write-Host $_.FullName; Write-Host (Split-Path $_.FullName);  & "C:\Program Files\7z2201-extra\7za.exe" x "-pxb20" ("-o" + (Split-Path $_.FullName)) $_.FullName; }

# Finish Up 
Get-ChildItem -R -Filter *7z | foreach { Write-Host $_.FullName; mv -Force $_.FullName ..\fini\ }