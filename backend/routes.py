from flask import Blueprint, jsonify, request
import pandas as pd
from backend.services.recommendation_service import RecommendationService
from backend.services.chatbot_service import ChatbotService

main = Blueprint('main', __name__)

# Load tea data
tea_data = pd.read_csv('backend/data/teas.csv')
recommendation_service = RecommendationService(tea_data)
chatbot_service = ChatbotService()

@main.route('/recommend', methods=['GET'])
def recommend_tea():
    user_preferences = request.args.to_dict()
    recommendations = recommendation_service.get_recommendations(user_preferences)
    return jsonify(recommendations)

@main.route('/chat', methods=['POST'])
def chat_with_bot():
    user_message = request.json.get('message', '')
    response = chatbot_service.get_response(user_message)
    return jsonify({'response': response})

def register_routes(app):
    app.register_blueprint(main)