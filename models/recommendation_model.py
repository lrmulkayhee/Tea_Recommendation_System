import pandas as pd
from sklearn.neighbors import NearestNeighbors

class TeaRecommendationModel:
    def __init__(self, data_path):
        self.data = pd.read_csv(data_path)
        self.model = NearestNeighbors()

    def train(self):
        self.model.fit(self.data.drop('name', axis=1))

    def recommend(self, tea_features):
        distances, indices = self.model.kneighbors([tea_features])
        return self.data.iloc[indices[0]]
