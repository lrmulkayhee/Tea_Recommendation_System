from flask import Blueprint, jsonify, request
import pandas as pd
from services.recommendation_service import RecommendationService

main = Blueprint('main', __name__)

# Load tea data
tea_data = pd.read_csv('src/static/teas_test.csv')
recommendation_service = RecommendationService(tea_data)

@main.route('/teas', methods=['GET'])
def get_teas():
    return jsonify(tea_data.to_dict(orient='records'))

@main.route('/recommend', methods=['GET'])
def recommend_tea():
    user_preferences = request.args.to_dict()
    recommendations = recommendation_service.get_recommendations(user_preferences)
    return jsonify(recommendations)

@main.route('/teas', methods=['POST'])
def add_tea():
    new_tea = request.json
    global tea_data
    tea_data = tea_data.append(new_tea, ignore_index=True)
    tea_data.to_csv('src/static/teas_test.csv', index=False)
    return jsonify(new_tea), 201

@main.route('/teas/<name>', methods=['PUT'])
def update_tea(name):
    updated_tea = request.json
    global tea_data
    tea_data.loc[tea_data['name'] == name, :] = updated_tea
    tea_data.to_csv('src/static/teas_test.csv', index=False)
    return jsonify(updated_tea)

@main.route('/teas/<name>', methods=['DELETE'])
def delete_tea(name):
    global tea_data
    tea_data = tea_data[tea_data['name'] != name]
    tea_data.to_csv('src/static/teas_test.csv', index=False)
    return '', 204

def register_routes(app):
    app.register_blueprint(main)