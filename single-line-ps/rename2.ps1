Get-ChildItem * | Rename-Item -NewName { .Name + '.7z' }
