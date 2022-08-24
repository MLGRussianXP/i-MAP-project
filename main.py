import eel
from datetime import datetime
from calendar import monthrange
from os import path
import json


def load_json(filename):
    with open(filename, encoding='utf-8') as infile:
        return json.loads(infile.read())


def write_json(filename, content):
    print(filename)
    with open(filename, "w") as outfile:
        json.dump(content, outfile, ensure_ascii=True, indent=4)


eel.init('web')


@eel.expose
def change_database(path_to_db):
    if path.isfile(path_to_db):
        db = load_json(path_to_db)
        if "check" in db and db["check"] == "i-map database":
            global db_name
            db_name = path_to_db
            return True


@eel.expose
def get_database():
    db = "db.json"
    if not path.isfile(db):
        create_db(db)
    return db


@eel.expose
def create_db(name: str):
    name_de_suffix = name.rstrip(".json")
    write_json(
        name_de_suffix + ".json",
        {
            "check": "i-map database"
        }
    )
    return name_de_suffix


def check_table(date):
    year, month = date.split("-")
    data = load_json(db_name)

    if year not in data:
        data[year] = dict()
    if month not in data[year]:
        data[year][month] = {}

    write_json(db_name, data)


@eel.expose
def return_month_table(date: str):
    date = date[:7]
    check_table(date)
    year, month = date.split("-")
    data = load_json(db_name)
    all_blocks = data[year][month]

    new_data = []
    for block in all_blocks:
        new_block = []
        for day in range(1, monthrange(datetime.now().year, int(month))[1] + 1):
            new_day = []
            if str(day) in all_blocks[block]:
                new_day = [all_blocks[block][str(day)]["name"], []]
                for par in all_blocks[block][str(day)]["parameters"]:
                    par_data = all_blocks[block][str(day)]["parameters"][par]
                    new_day[1].append([par_data["name"], par_data["value"]])
            new_block.append(new_day)
        new_data.append(new_block)

    return new_data


@eel.expose
def add_data_to_table(data: list, date: str):
    date = date[:10]
    year, month, day = date.split('-')
    check_table("-".join((year, month)))
    db = load_json(db_name)

    for idx, block in enumerate(data):
        block_name, exit_table = block

        if str(idx) not in db[year][month]:
            db[year][month][str(idx)] = {}

        db[year][month][str(idx)][day] = {
            "name": block_name,
            "parameters": {
                str(par_idx + 1): {
                    "name": param,
                    "value": value
                } for par_idx, (param, value) in enumerate(exit_table)
            }
        }

    write_json(db_name, db)
    return True


db_name = get_database()
eel.start("main.html", mode="chrome-app")
