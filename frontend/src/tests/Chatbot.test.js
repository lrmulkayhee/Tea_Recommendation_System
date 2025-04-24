import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Chatbot from '../components/Chatbot';

describe('Chatbot Component', () => {
  it('renders the chatbot input and send button', () => {
    render(<Chatbot />);
    expect(screen.getByPlaceholderText('Ask me about teas...')).toBeInTheDocument();
    expect(screen.getByText('Send')).toBeInTheDocument();
  });

  it('sends a message and displays the bot response', async () => {
    // Mock the fetch API
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ response: 'Try green tea!' }),
      })
    );

    render(<Chatbot />);

    // Simulate user input
    const input = screen.getByPlaceholderText('Ask me about teas...');
    fireEvent.change(input, { target: { value: 'Recommend me a tea' } });

    // Simulate clicking the send button
    fireEvent.click(screen.getByText('Send'));

    // Wait for the bot response to appear
    await waitFor(() => expect(screen.getByText('Try green tea!')).toBeInTheDocument());

    // Clean up mock
    global.fetch.mockClear();
  });

  it('handles empty input gracefully', () => {
    render(<Chatbot />);
    const input = screen.getByPlaceholderText('Ask me about teas...');
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.click(screen.getByText('Send'));
    expect(screen.queryByText('Bot:')).not.toBeInTheDocument();
  });
});