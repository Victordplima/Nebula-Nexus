import React from 'react';
import styled from 'styled-components';

const RoverSelectorContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

const RoverButton = styled.button`
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  padding: 10px 20px;
  background-color: #555555;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #363636;
  }

  &.selected {
    background-color: #bb86fc;
  }
`;

const RoverSelector = ({ selectedRover, handleRoverChange }) => {
    return (
        <RoverSelectorContainer>
            <RoverButton
                onClick={() => handleRoverChange('curiosity')}
                className={selectedRover === 'curiosity' ? 'selected' : ''}
            >
                Curiosity
            </RoverButton>
            <RoverButton
                onClick={() => handleRoverChange('opportunity')}
                className={selectedRover === 'opportunity' ? 'selected' : ''}
            >
                Opportunity
            </RoverButton>
            <RoverButton
                onClick={() => handleRoverChange('spirit')}
                className={selectedRover === 'spirit' ? 'selected' : ''}
            >
                Spirit
            </RoverButton>
        </RoverSelectorContainer>
    );
};

export default RoverSelector;
