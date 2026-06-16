import styled from 'styled-components';
import logo from '../assets/logoEscrita.png';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(30, 31, 34, 0.7);
  backdrop-filter: blur(12px);
  padding: 10px 20px;
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.img`
  max-height: 50px;
`;

const Header = () => (
  <HeaderContainer>
    <Logo src={logo} alt="Nebula Nexus" />
  </HeaderContainer>
);

export default Header;
