import React, { useState } from 'react';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        if (input.trim()) {
            // Add user message to the chat
            setMessages([...messages, { text: input, sender: 'user' }]);
            setInput('');
            setLoading(true);

            try {
                // Fetch chatbot response from the backend
                const response = await fetch('/api/chatbot', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message: input }),
                });

                const data = await response.json();
                if (response.ok) {
                    // Add chatbot response to the chat
                    setMessages((prevMessages) => [
                        ...prevMessages,
                        { text: data.response, sender: 'bot' },
                    ]);
                } else {
                    // Handle error response
                    setMessages((prevMessages) => [
                        ...prevMessages,
                        { text: 'Sorry, I couldn’t process your request.', sender: 'bot' },
                    ]);
                }
            } catch (error) {
                // Handle network or server errors
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { text: 'An error occurred. Please try again later.', sender: 'bot' },
                ]);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto', border: '1px solid #ccc', borderRadius: '8px' }}>
            <div style={{ height: '300px', overflowY: 'auto', marginBottom: '10px', border: '1px solid #ddd', padding: '10px' }}>
                {messages.map((message, index) => (
                    <div key={index} style={{ textAlign: message.sender === 'user' ? 'right' : 'left', margin: '5px 0' }}>
                        <span
                            style={{
                                display: 'inline-block',
                                padding: '10px',
                                borderRadius: '10px',
                                backgroundColor: message.sender === 'user' ? '#d1e7dd' : '#f8d7da',
                                color: '#000',
                            }}
                        >
                            {message.text}
                        </span>
                    </div>
                ))}
                {loading && (
                    <div style={{ textAlign: 'left', margin: '5px 0' }}>
                        <span
                            style={{
                                display: 'inline-block',
                                padding: '10px',
                                borderRadius: '10px',
                                backgroundColor: '#f8d7da',
                                color: '#000',
                            }}
                        >
                            Typing...
                        </span>
                    </div>
                )}
            </div>
            <div style={{ display: 'flex' }}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                    placeholder="Type your message..."
                />
                <button
                    onClick={handleSend}
                    style={{
                        marginLeft: '10px',
                        padding: '10px 20px',
                        borderRadius: '4px',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        border: 'none',
                    }}
                    disabled={loading}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chatbot;