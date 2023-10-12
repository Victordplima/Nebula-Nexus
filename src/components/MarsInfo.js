import React, { useState } from 'react';
import styled from 'styled-components';
import RoverSelector from './RoverSelector';
import MarsCards from './MarsCards';

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
                <h2>Exploração de Marte</h2>
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
