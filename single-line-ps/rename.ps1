Get-ChildItem * | Rename-Item -NewName { $_.Name + '.7z' }
