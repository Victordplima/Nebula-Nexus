import React from 'react';
import styled from 'styled-components';
import logo from '../assets/logoEscrita.png'

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  //background-color: #121212;
  background-color: #1e1f22;
  padding: 10px 20px;
`;

const Logo = styled.img`
  max-height: 50px; /* Ajuste conforme necessário */
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Logo src={logo} alt="Logo da sua aplicação" />
      {/* Adicione outros elementos do header aqui, se necessário */}
    </HeaderContainer>
  );
};

export default Header;
