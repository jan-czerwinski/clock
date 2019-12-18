import threading
import time

import board
import neopixel
from elevate import elevate

from led_functions import *
from snake import Snake

NUMBER_OF_LEDS = 100
RPI_PIN = board.D18
LOOP_INTERVAL = 10  # in seconds

class Led:
    def __init__(self, clock):
        elevate()
        self.clock = clock
        self.snake = None
        self.pixels = neopixel.NeoPixel(
            RPI_PIN,
            NUMBER_OF_LEDS,
            auto_write=False)
        self.is_updating = False
        self.playing_snake = False

    def main_update(self):
        print()
        print("UPDATING")
        self.is_updating = True

        pixels = self.pixels
        pixels.fill((0, 0, 0))

        # switch clock on/off
        if not self.clock["switch"]:
            pixels.fill((0, 0, 0))
            pixels.show()
            return

        # set brightness and determine if in nightmode
        brightness = self.clock["brightness"]
        print(brightness)
        if brightness["nightMode"] and current_time_in_range(brightness["startTime"], brightness["endTime"]):
            pixels.brightness = parse_brightness(brightness["night"])
        else:
            pixels.brightness = parse_brightness(brightness["day"])

        # set active pixels according to time
        pixels.fill((0, 0, 0))
        active_pixels = words_from_time()
        color = parse_color(self.clock["color"])
        for i in active_pixels:
            pixels[i] = color

        pixels.show()
        self.is_updating = False

    def main_loop(self):
        while True:
            if not self.playing_snake:
                if not self.is_updating: self.main_update()
                print(self.clock)
                time.sleep(15)
            else:
                time.sleep(0.5)

    def snake_loop(self):
        self.snake_start()
        while True:
            self.playing_snake = self.playing_snake and self.snake.update()
            if not self.playing_snake:
                self.snake_end()
                return
            self.snake_update()
            time.sleep(self.snake.get_delay())
    
    def snake_update(self):
        pixels = self.pixels
        pixels.fill((0, 0, 0))
        for i in self.snake.get_real_coords():
            pixels[i] = (0,255,60) #green snake
        pixels[self.snake.get_real_food()] = (255,0,0) #red apple
        pixels.show()

    def snake_start(self):
        self.playing_snake = True
        pixels = self.pixels
        while self.is_updating:
            time.sleep(0.1)
        pixels.fill((0, 0, 0))
        pixels.show()
        for word in three_two_one():
            for i in word:
                pixels[i] = (255,255,255)
            pixels.show()
            time.sleep(1)
            pixels.fill((0,0,0))
        pixels.show()
    
    def snake_end(self):
        pass
    
if __name__ == '__main__':
    try:
        led = Led({"switch": True, "brightness": {"day": 200, "nightMode": True, "night": 100,
                                                  "startTime": "2200", "endTime": "0400"}, "color": {"r": 255, "g": 255, "b": 255}})
        led.main_loop()
    except KeyboardInterrupt:
        led.pixels.deinit()
