import styled from 'styled-components';
import type { RoverName } from '../../types/nasa';

interface RoverSelectorProps {
  selectedRover: RoverName;
  handleRoverChange: (rover: RoverName) => void;
}

const RoverSelectorContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;

  @media (max-width: 520px) {
    flex-direction: column;
  }
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
    color: #121212;
  }
`;

const rovers: RoverName[] = ['curiosity', 'opportunity', 'spirit'];

const RoverSelector = ({ selectedRover, handleRoverChange }: RoverSelectorProps) => (
  <RoverSelectorContainer>
    {rovers.map((rover) => (
      <RoverButton
        key={rover}
        type="button"
        onClick={() => handleRoverChange(rover)}
        className={selectedRover === rover ? 'selected' : ''}
        aria-pressed={selectedRover === rover}
      >
        {rover.charAt(0).toUpperCase() + rover.slice(1)}
      </RoverButton>
    ))}
  </RoverSelectorContainer>
);

export default RoverSelector;
