import React, { useState } from 'react';
import styled from 'styled-components';
import ClipLoader from 'react-spinners/ClipLoader';

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
  margin-top: 20px;
  box-shadow: 0 0 10px 0 #00000060;
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

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
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

  &:hover {
    background-color: #444;
  }
`;

export default function ManageReservations() {
  const [reservationDetails, setReservationDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const reservationCode = event.target.elements[0].value;

    try {
      setIsLoading(true);
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/reservations/${reservationCode}`);
      if (!response.ok) {
        throw new Error('Failed to fetch reservation details');
      }
      const data = await response.json();
      setReservationDetails(data);
      setError('');
    } catch (error) {
      console.error('Error fetching reservation:', error);
      setError('Failed to fetch reservation details. Please try again.');
      setReservationDetails(null);
    }
    setIsLoading(false);
  };

  return (
    <Container>
      <h2>Manage Reservations</h2>
      <Form onSubmit={handleSubmit}>
        <p>Enter reservation code to Edit:</p>
        <StyledInput type="text" placeholder="Reservation code" />
        <div style={{ alignSelf: 'center', marginTop: 2 }}>
          {isLoading && <ClipLoader color="#36d7b7" />}
        </div>
        <StyledButton type="submit">Search</StyledButton>
      </Form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {reservationDetails && (
        <Form>
          <h3 style={{ marginBottom: 20 }}>Your reservation details:</h3>
          <p>
            <strong>Reservation Number:</strong>{' '}
            {reservationDetails.reservation_number}
          </p>
          <p>
            <strong>Name:</strong> {reservationDetails.customer_name}
          </p>
          <p>
            <strong>Email:</strong> {reservationDetails.customer_email}
          </p>
          <p>
            <strong>Number of Guests:</strong>{' '}
            {reservationDetails.customer_count}
          </p>
          <p>
            <strong>Date and Time:</strong>{' '}
            {reservationDetails.reservation_datetime}
          </p>
          <h4 style={{ marginTop: 20 }}>
            Do you wish to edit or cancel the reservation?
          </h4>
          <div style={{ marginTop: 10 }}>
            <p> nappulat tänne</p>
          </div>
        </Form>
      )}
    </Container>
  );
}
