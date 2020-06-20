param(
[string] $ConfigurationName,
[string] $SolutionDir,
[string] $ProjectDir,
[string] $TargetDir
)
Write-Host ""
Write-Host "CS4VS Pre-Build.ps1 Starting..."
Write-Host ""
Write-Host ""

Write-Host "ProjectDir=$($ProjectDir)"
Write-Host "SolutionDir=$($SolutionDir)"
Write-Host "TargetDir=$($TargetDir)"
$Joined = Join-Path "$($SolutionDir)" "..\licenses\$($ConfigurationName)" "teamdev.licenses"
Write-Host $Joined
$LicenseFile = (($Joined | Resolve-Path).Path) + "\teamdev.licenses"
Write-Host "LicenseFile=$($LicenseFile)"
$LocalLicenseFile = "$($ProjectDir)teamdev.licenses"
Write-Host "LocalLicenseFile=$($LocalLicenseFile)"
Write-Host ""
Write-Host ""

Write-Host "Possible deleting old local license file '$($LocalLicenseFile)'..."
if ((Test-Path -Path $LocalLicenseFile)) {	
	Remove-Item $LocalLicenseFile -Force
	Write-Host "Deleted old local license completed."
}
else {
	Write-Host "NOT deleting old local license (doesn't exist) '$($LocalLicenseFile)'..."
}

Write-Host "Copying license to local license..."
if (!(Test-Path -Path $LicenseFile)) {
 	Write-Host "Actual LicenseFile not found LicenseFile=$($LicenseFile)"
 	exit 1
}
Copy-Item $LicenseFile -Destination $ProjectDir
Write-Host "Copying licenses completed."

Write-Host ""
Write-Host ""
Write-Host "VS Pre-Build.ps1 Completed"
Write-Host ""
Write-Host ""
