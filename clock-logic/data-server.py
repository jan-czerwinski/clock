from flask import Flask, request
import json
from led import Led
import threading

app = Flask(__name__)


@app.route('/clock', methods=['POST'])
def clock_api():
    if request.method == 'POST':
        print('Incoming..')
        data = request.get_json()
        Led.clock = data
        with open('../clock-settings.json', 'w') as f:
            json.dump(data, f)
        print(data)
        return 'OK', 200


if __name__ == '__main__':
    with open('../clock-settings.json') as f:
        Led = Led(json.loads(f.read()))
    ledLoop = threading.Thread(target=Led.inf_loop)
    ledLoop.start()
    app.run()
