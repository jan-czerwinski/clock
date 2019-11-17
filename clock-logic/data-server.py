from flask import Flask, jsonify, request, render_template
import json
app = Flask(__name__)


@app.route('/hello', methods=['GET', 'POST'])
def hello():

    # POST request
    if request.method == 'POST':
        print('Incoming..')
        data = request.get_json()
        with open('../clock-settings.json', 'w') as f:
            json.dump(data, f)
        print(data)
        return 'OK', 200

    # GET request
    else:
        message = {'greeting': 'siemanko'}
        return jsonify(message)  # serialize and use JSON headers


@app.route('/test')
def test_page():
    # look inside `templates` and serve `index.html`
    return render_template('index.html')
