import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';

const darkBackground = '#262626';
const formBackground = '#333';
const textColor = '#FFF';

const Container = styled.div`
  background-color: ${darkBackground};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  height: 200vh;
  color: ${textColor};
  margin-top: 60px;
`;

const Form = styled.form`
  background-color: ${formBackground};
  display: flex;
  flex-direction: column;
  width: 400px;
  padding: 30px;
  box-shadow: 0 0 10px 0 #00000060;
  margin-top: 20px;
`;

const StyledInput = styled.input`
  background-color: ${formBackground};
  color: ${textColor};
  border: none;
  border-bottom: 1px solid ${textColor};
  margin: 10px 0;
  padding: 10px 0;
  font-size: 16px;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
    text-transform: uppercase;
  }

  // Remove spinner from number input
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const StyledDatePicker = styled(DatePicker)`
  background-color: ${formBackground};
  color: ${textColor};
  border: none;
  border-bottom: 1px solid ${textColor};
  margin: 10px 0;
  padding: 10px 0;
  font-size: 16px;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
    text-transform: uppercase;
  }
`;

const StyledButton = styled.button`
  background-color: ${formBackground};
  color: ${textColor};
  border: none;
  padding: 10px 0;
  margin: 20px 0 0;
  font-weight: bold;
  text-transform: uppercase;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
    text-transform: uppercase;
  }
`;

const StyledSelect = styled.select`
  background-color: ${formBackground};
  color: ${textColor};
  border: none;
  padding: 10px 0;
  border-bottom: 1px solid ${textColor};
  margin: 10px 0;
  font-size: 16px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  option[value=''][disabled] {
    color: rgba(255, 255, 255, 0.5);
  }

  // Style the rest of the options normally
  option:not([value='']) {
    color: ${textColor};
  }
`;

const ReservationPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('11:00'); // Default time
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [guests, setGuests] = useState('');

  // Generate time options for the select dropdown
  const timeOptions = Array.from({ length: 25 }, (_, index) => {
    const hour = Math.floor(index / 2) + 11; // Start from 11 AM
    const minute = index % 2 === 0 ? '00' : '30';
    if (hour < 23) {
      // Only show times up to 23:30
      return `${hour}:${minute}`;
    }
    return null;
  }).filter(Boolean);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const numberOfGuests = Number(guests) || 1; // Default to 1 if not a number

    // Create a new Date object from the selected date
    const dateTime = new Date(selectedDate);

    // Extract hours and minutes from the selected time
    const [hours, minutes] = selectedTime.split(':').map(Number);

    // Set the hours and minutes to the date object
    dateTime.setHours(hours, minutes, 0, 0); // Ensuring seconds and milliseconds are zero

    // Adjust for Finnish timezone (UTC+2 or UTC+3)
    const timezoneOffset = dateTime.getTimezoneOffset() + 420; // Finnish standard time offset in minutes
    dateTime.setMinutes(dateTime.getMinutes() - timezoneOffset);

    // Format the dateTime to a string expected by the server
    const formattedDateTime = dateTime
      .toISOString()
      .slice(0, 19)
      .replace('T', ' ');

    const reservationDetails = {
      customerName: name,
      customerEmail: email,
      customerCount: numberOfGuests,
      reservationDatetime: formattedDateTime, // Updated to use formattedDateTime
    };

    console.log('Final reservation details:', reservationDetails);

    const apiUrl = import.meta.env.VITE_API_URL;

    try {
      const response = await fetch(`${apiUrl}/reservations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationDetails),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      toast.success(
        `Reservation successful! Your reservation number is: ${result.reservationNumber}`
      );
    } catch (error) {
      console.error(
        'There was a problem with the fetch operation:',
        error
      );
      toast.error('Failed to submit reservation. Please try again.');
    }
  };

  return (
    <Container>
      <ToastContainer />
      <h2>Table Reservation</h2>
      <Form onSubmit={handleSubmit}>
        <StyledDatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          minDate={new Date()}
          dateFormat="MMMM d, yyyy"
        />
        <StyledSelect
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
        >
          {timeOptions.map((time, index) => (
            <option key={index} value={time}>
              {time}
            </option>
          ))}
        </StyledSelect>
        <StyledInput
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <StyledInput
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <StyledSelect
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          required
        >
          <option value="" disabled selected>
            Number of Guests
          </option>
          {[...Array(8).keys()].map((num) => (
            <option key={num} value={num + 1}>
              {num + 1}
            </option>
          ))}
        </StyledSelect>
        <StyledButton type="submit">Reserve Table</StyledButton>
      </Form>
    </Container>
  );
};

export default ReservationPage;
