import React from 'react';
import styled from 'styled-components';

const CategorySelectorContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 0 auto;
  padding: 10px;
  background-color: #1e1f22;
  border-radius: 8px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const CategoryButton = styled.button`
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  width: 100%;
  padding: 10px 20px;
  background-color: #b5bac1;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin: 5px;

  &:hover {
    background-color: #555;
  }

  &.selected {
    background-color: #ffffff;
  }

  @media (max-width: 768px) {
    margin: 5px 0;
  }
`;

const CategorySelector = ({ selectedCategory, handleCategoryChange }) => {
  return (
    <CategorySelectorContainer>
      <CategoryButton
        onClick={() => handleCategoryChange('gallery')}
        style={{ backgroundColor: selectedCategory === 'gallery' ? '#BB86FC' : '#666' }}
      >
        Galeria de Imagens Espaciais
      </CategoryButton>
      <CategoryButton
        onClick={() => handleCategoryChange('mars')}
        style={{ backgroundColor: selectedCategory === 'mars' ? '#BB86FC' : '#666' }}
      >
        Exploração de Marte
      </CategoryButton>
      <CategoryButton
        onClick={() => handleCategoryChange('date-image')}
        style={{ backgroundColor: selectedCategory === 'date-image' ? '#BB86FC' : '#666' }}
      >
        Imagem por Data
      </CategoryButton>
    </CategorySelectorContainer >
  );
};

export default CategorySelector;
