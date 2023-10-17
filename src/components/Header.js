import React from 'react';
import styled from 'styled-components';
import logo from '../assets/logoEscrita.png'

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1e1f22;
  padding: 10px 20px;
`;

const Logo = styled.img`
  max-height: 50px;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Logo src={logo} alt="Logo" />
    </HeaderContainer>
  );
};

export default Header;
