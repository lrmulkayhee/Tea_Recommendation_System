from flask import Flask, jsonify, request
from backend.routes import register_routes

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'your_secret_key'
    register_routes(app)
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)