from elevate import elevate
import subprocess
import datetime

year = datetime.date.today().year



def set_time(time):
    elevate
    subprocess.call(['sudo', 'date', '+%Y%m%d', '-s',
                     f'{year}{time["month"]}{time["day"]}'])
    subprocess.call(['sudo', 'date', '+%T', '-s',
                     f'{time["hour"]}:{time["minute"]}:00'])
    subprocess.call(['sudo', 'hwclock', '-w'])

if __name__ == '__main__':
    set_time({'month': '11', 'day': '27', "hour": "12", "minute": "53"})
