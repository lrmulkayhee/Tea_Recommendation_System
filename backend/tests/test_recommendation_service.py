import pandas as pd
from services.recommendation_service import RecommendationService

def test_get_recommendations():
    tea_data = pd.DataFrame({
        'name': ['Alfalfa', 'Chamomile', 'Green Tea'],
        'description': ['desc1', 'desc2', 'desc3'],
        'origin': ['Asia', 'Europe', 'Asia']
    })
    service = RecommendationService(tea_data)
    user_preferences = {'name': 'Alfalfa'}
    recommendations = service.get_recommendations(user_preferences)
    assert len(recommendations) == 1
    assert recommendations[0]['name'] == 'Alfalfa'