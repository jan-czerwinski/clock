#! /usr/bin/python3
import json
import threading

from flask import Flask, request

from led import Led

App = Flask(__name__)


@App.route('/clock', methods=['POST'])
def clock_api():
    if request.method == 'POST':
        print('Incoming..')
        data = request.get_json()
        Led.clock = data
        with open('../clock.json', 'w') as f:
            json.dump(data, f)
        return 'OK', 200


if __name__ == '__main__':
    with open('../clock.json') as f:
        LED = Led(json.loads(f.read()))
    LedLoop = threading.Thread(target=Led.inf_loop)
    LedLoop.start()
    APP.run()
