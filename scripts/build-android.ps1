# Configuração do Ambiente Android e Execução do App

$androidHome = "C:\Users\Natanael\AppData\Local\Android\Sdk"
$env:ANDROID_HOME = $androidHome
$env:PATH = "$androidHome\platform-tools;$androidHome\emulator;$env:PATH"

Write-Host "Verificando dispositivos Android..." -ForegroundColor Cyan
$devices = adb devices | Select-String "emulator"

if (-not $devices) {
    Write-Host "Iniciando emulador 'Emulador_Android'..." -ForegroundColor Yellow
    Start-Process -FilePath "emulator" -ArgumentList "@Emulador_Android" -NoNewWindow
    Write-Host "Aguardando inicialização..." -ForegroundColor Gray
    Start-Sleep -Seconds 15
} else {
    Write-Host "Emulador já está rodando." -ForegroundColor Green
}

Write-Host "Limpando caches e pastas temporárias..." -ForegroundColor Yellow
if (Test-Path "android") { Remove-Item -Recurse -Force android }
if (Test-Path ".expo") { Remove-Item -Recurse -Force .expo }

Write-Host "Iniciando Prebuild..." -ForegroundColor Cyan
# Força a geração da pasta android do zero
npx expo prebuild --platform android --clean

Write-Host "`nIniciando a instalação da build de desenvolvimento..." -ForegroundColor Cyan
npx expo run:android --no-build-cache
