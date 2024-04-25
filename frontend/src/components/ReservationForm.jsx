import React from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ClipLoader from 'react-spinners/ClipLoader';

const formBackground = '#333';
const textColor = '#FFF';

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

//type: "create" | "edit"
const ReservationForm = ({
  handleSubmit,
  formData,
  setFormData,
  type,
  isLoading,
}) => {
  const timeOptions = Array.from({ length: 25 }, (_, index) => {
    const hour = Math.floor(index / 2) + 11; // Start from 11 AM
    const minute = index % 2 === 0 ? '00' : '30';
    if (hour < 23) {
      // Only show times up to 23:30
      return `${hour}:${minute}`;
    }
    return null;
  }).filter(Boolean);

  return (
    <Form onSubmit={handleSubmit}>
      <StyledDatePicker
        selected={formData.selectedDate}
        onChange={(date) =>
          setFormData({ ...formData, selectedDate: date })
        }
        minDate={new Date()}
        dateFormat="MMMM d, yyyy"
        name="reservation_date"
      />
      <StyledSelect
        value={formData.selectedTime}
        onChange={(e) =>
          setFormData({ ...formData, selectedTime: e.target.value })
        }
        name="reservation_time"
      >
        {timeOptions.map((time, index) => (
          <option key={index} value={time}>
            {time}
          </option>
        ))}
      </StyledSelect>
      <StyledInput
        type="text"
        value={formData.name}
        onChange={(e) =>
          setFormData({ ...formData, name: e.target.value })
        }
        name="customer_name"
        placeholder="Name"
        required
      />
      <StyledInput
        type="email"
        value={formData.email}
        onChange={(e) =>
          setFormData({ ...formData, email: e.target.value })
        }
        name="customer_email"
        placeholder="Email"
        required
      />
      <label htmlFor="guests">Number of Guests</label>
      <StyledSelect
        id="guests"
        value={formData.guests}
        onChange={(e) =>
          setFormData({ ...formData, guests: e.target.value })
        }
        name="customer_count"
        required
      >
        <option disabled value="">
          Number of Guests
        </option>
        {[...Array(8).keys()].map((num) => (
          <option key={num} value={num + 1}>
            {num + 1}
          </option>
        ))}
      </StyledSelect>
      <div style={{ alignSelf: 'center' }}>
        {isLoading && <ClipLoader color="#36d7b7" />}
      </div>
      {type === 'create' ? (
        <StyledButton type="submit">Reserve Table</StyledButton>
      ) : (
        <StyledButton type="submit">Update Reservation</StyledButton>
      )}
    </Form>
  );
};

export default ReservationForm;
