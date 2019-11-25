import subprocess
import datetime

year = datetime.date.today().year


def set_time(time):
    pass
    subprocess.call(['sudo', 'date', '+%Y%m%d', '-s',
                     f'{year}{time["month"]}{time["day"]}'])
    subprocess.call(['sudo', 'date', '+%T', '-s',
                     f'{time["hour"]}:{time["minute"]}:00'])


if __name__ == '__main__':
    set_time({'month': '05', 'day': '10'})
