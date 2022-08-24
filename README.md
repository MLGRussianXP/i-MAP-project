# i-MAP-project

Веб-приложения для вывода информации о месячном доходе, поддержке клиентов и др.

## Build
```
pip install pyinstaller
pyinstaller --noconfirm --windowed --name "Business table" --icon "web/favicon.ico" --add-data "web;web/" -F main.py
```

## How to use
1. Скачайте `.exe` файл из последнего релиза по этой [ссылке](https://github.com/MLGRussianXP/i-MAP-project/releases).
2. После первого запуска появится файл `db.json`, который является базой данных.
3. Интерфейс и функционал:
  - Главная страница
    - Блок управления базами данных:
      - При запуске программы по умолчанию всегда используется база данных под названием `db.json`.
      - Кнопка "Создать базу данных" создаёт новую пустую базу данных.
    - Кнопка "Итог за месяц" ведёт на страницу месячной таблицы, в которой собираются данные по всем блокам за месяц.
    - Блок (команда):
      - Содержит таблицу с данными, которую заполняет пользователь.
      - Кнопка "Итого" рассчитывает итог по текущему блоку (суммирует все столбцы в итоговые).
      - Кнопка "Экспорт в Excel" экспортирует таблицу в `.xlsx` файл.
      - Также можно менять названия блоков и параметров.
    - Кнопка "Итого" рассчитывает итог по всем блокам.
    - Ввод даты:
      - Нужен для следующих двух кнопок.
      - Кнопка "Добавить в месячную таблицу" добавляет текущие данные в базу данных за выбранную дату.
      - Кнопка "Экспорт в Excel" экспортирует все блоки в `.xlsx` файл с названием выбранной даты.
 - Страница итогов за месяц
   - Кнопка "На главную" ведёт на главную страницу.
   - Выбор даты и конпка "Просмотреть данные" выполняет поиск по выбранной дате в базе данных и выводит данные в виде блоков с таблицами. В случае если данных нет, будет выведена надпись "За этот период данных нет.".

## Screenshots
### Главная страница
![Главная страница](https://github.com/MLGRussianXP/i-MAP-project/blob/master/screenshots/Главная%20страница.png?raw=true)
### Месячная таблица
![Месячная таблица](https://github.com/MLGRussianXP/i-MAP-project/blob/master/screenshots/Месячная%20таблица.png?raw=true)
