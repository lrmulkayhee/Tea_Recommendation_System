import unittest
from flask import Flask
from app import create_app

class TestApp(unittest.TestCase):
    def setUp(self):
        self.app = create_app()
        self.client = self.app.test_client()
        self.app.testing = True

    def test_index_route(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'<!DOCTYPE html>', response.data)

    def test_chatbot_api_valid_input(self):
        response = self.client.post('/api/chatbot', json={'message': 'Recommend me a tea'})
        self.assertEqual(response.status_code, 200)
        self.assertIn('recommendation', response.get_json())

    def test_chatbot_api_empty_input(self):
        response = self.client.post('/api/chatbot', json={'message': ''})
        self.assertEqual(response.status_code, 400)
        self.assertIn('error', response.get_json())

    def test_chatbot_api_invalid_input(self):
        response = self.client.post('/api/chatbot', json={'message': 12345})
        self.assertEqual(response.status_code, 400)
        self.assertIn('error', response.get_json())

    def test_recommendation_logic_edge_case_no_preferences(self):
        response = self.client.post('/api/chatbot', json={'message': 'I have no preferences'})
        self.assertEqual(response.status_code, 200)
        self.assertIn('recommendation', response.get_json())

    def test_recommendation_logic_edge_case_multiple_preferences(self):
        response = self.client.post('/api/chatbot', json={'message': 'I like green tea and herbal tea'})
        self.assertEqual(response.status_code, 200)
        self.assertIn('recommendation', response.get_json())

    # Additional edge case tests
    def test_chatbot_api_long_message(self):
        long_message = 'Recommend me a tea ' * 1000  # Very long input
        response = self.client.post('/api/chatbot', json={'message': long_message})
        self.assertEqual(response.status_code, 400)
        self.assertIn('error', response.get_json())

    def test_chatbot_api_special_characters(self):
        response = self.client.post('/api/chatbot', json={'message': '!@#$%^&*()'})
        self.assertEqual(response.status_code, 400)
        self.assertIn('error', response.get_json())

    def test_chatbot_api_non_english_characters(self):
        response = self.client.post('/api/chatbot', json={'message': '推荐我一款茶'})
        self.assertEqual(response.status_code, 200)
        self.assertIn('recommendation', response.get_json())

    def test_chatbot_api_whitespace_message(self):
        response = self.client.post('/api/chatbot', json={'message': '   '})
        self.assertEqual(response.status_code, 400)
        self.assertIn('error', response.get_json())

if __name__ == '__main__':
    unittest.main()