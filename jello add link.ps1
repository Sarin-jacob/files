param([switch]$Elevated)
function Test-Admin {
$currentUser = New-Object Security.Principal.WindowsPrincipal $([Security.Principal.WindowsIdentity]::GetCurrent())

$currentUser.IsInRole([Security.Principal.WindowsBuiltinRole]::Administrator)
}
if ((Test-Admin) -eq $false)
{
if ($elevated) {
# tried to elevate, did not work, aborting

}
else {
Set-executionpolicy remotesigned -Scope CurrentUser
Start-Process powershell.exe -Verb RunAs -ArgumentList ('-noprofile -noexit -file "{0}" -elevated' -f ($myinvocation.MyCommand.Definition))
}
Exit
}


cd 'C:\Program Files\Jellyfin\Jellyfin Media Player\web-client\desktop'
$mainfile = Get-ChildItem -Name 'main.*.bundle.js' -File
if(Test-Path -Path "$mainfile.save"){
cp "$mainfile.save" $mainfile
}
$pro=Read-Host -Prompt 'Press 1 to proceed `\n'
if($pro -ne 1){Exit}
cp $mainfile "$mainfile.save"
$dam='m.ZP.translate("Home")+"</span></a>",'
$fin='m\.ZP\.translate\("Home"\)\+"<\/span><\/a>",'
$rep=$dam+"n+='"+'<a is="emby-linkbutton" class="navMenuOption lnkMediaFolder" href="http://192.168.1.33:5000/" target="_blank"><i class="md-icon navMenuOptionIcon"><img src="https://raw.githubusercontent.com/Sarin-jacob/files/main/slogo.png"></i><span class="navMenuOptionText"'+">'+"+'m.ZP.translate("Requests & Issues")+"</span></a>",'
(Get-Content $mainfile) -replace $fin, $rep | Set-Content $mainfile