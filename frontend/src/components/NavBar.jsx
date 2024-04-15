import React from 'react';
import styled from 'styled-components';

import NavItem from './NavItem';
import { useNavigate } from 'react-router-dom';

const Container = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #272727;
  box-shadow: 0 0 10px 0 #00000060;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  align-items: center;
`;

const NavContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
  width: 321px;
  max-height: 61px;
  margin-top: 4px;
`;

const LogoContainer = styled.div`
  cursor: pointer;
`;

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <LogoContainer
        onClick={() => {
          navigate('/');
        }}
      >
        <Image src="./public/logo.png" alt="logo" />
      </LogoContainer>
      <NavContainer>
        <NavItem name="Book a Table" to="/reservation" />
        <NavItem name="View your Reservation" to="/manage" />
      </NavContainer>
    </Container>
  );
};

export default NavBar;
