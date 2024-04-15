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

  // Remove spinner from number input
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
  const handleSubmit = (event) => {
    event.preventDefault();
    const reservationCode = event.target.elements[0].value;
    console.log(reservationCode);
  };

  return (
    <Container>
      <h2>Manage Reservations</h2>
      <Form onSubmit={handleSubmit}>
        <p>Enter reservation code to Edit</p>
        <StyledInput type="text" placeholder="Reservation code" />
        <StyledButton type="submit">Search</StyledButton>
      </Form>
    </Container>
  );
}
