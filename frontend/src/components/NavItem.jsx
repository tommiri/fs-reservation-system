import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Container = styled.div`
  margin: 0 10px;
  background-color: white;
  border-radius: 5px;
  padding: 0.5rem 1rem;
`;
const StyledNavLink = styled(NavLink)`
  color: black;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
`;

const NavItem = ({ name, to }) => {
  return (
    <Container>
      <StyledNavLink to={to} activeClassName="active">
        {name}
      </StyledNavLink>
    </Container>
  );
};

export default NavItem;
