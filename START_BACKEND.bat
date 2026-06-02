@echo off
echo ========================================
echo Starting Stock Management Backend Server
echo ========================================
echo.
cd backend-project
echo Installing dependencies (if needed)...
call npm install
echo.
echo Starting backend server on http://localhost:5000
echo.
call npm start
