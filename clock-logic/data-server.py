from flask import Flask, jsonify, request, render_template
import json
app = Flask(__name__)


@app.route('/clock', methods=['POST'])
def clock_api():
    if request.method == 'POST':
        print('Incoming..')
        data = request.get_json()
        with open('../clock-settings.json', 'w') as f:
            json.dump(data, f)
        print(data)
        return 'OK', 200


if __name__ == '__main__':
    app.run(debug=True)
