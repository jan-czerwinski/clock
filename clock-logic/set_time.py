import os
import datetime

year = datetime.date.today().year


def set_time(time):
    os.system(f'date +%Y%m%d -s {year}{time["month"]}{time["day"]}')
    os.system(f'date +%T -s {time["hour"]}:{time["minute"]}:00')
