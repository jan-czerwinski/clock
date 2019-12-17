import datetime
from words import *

def three_two_one():
    return (HOUR["3"],HOUR["2"],HOUR["1"])


def parse_brightness(brightness):
    return brightness/255


def parse_color(color):
    return (color["r"], color["g"], color["b"])


def current_time_in_range(start, end):
    now = datetime.datetime.now().time()
    start = datetime.time(int(start[:2]), int(start[2:4]))
    end = datetime.time(int(end[:2]), int(end[2:4]))
    if start <= end:
        return start <= now <= end
    else:
        return start <= now or now <= end


def words_from_time():
    now = datetime.datetime.now().time()
    seconds = now.minute*60 + now.second
    active_pixels = []
    active_pixels += GENERAL["it_is"]

    if(seconds <= 150 or seconds >= 3600-150):
        active_pixels += GENERAL["oclock"]
    elif(seconds < 1800+150):
        active_pixels += GENERAL["past"]
        if seconds < 300+150:
            active_pixels += MINUTE["five"]
        elif(seconds < 600+150):
            active_pixels += MINUTE["ten"]
        elif(seconds < 900+150):
            active_pixels += MINUTE["quarter"]
        elif(seconds < 1200+150):
            active_pixels += MINUTE["twenty"]
        elif(seconds < 1500+150):
            active_pixels += MINUTE["twentyfive"]
        else:
            active_pixels += MINUTE["half"]

    else:
        active_pixels += GENERAL["to"]
        if(seconds < 2100+150):
            active_pixels += MINUTE["twentyfive"]
        elif (seconds < 2400+150):
            active_pixels += MINUTE["twenty"]
        elif (seconds < 2700+150):
            active_pixels += MINUTE["quarter"]
        elif (seconds < 3000+150):
            active_pixels += MINUTE["ten"]
        elif (seconds < 3300+150):
            active_pixels += MINUTE["five"]

    display_hour = int(datetime.datetime.strptime(
        str(now.hour), "%H").strftime("%I"))
    if(seconds > 1800+150):
        display_hour = display_hour+1 if display_hour != 12 else 1
    active_pixels += HOUR[str(display_hour)]
    print("now: ",now)
    print("active pixels: " ,active_pixels)
    return active_pixels
