echo off

pyinstaller --clean --icon "icon.ico" --add-data "App;." -n "TubeLoader" -w --onefile App.py

TIMEOUT /T 3 /NOBREAK

del /s /q /f TubeLoader.spec
rmdir /s /q __pycache__
rmdir /s /q build

:cmd
pause null