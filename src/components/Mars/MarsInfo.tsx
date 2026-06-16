import { useState } from 'react';
import styled from 'styled-components';
import RoverSelector from './RoverSelector';
import MarsCards from './MarsCards';
import type { RoverName } from '../../types/nasa';

const RoverTitle = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Roboto', sans-serif;
  font-size: 22px;
  padding-bottom: 16px;
`;

const MarsInfoContainer = styled.section`
  max-width: 800px;
  margin: 20px auto 40px;
  padding: 24px;
  background-color: #1e1f22;
  border-radius: 16px;
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`;

const MarsInfo = () => {
  const [selectedRover, setSelectedRover] = useState<RoverName>('curiosity');

  return (
    <>
      <MarsInfoContainer>
        <RoverTitle>Selecione um rover</RoverTitle>
        <RoverSelector selectedRover={selectedRover} handleRoverChange={setSelectedRover} />
      </MarsInfoContainer>
      <MarsCards rover={selectedRover} />
    </>
  );
};

export default MarsInfo;
