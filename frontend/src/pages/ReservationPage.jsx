import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 300px;
`;

const ReservationPage = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [guests, setGuests] = useState(1);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Process reservation data here
      console.log('Reservation details:', { selectedDate, name, email, guests });
      alert('Reservation submitted!');
    };
  
    return (
      <Container>
        <h2>Table Reservation</h2>
        <Form onSubmit={handleSubmit}>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            minDate={new Date()}
            dateFormat="MMMM d, yyyy"
          />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="number"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            placeholder="Number of Guests"
            min="1"
            required
          />
          <button type="submit">Reserve Table</button>
        </Form>
      </Container>
    );
  };
  
  export default ReservationPage;
  