import React, { useState } from 'react';

const Quiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [recommendations, setRecommendations] = useState(null);

    const questions = [
        { id: 1, text: 'What is your preferred tea type?', options: ['Green', 'Black', 'Herbal', 'Oolong'] },
        { id: 2, text: 'Do you like your tea sweetened?', options: ['Yes', 'No'] },
        { id: 3, text: 'What time of day do you usually drink tea?', options: ['Morning', 'Afternoon', 'Evening'] },
    ];

    const handleAnswer = (answer) => {
        setAnswers({ ...answers, [questions[currentQuestion].id]: answer });
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            fetchRecommendations();
        }
    };

    const fetchRecommendations = async () => {
        try {
            const response = await fetch('http://localhost:5000/recommendations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(answers),
            });
            const data = await response.json();
            setRecommendations(data);
        } catch (error) {
            console.error('Error fetching recommendations:', error);
        }
    };

    return (
        <div>
            {recommendations ? (
                <div>
                    <h2>Your Tea Recommendations</h2>
                    <ul>
                        {recommendations.map((rec, index) => (
                            <li key={index}>{rec}</li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div>
                    <h2>{questions[currentQuestion].text}</h2>
                    {questions[currentQuestion].options.map((option, index) => (
                        <button key={index} onClick={() => handleAnswer(option)}>
                            {option}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Quiz;