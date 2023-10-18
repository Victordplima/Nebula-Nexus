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

  @media (max-width: 768px) {
    margin: 5px 0;
  }
`;

const CategorySelector = ({ selectedCategory, handleCategoryChange }) => {
  return (
    <CategorySelectorContainer>
      <CategoryButton
        onClick={() => handleCategoryChange('gallery')}
        className={selectedCategory === 'gallery' ? 'selected' : ''}
      >
        Galeria de Imagens Espaciais
      </CategoryButton>
      <CategoryButton
        onClick={() => handleCategoryChange('mars')}
        className={selectedCategory === 'mars' ? 'selected' : ''}
      >
        Exploração de Marte
      </CategoryButton>
      <CategoryButton
        onClick={() => handleCategoryChange('date-image')}
        className={selectedCategory === 'date-image' ? 'selected' : ''}
      >
        Imagem por Data
      </CategoryButton>
    </CategorySelectorContainer >
  );
};


export default CategorySelector;
