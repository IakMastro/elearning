from urllib import response
import numpy as np
import pandas as pd

from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

# Configuration
DEBUG = True

# Init app
app = Flask(__name__)
app.config.from_object(__name__)

# Enable CORS
CORS(app, resources={r"/*": {"origins": "*"}})


# Routing
@app.route('/', methods=['POST'])
@cross_origin()
def index():
  response_object = {}
  data = request.get_json()

  if len(data['grades']) != 0:
    return jsonify({})

  response_object['max'] = max(data['grades'])
  response_object['min'] = min(data['grades'])
  response_object['total'] = len(data['grades'])

  sum = 0.0
  for grade in data['grades']:
    sum += grade
  response_object['average'] = sum / len(data['grades'])

  return jsonify(response_object)


if __name__ == '__main__':
  app.run(debug=DEBUG)
