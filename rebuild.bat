@echo off
cd /d "c:\Users\krish\OneDrive\Desktop\new\emailer\frontend"
echo Killing processes...
taskkill /F /IM node.exe 2>nul
taskkill /F /IM npm.cmd 2>nul
timeout /t 3
echo Cleaning...
rmdir /s /q node_modules 2>nul
del package-lock.json 2>nul
rmdir /s /q .next 2>nul
echo Installing...
call npm install
echo Starting dev server...
call npm run dev
pause
