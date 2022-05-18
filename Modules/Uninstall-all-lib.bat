pause "Vi yvereny chto xotite ydalit vse biblioteky Python?"
pip freeze > requirements.txt
pip uninstall -r requirements.txt -y
del /s /q /f requirements.txt