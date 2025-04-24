import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer

class RecommendationService:
    def __init__(self, tea_data):
        self.tea_data = tea_data

    def get_recommendations(self, user_preferences, weights=None):
        # Assign default weights if none are provided
        if weights is None:
            weights = {'Flavor Profile': 1.0, 'Health Benefits': 1.0, 'Type': 1.0}

        # Create a combined feature column for similarity calculation
        self.tea_data['combined_features'] = (
            self.tea_data['Flavor Profile'].fillna('') + ' ' +
            self.tea_data['Health Benefits'].fillna('') + ' ' +
            self.tea_data['Type'].fillna('')
        )

        # Vectorize the combined features using TF-IDF
        vectorizer = TfidfVectorizer()
        tea_features_matrix = vectorizer.fit_transform(self.tea_data['combined_features'])

        # Create a user preference string based on weights
        user_combined_features = ' '.join([
            (key + ' ') * int(weights.get(key, 1) * 10)  # Scale weights for emphasis
            for key, value in user_preferences.items()
            if key in ['Flavor Profile', 'Health Benefits', 'Type']
        ])

        # Vectorize the user preferences
        user_vector = vectorizer.transform([user_combined_features])

        # Calculate cosine similarity
        similarity_scores = cosine_similarity(user_vector, tea_features_matrix).flatten()

        # Add similarity scores to the tea data
        self.tea_data['similarity_score'] = similarity_scores

        # Filter and sort recommendations by similarity score
        recommended_teas = self.tea_data.sort_values(by='similarity_score', ascending=False)

        return recommended_teas.to_dict(orient='records')