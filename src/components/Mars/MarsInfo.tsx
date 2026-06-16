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
  margin: 0 auto 20px;
  padding: 20px;
  background-color: #333;
  border-radius: 8px;
  color: #fff;
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
