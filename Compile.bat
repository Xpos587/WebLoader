echo off

python -m eel App.py WebApp --onefile -w --icon "logo.ico" --clean -n "Loader"

TIMEOUT /T 3 /NOBREAK

del /s /q /f Loader.spec
rmdir /s /q __pycache__
rmdir /s /q build

:cmd
pause null