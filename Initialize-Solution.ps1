#Requires -Version 5

Write-Output 'Task 0: Creating directory ./public'
New-Item ./public -ItemType Directory -Force | Out-Null
Write-Output 'Task 0: Success'

Write-Output 'Task 1: Installing packages'
& npm install --no-optional
if ($LastExitCode -ne 0)
{
    Write-Error 'Task 1: It was not possible to install packages. Review npm output.'
}
else
{
    Write-Output 'Task 1: Success'
}

Write-Output 'Task 2: Linking ./favicon.png to ./public'
if (Test-Path ./favicon.png)
{
    Copy-Item ./favicon.png ./public/favicon.png -Force | Out-Null
    Write-Output 'Task 2: Success'
}
else
{
    Write-Warning 'Task 2: Favicon.png cannot be found. This will lead to HTTP error 404.'
}

Write-Output 'Task 3: Linking React (./node_modules/react/dist/react.js) to ./public'
if (Test-Path ./node_modules/react/dist/react.js)
{
    Copy-Item ./node_modules/react/dist/react.js ./public/react.js -Force | Out-Null
    Write-Output 'Task 3: Success'
}
else
{
    Write-Error 'Task 3: Cannot find React in ./node_modules/react/dist/react.js'
}

Write-Output 'Task 4: Linking React-DOM (./node_modules/react-dom/dist/react-dom.js) to ./public'
if (Test-Path ./node_modules/react-dom/dist/react-dom.js)
{
    Copy-Item ./node_modules/react-dom/dist/react-dom.js ./public/react-dom.js  -Force | Out-Null
    Write-Output 'Task 4: Success'
}
else
{
    Write-Error 'Task 4: Cannot find React-DOM in ./node_modules/react-dom/dist/react-dom.js'
}

Write-Output 'Task 5: Copy index.html (./index.html) to ./public'
if (Test-Path ./index.html)
{
    Copy-Item ./index.html ./public/index.html -Force | Out-Null
    Write-Output 'Task 5: Success'
}
else
{
    Write-Error 'Task 5: Cannot find index.html in ./index.html'
}

Write-Output 'Solution was successfully initialized'
