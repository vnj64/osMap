from flask import Flask, render_template

app = Flask(__name__)

app.route('/')
def hello():
    return '<h3>Hello, World!<h3>'

@app.route('/map')
def map():
    return render_template('map.html')