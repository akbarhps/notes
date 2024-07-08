# Powershell Profile

```shell
# Init and set oh-my-posh theme
#oh-my-posh init pwsh --config "C:\Users\Nitro\AppData\Local\Programs\oh-my-posh\themes\zash.omp.json" | Invoke-Expression
oh-my-posh init pwsh --config "C:\Workspace\PowershellScripts\zash.omp.json" | Invoke-Expression

# Import the Chocolatey Profile that contains the necessary code to enable
# tab-completions to function for `choco`.
# Be aware that if you are missing these lines from your profile, tab completion
# for `choco` will not function.
# See https://ch0.co/tab-completion for details.
$ChocolateyProfile = "$env:ChocolateyInstall\helpers\chocolateyProfile.psm1"
if (Test-Path($ChocolateyProfile)) {
  Import-Module "$ChocolateyProfile"
}

# Shows navigable menu of all options when hitting Tab
# this also can be done with ctrl + space
Set-PSReadlineKeyHandler -Key Tab -Function MenuComplete

# Powershell equivalent of linux command
New-Alias    grep      findstr
New-Alias    touch     New-Item
```