import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Container = styled.div`
  margin: 0 10px;
  border-radius: 5px;
  padding: 0.5rem 1rem;
`;
const StyledNavLink = styled(NavLink)`
  color: white;
  font-size: 1.5rem;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  position: relative;
  text-decoration: none;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0%;
    height: 2px;
    background-color: gray; /* Change to your desired color */
    transition: width 0.3s ease; /* Adjust the transition duration as needed */
  }

  &:hover {
    color: lightgray; /* Change to your desired hover color */
  }

  &:hover::before {
    width: 100%;
  }
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
