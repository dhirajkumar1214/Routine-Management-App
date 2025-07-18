@echo off
echo Pushing client folder to GitHub repository...

REM Initialize git repository if not already initialized
if not exist .git (
    echo Initializing Git repository...
    git init
)

REM Add the remote repository
git remote remove origin 2>nul
git remote add origin https://github.com/dhirajkumar1214/Routine-Management-App.git

REM Add all files in the client folder
echo Adding client folder files...
git add client/

REM Add other project files
git add .gitignore
git add README.md

REM Commit the changes
echo Committing changes...
git commit -m "Add client folder with React frontend application"

REM Push to the main branch
echo Pushing to GitHub...
git push -u origin main

echo Client folder has been pushed to GitHub successfully!
pause
