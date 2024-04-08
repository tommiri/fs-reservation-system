import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ReservationPage from './ReservationPage.jsx';


describe('ReservationPage', () => {
  it('renders correctly', () => {
    render(<ReservationPage />);
    expect(screen.getByText(/Table Reservation/i)).toBeInTheDocument();
  });

  it('submits the form with valid data', async () => {
    const consoleSpy = vi.spyOn(console, 'log');
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

    render(<ReservationPage />);

    fireEvent.change(screen.getByPlaceholderText(/name/i), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: 'john@example.com' },
    });
 
    fireEvent.change(screen.getByText(/Number of Guests/i), {
      target: { value: '2' },
    });
    fireEvent.click(screen.getByRole('button', { name: /reserve table/i }));

    expect(consoleSpy).toHaveBeenCalledWith('Reservation details:', expect.anything());
    expect(alertSpy).toHaveBeenCalledWith('Reservation submitted!');

    consoleSpy.mockRestore();
    alertSpy.mockRestore();
  });

  it('validates inputs before submitting', () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

    render(<ReservationPage />);

    // Attempt to submit the form without filling in any details
    fireEvent.click(screen.getByRole('button', { name: /reserve table/i }));

    // Check if the alert is not called since the form shouldn't be submitted due to validation
    expect(alertSpy).not.toHaveBeenCalled();

    alertSpy.mockRestore();
  });

  it('allows the user to select the number of guests', () => {
    render(<ReservationPage />);

    // Select a number of guests
    fireEvent.change(screen.getByText(/number of guests/i), {
      target: { value: '3' },
    });

    expect(screen.getByText(/number of guests/i)).toHaveValue('3');
  });
/*
  it('resets the form fields after successful submission', () => {
    const consoleSpy = vi.spyOn(console, 'log');
    render(<ReservationPage />);

    fireEvent.change(screen.getByPlaceholderText(/name/i), {
      target: { value: 'Jane Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: 'jane@example.com' },
    });
    fireEvent.change(screen.getByText(/number of guests/i), {
      target: { value: '4' },
    });
    fireEvent.click(screen.getByRole('button', { name: /reserve table/i }));

    // Assuming your component resets state after submission
    expect(screen.getByPlaceholderText(/name/i)).toHaveValue('');
    expect(screen.getByPlaceholderText(/email/i)).toHaveValue('');
    expect(screen.getByText(/number of guests/i)).toHaveValue('');

    consoleSpy.mockRestore();
  });*/
});
