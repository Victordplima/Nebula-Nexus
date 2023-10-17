import React, { useState } from 'react';
import styled from 'styled-components';
import RoverSelector from './RoverSelector';
import MarsCards from './MarsCards';

const RoverTitle = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Roboto', sans-serif;
  font-size: 22px;
  padding-bottom: 16px;
`
const MarsInfoContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #333;
  border-radius: 8px;
  margin-bottom: 20px;
  color: #fff;
`;

const MarsInfo = () => {
    const [selectedRover, setSelectedRover] = useState('curiosity');

    const handleRoverChange = (rover) => {
        setSelectedRover(rover);
    };

    return (
        <>
            <MarsInfoContainer>
                <RoverTitle>Selecione um rover</RoverTitle>
                <RoverSelector
                    selectedRover={selectedRover}
                    handleRoverChange={handleRoverChange}
                />
            </MarsInfoContainer>
            <MarsCards rover={selectedRover} limit={20} />
        </>
    );
};

export default MarsInfo;
