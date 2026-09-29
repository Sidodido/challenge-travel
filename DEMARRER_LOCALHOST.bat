@echo off
title Challenge Travel & Tours — Serveur Localhost
echo ========================================================
echo  DEMARRAGE DU SERVEUR LOCALHOST — CHALLENGE TRAVEL & TOURS
echo ========================================================
echo.
echo Le site est accessible sur : http://localhost:8080
echo.
echo Ouverture de votre navigateur...
start http://localhost:8080
echo.
echo Pour arreter le serveur, fermez simplement cette fenetre.
python -m http.server 8080 --directory "%~dp0"
pause
