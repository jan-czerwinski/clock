#! /usr/bin/python3
import json
import threading

from flask import Flask, request

from led import Led

from set_time import set_time
App = Flask(__name__)


@App.route('/clock', methods=['POST'])
def clock():
    if request.method == 'POST':
        data = request.get_json()
        Led.clock = data
        Led.update()
        with open('../clock.json', 'w') as f:
            json.dump(data, f)
        return 'OK', 200


@App.route('/time', methods=['POST'])
def time():
    if request.method == 'POST':
        data = request.get_json()
        set_time(data)
        Led.update()
        return 'OK', 200


if __name__ == '__main__':
    with open('../clock.json') as f:
        Led = Led(json.loads(f.read()))
    try:
        LedLoop = threading.Thread(target=Led.main_loop)
        LedLoop.start()
        print("Started led loop")
        App.run()
    except KeyboardInterrupt:
        Led.pixels.deinit()
