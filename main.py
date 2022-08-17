import eel
import sqlite3
from datetime import datetime
from calendar import monthrange

eel.init('web')

db_name = 'db.sqlite'
conn: sqlite3.Connection = None
cursor: sqlite3.Cursor = None
current_year = datetime.now().year


def open_db():
    global conn, cursor
    conn = sqlite3.connect(db_name)
    cursor = conn.cursor()


def close():
    cursor.close()
    conn.close()


def check_table(date):
    year, month = list(map(int, date.split("_")))
    cursor.execute(
        '''
        SELECT count(name) FROM sqlite_master WHERE type='table' AND name=?
        ''', [date]
    )
    if cursor.fetchone()[0] == 0:
        cursor.execute(
            f'''
                CREATE TABLE `{date}` (
                day SMALLINT,
                r1 INT, s1 INT, pa1 INT, pb1 INT,
                r2 INT, s2 INT, pa2 INT, pb2 INT,
                r3 INT, s3 INT, pa3 INT, pb3 INT,
                r4 INT, s4 INT, pa4 INT, pb4 INT,
                r5 INT, s5 INT, pa5 INT, pb5 INT,
                r6 INT, s6 INT, pa6 INT, pb6 INT
                )
                '''
        )

        days = monthrange(current_year, month)[1]
        for day in range(1, days + 1):
            cursor.execute(
                f'''
                    INSERT INTO `{date}`
                    VALUES (
                    ?,
                    NULL, NULL, NULL, NULL,
                    NULL, NULL, NULL, NULL,
                    NULL, NULL, NULL, NULL,
                    NULL, NULL, NULL, NULL,
                    NULL, NULL, NULL, NULL,
                    NULL, NULL, NULL, NULL
                    )
                    ''', [day]
            )
        conn.commit()


@eel.expose
def return_month_table(date: str):
    date = date[:7]
    date = date.replace('-', '_')

    open_db()
    check_table(date)
    cursor.execute(
        f'''
        SELECT * FROM `{date}`
        '''
    )
    data = cursor.fetchall()

    close()
    return list(map(lambda x: list(x), data))


@eel.expose
def add_data_to_table(data: list, date: str):
    year, month, day = list(map(int, date.split('-')))
    open_db()
    check_table(table_name := date[:7].replace('-', '_'))

    cursor.execute(
        f'''
        UPDATE `{table_name}`
        SET
        r1=?, s1=?, pa1=?, pb1=?,
        r2=?, s2=?, pa2=?, pb2=?,
        r3=?, s3=?, pa3=?, pb3=?,
        r4=?, s4=?, pa4=?, pb4=?,
        r5=?, s5=?, pa5=?, pb5=?,
        r6=?, s6=?, pa6=?, pb6=?
        WHERE day=?
        ''', [*[j for i in data for j in i], day]
    )
    conn.commit()
    close()
    return True


@eel.expose
def excel_export_block():
    pass


eel.start("main.html", mode="chrome-app")
