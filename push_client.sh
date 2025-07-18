#!/bin/bash

echo "Pushing client folder to GitHub repository..."

# Initialize git repository if not already initialized
if [ ! -d ".git" ]; then
    echo "Initializing Git repository..."
    git init
fi

# Add the remote repository
git remote remove origin 2>/dev/null
git remote add origin https://github.com/dhirajkumar1214/Routine-Management-App.git

# Add all files in the client folder
echo "Adding client folder files..."
git add client/

# Add other project files
git add .gitignore
git add README.md

# Commit the changes
echo "Committing changes..."
git commit -m "Add client folder with React frontend application"

# Push to the main branch
echo "Pushing to GitHub..."
git push -u origin main

echo "Client folder has been pushed to GitHub successfully!"
