cd C:\thecajunmenu.site\vite-react

Write-Host 'JULES SCAN STARTED' -ForegroundColor Cyan

git status
git diff --stat
git log -5 --oneline

Write-Host 'Scanning src folder...' -ForegroundColor Yellow
Get-ChildItem src -Recurse | Select FullName

Write-Host 'JULES SCAN COMPLETE' -ForegroundColor Green
