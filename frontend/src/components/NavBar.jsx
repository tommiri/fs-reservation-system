import React from "react";
import NavItem from "./NavItem";
import styled from "styled-components";

const Container = styled.nav`
  display: flex;
  padding: 1rem 0;
  width: 100%;
  background-color: #4CAF50;
`;

const NavContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
`;

const NavBar = () => {
  return (
    <Container>
      <NavContainer>
        <NavItem name="Home" to="/" />
        <NavItem name="Reservation" to="/reservation" />
        <NavItem name="Manage" to="/manage" />
      </NavContainer>
    </Container>
  );
};

export default NavBar;
