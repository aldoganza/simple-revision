@echo off
echo ========================================
echo Starting Stock Management Frontend App
echo ========================================
echo.
cd frontend-project
echo Installing dependencies (if needed)...
call npm install
echo.
echo Starting frontend on http://localhost:3000
echo Browser will open automatically...
echo.
call npm start
