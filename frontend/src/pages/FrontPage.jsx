import styled from "styled-components";

const Container = styled.div`
  margin: 0 10px;
  padding: 0.5rem 1rem;
`;
export default function FrontPage() {
  return (
    <Container>
      <h1>Welcome to ...</h1>
      <p>
        This is the front page of the reservation system. Use the navigation bar
        to navigate to the reservation page or the management page.
      </p>
    </Container>
  );
}
