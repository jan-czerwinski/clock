from flask import Flask, jsonify, request, render_template
import json
app = Flask(__name__)


@app.route('/clock', methods=['POST'])
def hello():
    if request.method == 'POST':
        print('Incoming..')
        data = request.get_json()
        with open('../clock-settings.json', 'w') as f:
            json.dump(data, f)
        print(data)
        return 'OK', 200


@app.route('/test')
def test_page():
    # look inside `templates` and serve `index.html`
    return render_template('index.html')
