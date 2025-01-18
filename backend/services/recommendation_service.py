import pandas as pd

class RecommendationService:
    def __init__(self, tea_data):
        self.tea_data = tea_data

    def get_recommendations(self, user_preferences):
        # Logic to filter and recommend teas based on user preferences
        recommended_teas = self.tea_data.copy()

        for key, value in user_preferences.items():
            if key in recommended_teas.columns:
                recommended_teas = recommended_teas[recommended_teas[key].str.contains(value, case=False, na=False)]

        # Example: Sort recommendations by a specific column, e.g., 'name'
        recommended_teas = recommended_teas.sort_values(by='name')

        return recommended_teas.to_dict(orient='records')