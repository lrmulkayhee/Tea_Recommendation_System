# Tea Recommendation System

This project is a tea recommendation system that utilizes a dataset of various teas to provide personalized recommendations based on user preferences. It includes both a backend built with Flask and a frontend built with React.

## Project Structure

```
tea-recommendation-system
├── backend
│   ├── app.py                # Entry point of the backend application
│   ├── models.py             # Data models for the tea database
│   ├── routes.py             # Route definitions for the backend application
│   ├── services
│   │   └── recommendation_service.py  # Logic for the tea recommendation system
│   ├── static
│   │   └── teas_test.csv     # Dataset used for tea recommendations
│   └── tests                 # Backend tests
│       ├── test_app.py       # Tests for the backend application
│       └── test_models.py    # Tests for the data models
├── frontend
│   ├── src                   # React source files
│   ├── public                # Public assets
│   ├── package.json          # Frontend dependencies and scripts
│   ├── .babelrc              # Babel configuration
│   └── tests                 # Frontend tests
│       └── test_app.js       # Tests for the frontend application
├── requirements.txt          # Backend project dependencies
├── .gitignore                # Git ignore file
└── README.md                 # Project documentation
```

## Setup Instructions

### Backend

1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd tea-recommendation-system/backend
   ```

2. Install the required dependencies:
   ```sh
   pip install -r requirements.txt
   ```

3. Run the backend application:
   ```sh
   python app.py
   ```

### Frontend

1. Navigate to the frontend directory:
   ```sh
   cd ../frontend
   ```

2. Install the required dependencies:
   ```sh
   npm install
   ```

3. Run the frontend application:
   ```sh
   npm start
   ```

## Usage

Once the application is running, you can access the tea recommendation system through your web browser. The system will allow you to input your preferences and receive personalized tea recommendations.

## Overview

The tea recommendation system is designed to help users discover new teas based on their tastes and preferences. By analyzing the dataset in `teas_test.csv`, the application provides tailored suggestions to enhance your tea-drinking experience.