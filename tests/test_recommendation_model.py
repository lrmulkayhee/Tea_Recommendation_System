import unittest
from models.recommendation_model import TeaRecommendationModel

class TestTeaRecommendationModel(unittest.TestCase):
    def setUp(self):
        self.model = TeaRecommendationModel('data/teas.csv')
        self.model.train()

    def test_recommend(self):
        tea_features = [1, 2, 3]  # Example features
        recommendations = self.model.recommend(tea_features)
        self.assertIsNotNone(recommendations)

if __name__ == '__main__':
    unittest.main()
