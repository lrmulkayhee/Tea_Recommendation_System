from flask import Flask, send_from_directory
from routes import register_routes

def create_app():
    app = Flask(__name__, static_folder='../tea-recommendation-system-frontend/build', static_url_path='/')
    
    # Load configurations if any
    app.config['SECRET_KEY'] = 'your_secret_key'
    
    # Register routes
    register_routes(app)
    
    @app.route('/')
    def index():
        return send_from_directory(app.static_folder, 'index.html')
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)