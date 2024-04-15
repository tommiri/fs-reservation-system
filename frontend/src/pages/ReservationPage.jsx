import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
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
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [guests, setGuests] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const numberOfGuests = Number(guests) || 1; // Default to 1 if not a number

    // Construct the reservation object
    const reservationDetails = {
      customerName: name,
      customerEmail: email,
      customerCount: numberOfGuests,
      reservationDatetime: selectedDate.toISOString().slice(0, 19).replace('T', ' ')
    };

    console.log(reservationDetails)

    try {
      const response = await fetch('http://localhost:5003/reservations', {
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
      console.log('Reservation successful:', result);
      alert('Reservation submitted successfully!');
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      alert('Failed to submit reservation. Please try again.');
    }
  };

  return (
    <Container>
      <h2>Table Reservation</h2>
      <Form onSubmit={handleSubmit}>
        <StyledDatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          minDate={new Date()}
          dateFormat="MMMM d, yyyy"
        />
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
