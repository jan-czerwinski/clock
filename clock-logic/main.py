#! /usr/bin/python3
import json
import threading

from flask import Flask, request

from led import Led
from snake import Snake

from set_time import set_time
App = Flask(__name__)


@App.route('/clock', methods=['POST'])
def clock():
    if request.method == 'POST':
        data = request.get_json()
        Led.clock = data
        Led.main_update()
        with open('../clock.json', 'w') as f:
            json.dump(data, f)
        return 'OK', 200


@App.route('/time', methods=['POST'])
def time():
    if request.method == 'POST':
        data = request.get_json()
        set_time(data)
        Led.main_update()
        return 'OK', 200

@App.route('/snake', methods=['POST'])
def snake():
    if request.method == 'POST':
        data = request.get_json()
        if data["costamtutajchyba"] == "tutajstart":   #TODO
            Led.snake = Snake()
            Led.playing_snake = True
            snakeLoop = threading.Thread(target=Led.snake_loop)
            snakeLoop.start()
        elif data["czy_skrecam_w_prawo"] == True:
            Led.snake.change_direction(data["czy_skrecam_w_prawo"] == "costam ")
        elif data["Czy_wychodzę"] == "czy_wychodze":
            Led.playing_snake = False
        return 'OK', 200


if __name__ == '__main__':
    with open('../clock.json') as f:
        Led = Led(json.loads(f.read()))
    try:
        clockLoop = threading.Thread(target=Led.main_loop)
        clockLoop.start()
        print("Started clock loop")
        App.run()
    except KeyboardInterrupt:
        Led.pixels.deinit()
