# Rename all files with 7z suffix without ps1 files
#Get-ChildItem -Path .\* -File -Exclude *ps1 | Rename-Item -NewName { $_.name + ".7z" } 

# Rename all files with 7z suffix without ps1 files
#Get-ChildItem -Path .\* -File -Exclude *ps1 | Rename-Item -NewName { $_.name + ".7z" } 
#$p7zipopt="C:\Program Files\7z2201-extra\7za.exe"
#Get-ChildItem -Path .\* -Recurse -File -Include *7z  | & $p7zipopt l -pxb20 -o. $_

$global:finishdir="..\finish"

$files = Get-ChildItem -Recurse -File -Include *7z;
ForEach ($file in $files)
{
$folder = (Split-Path (Get-Item $file.FullName).FullName -Parent);
Write-Host  "Working on file : " $file.FullName ", Parent folder : " $folder;
#Move-Item $file.FullName $folder.FullName;
Write-Host $p7zipopt l -pxb20 "-o$folder" $file.FullName;
$result = & $p7zipopt l -pxb20 "-o$folder" $file.FullName | select -Last 1;
if($result)
{
  #Write-Host "Password-Check succeeded";
  $vResultAsOK="ok"
}
else
{
  Write-Host "Password Failed for file : $file";
  exit 1;
}
Write-Host $p7zipopt x -pxb20 -y "-o$folder" $file.FullName;
$result = & $p7zipopt x -pxb20 -y "-o$folder" $file.FullName;
if($result)
{
  Write-Host "command succeeded";
  Write-Host "Move-Item" $file.FullName -Destination $global:finishdir -Force
  Move-Item $file.FullName -Destination $global:finishdir -Force
}
else
{
    Write-Host "command failed";
  exit 1;
}

}