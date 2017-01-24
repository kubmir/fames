#Requires -Version 5

Write-Host 'Task 1: Installing packages'
& npm install
if ($LastExitCode -ne 0)
{
    Write-Error 'Task 1: It was not possible to install packages. Review npm output.'
}
else
{
    Write-Host 'Task 1: Success' -ForegroundColor Green
}

Write-Host 'Task 2: Creating directory ./dist'
New-Item ./dist -ItemType Directory -Force | Out-Null
Write-Host 'Task 2: Success' -ForegroundColor Green

Write-Host 'Task 3: Linking ./favicon.png to ./dist'
if (Test-Path ./favicon.png)
{
    New-Item ./dist/favicon.png -Type SymbolicLink -Value ./favicon.png -Force | Out-Null
    Write-Host 'Task 3: Success' -ForegroundColor Green
}
else
{
    Write-Warning 'Task 3: Favicon.png cannot be found. This will lead to HTTP error 404.'
}

Write-Host 'Task 4: Linking React (./node_modules/react/dist/react.js) to ./dist'
if (Test-Path ./node_modules/react/dist/react.js)
{
    New-Item ./dist/react.js -Type SymbolicLink -Value ./node_modules/react/dist/react.js -Force | Out-Null
    Write-Host 'Task 4: Success' -ForegroundColor Green
}
else
{
    Write-Error 'Task 4: Cannot find React in ./node_modules/react/dist/react.js'
}

Write-Host 'Task 5: Linking React-DOM (./node_modules/react-dom/dist/react-dom.js) to ./dist'
if (Test-Path ./node_modules/react-dom/dist/react-dom.js)
{
    New-Item ./dist/react-dom.js -Type SymbolicLink -Value ./node_modules/react-dom/dist/react-dom.js -Force | Out-Null
    Write-Host 'Task 5: Success' -ForegroundColor Green
}
else
{
    Write-Error 'Task 5: Cannot find React-DOM in ./node_modules/react-dom/dist/react-dom.js'
}

Write-Host 'Solution was successfully initialized'  -ForegroundColor Green