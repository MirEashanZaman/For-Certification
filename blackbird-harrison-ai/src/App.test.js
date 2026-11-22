import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App Form Validation', () => {
  test('shows error messages when submitting invalid email and password', () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'invalid-email' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'short' },
    });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
    expect(screen.getByText(/password must contain/i)).toBeInTheDocument();
    expect(screen.queryByText(/validation passed/i)).not.toBeInTheDocument();
  });

  test('shows success snackbar when submitting valid email and password', () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'SecureP@ss1' },
    });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(screen.getByText(/validation passed/i)).toBeInTheDocument();
  });
});
