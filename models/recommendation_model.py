import pandas as pd
from sklearn.neighbors import NearestNeighbors
from sklearn.preprocessing import StandardScaler

class TeaRecommendationModel:
    def __init__(self, data_path):
        self.data = pd.read_csv(data_path)
        self.model = NearestNeighbors()
        self.scaler = StandardScaler()

    def preprocess_data(self):
        # Select relevant numerical features for the recommendation
        features = self.data[['Caffeine Content (per 8oz cup)', 'Brewing Temperature', 'Brewing Time']]
        features = features.fillna(0)  # Handle missing values
        scaled_features = self.scaler.fit_transform(features)
        return scaled_features

    def train(self):
        features = self.preprocess_data()
        self.model.fit(features)

    def recommend(self, tea_features):
        scaled_features = self.scaler.transform([tea_features])
        distances, indices = self.model.kneighbors(scaled_features)
        return self.data.iloc[indices[0]]

# Example usage:
# model = TeaRecommendationModel('data/teas_test.csv')
# model.train()
# recommendations = model.recommend([0, 100, 10])  # Example features
# print(recommendations)