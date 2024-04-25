import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom';

// Mock 'react-datepicker'
vi.mock('react-datepicker', () => ({
  __esModule: true,
  default: ({ selected, onChange }) => (
    <input
      type="text"
      value={selected ? selected.toISOString().substring(0, 10) : ''}
      onChange={(e) => onChange(new Date(e.target.value))}
      data-testid="date-picker" // Adding a test id for easy access in tests
    />
  ),
}));

import ReservationPage from './ReservationPage.jsx';

describe('ReservationPage', () => {
  let fetchMock;

  beforeEach(() => {
    fetchMock = vi.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ reservation_number: '123ABC' }),
      })
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders correctly', () => {
    render(<ReservationPage />);
    expect(screen.getByText(/Table Reservation/i)).toBeInTheDocument();
    expect(screen.getByText(/Reserve/i)).toBeInTheDocument();
  });

  it('submits the form with valid data', async () => {
    render(<ReservationPage />);
    
    await act(async () => {
      // Set date
      const datePicker = screen.getByTestId('date-picker');
      fireEvent.change(datePicker, { target: { value: '2024-04-25' } });
    
      // Set time
      const timeSelect = screen.getByDisplayValue('11:00'); 
      fireEvent.change(timeSelect, { target: { value: '11:30' } });
    
      // Set name and email
      fireEvent.change(screen.getByPlaceholderText(/name/i), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'john@example.com' } });
    
      // Set number of guests
      const guestsSelect = screen.getByLabelText(/Number of Guests/i);
      fireEvent.change(guestsSelect, { target: { value: '2' } });
    
      // Submit the form
      fireEvent.click(screen.getByRole('button', { name: /reserve/i }));
    });
  
    // Assertions can be outside of act since waitFor already handles the awaiting of expectations
    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalled();
    }, {
      timeout: 5000 // Extending timeout to ensure fetch has enough time to be called
    });
  });
  

  it('validates inputs before submitting', async () => {
    render(<ReservationPage />);

    // Attempt to submit the form without filling in any details
    fireEvent.click(screen.getByRole('button', { name: /reserve/i }));

    // Wait to check if the fetch was not called since the form shouldn't be submitted due to validation
    await waitFor(() => {
      expect(fetchMock).not.toHaveBeenCalled();
    });
  });

  it('allows the user to select the number of guests', () => {
    render(<ReservationPage />);

    fireEvent.change(screen.getByLabelText(/Number of Guests/i), {
      target: { value: '3' },
    });

    expect(screen.getByLabelText(/Number of Guests/i)).toHaveValue('3');
  });
  
});
