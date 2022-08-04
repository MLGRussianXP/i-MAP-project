# i-MAP-project

Веб-приложения для вывода информации о месячном доходе, поддержке клиентов и др.

## Build
```
pip install pyinstaller
pyinstaller --noconfirm --onefile --windowed --icon "web/favicon.ico" --add-data "web;web/" -F main.py
```
