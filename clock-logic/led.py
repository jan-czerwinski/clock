import time
import board
import neopixel
import threading
from words import *
import datetime

NUMBER_OF_LEDS = 9
RPI_PIN = board.D18


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


class Led:
    def __init__(self, clock):
        self.clock = clock
        self.pixels = neopixel.NeoPixel(
            RPI_PIN,
            NUMBER_OF_LEDS,
            auto_write=False,
            pixel_order=neopixel.RGB)

    def update(self):
        self.is_updating = True
        if not self.clock["switch"]:
            return

        pixels = self.pixels
        brightness = self.clock["brightness"]
        color = self.clock["color"]

        if brightness["nightMode"] and \
                current_time_in_range(brightness["startTime"], brightness["endTime"]):
            pixels.brightness = parse_brightness(brightness["night"])
        else:
            pixels.brightness = parse_brightness(brightness["day"])

        #test function
        for i in range(len(pixels)):
            pixels.fill((0, 0, 0))
            pixels[i] = parse_color(color)
            pixels.show()
            time.sleep(0.2)
        pixels.fill((0, 0, 0))
        pixels.show()
        self.is_updating = False

        

    def main_loop(self):
        if not self.is_updating:
            self.update()
        threading.Timer(2, self.main_loop).start()


if __name__ == '__main__':
    try:
        led = Led({"switch": True, "brightness": {"day": 1, "nightMode": True, "night": 100,
                                                  "startTime": "2200", "endTime": "0400"}, "color": {"r": 255, "g": 255, "b": 255}})
        led.main_loop()
    except KeyboardInterrupt:
        led.pixels.deinit()
