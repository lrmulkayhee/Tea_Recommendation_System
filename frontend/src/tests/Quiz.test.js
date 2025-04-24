import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Quiz from '../components/Quiz';

describe('Quiz Component', () => {
  it('renders the quiz questions', () => {
    render(<Quiz />);
    expect(screen.getByText('What type of tea do you prefer?')).toBeInTheDocument();
  });

  it('allows users to select answers and submit the quiz', () => {
    render(<Quiz />);

    // Simulate selecting an answer
    const option = screen.getByLabelText('Green Tea');
    fireEvent.click(option);
    expect(option).toBeChecked();

    // Simulate submitting the quiz
    fireEvent.click(screen.getByText('Submit'));
    expect(screen.getByText('Fetching recommendations...')).toBeInTheDocument();
  });

  it('displays recommendations after quiz submission', async () => {
    // Mock the fetch API
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ recommendations: ['Green Tea', 'Herbal Tea'] }),
      })
    );

    render(<Quiz />);

    // Simulate submitting the quiz
    fireEvent.click(screen.getByText('Submit'));

    // Wait for recommendations to appear
    await waitFor(() => expect(screen.getByText('Green Tea')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Herbal Tea')).toBeInTheDocument());

    // Clean up mock
    global.fetch.mockClear();
  });
});