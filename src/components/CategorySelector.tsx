import styled from 'styled-components';
import type { Category } from '../types/nasa';

interface CategorySelectorProps {
  selectedCategory: Category;
  handleCategoryChange: (category: Category) => void;
}

const CategorySelectorContainer = styled.nav`
  display: flex;
  justify-content: space-around;
  margin: 0 auto 20px;
  padding: 10px;
  background-color: #1e1f22;
  border-radius: 8px;

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
    color: #121212;
  }

  @media (max-width: 768px) {
    margin: 5px 0;
  }
`;

const categories: Array<{ label: string; value: Category }> = [
  { label: 'Galeria de Imagens Espaciais', value: 'gallery' },
  { label: 'Exploracao de Marte', value: 'mars' },
  { label: 'Imagem por Data', value: 'date-image' },
];

const CategorySelector = ({
  selectedCategory,
  handleCategoryChange,
}: CategorySelectorProps) => (
  <CategorySelectorContainer aria-label="Categorias">
    {categories.map((category) => (
      <CategoryButton
        key={category.value}
        type="button"
        onClick={() => handleCategoryChange(category.value)}
        className={selectedCategory === category.value ? 'selected' : ''}
        aria-pressed={selectedCategory === category.value}
      >
        {category.label}
      </CategoryButton>
    ))}
  </CategorySelectorContainer>
);

export default CategorySelector;
