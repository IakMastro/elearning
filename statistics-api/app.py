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
  data = pd.DataFrame(data['tests'])
  data = data.where(data['grade'] > 2.5).dropna()

  max_value = data['grade'].max()
  min_value = data['grade'].min()
  response_object['max'] = { "value": max_value, "course": data['course_id'][data['grade'].idxmax()] }
  response_object['min'] = { "value": min_value, "course": data['course_id'][data['grade'].idxmin()] }
  response_object['mean'] = data['grade'].mean()
  response_object['sum'] = data['grade'].size

  return jsonify(response_object)


if __name__ == '__main__':
  app.run(debug=DEBUG)
