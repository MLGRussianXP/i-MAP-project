# i-MAP-project

Веб-приложения для вывода информации о месячном доходе, поддержке клиентов и др.

## Build
```
pyinstaller --noconfirm --onefile --windowed --icon "web/favicon.ico" --add-data "web;web/" --add-data "db.sqlite;."  "main.py"
```
