import styled from 'styled-components';

const Container = styled.div`
  margin: 0 10px;
  padding: 3rem 1rem;
  text-align: center;
  margin-top: 60px;
`;
export default function FrontPage() {
  return (
    <Container>
      <h1>Welcome to SomeCoolDiner</h1>

      <p style={{ marginTop: '2rem' }}>
        This is the front page of the reservation system. Use the
        navigation bar to navigate to the reservation page or the
        management page.
      </p>
    </Container>
  );
}
