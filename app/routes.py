from flask import Blueprint, render_template, request
from models.recommendation_model import TeaRecommendationModel

main = Blueprint('main', __name__)

@main.route('/')
def index():
    return render_template('index.html')

@main.route('/recommend', methods=['POST'])
def recommend():
    features = request.form.getlist('features')
    model = TeaRecommendationModel('data/teas.csv')
    model.train()
    recommendations = model.recommend(features)
    return render_template('index.html', recommendations=recommendations)
