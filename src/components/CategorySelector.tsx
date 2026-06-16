import styled from 'styled-components';
import type { Category } from '../types/nasa';

interface CategorySelectorProps {
  selectedCategory: Category;
  handleCategoryChange: (category: Category) => void;
}

const CategorySelectorContainer = styled.nav`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin: 24px auto;
  padding: 12px;
  background-color: rgba(30, 31, 34, 0.6);
  backdrop-filter: blur(8px);
  border-radius: 50px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  max-width: fit-content;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    border-radius: 16px;
  }
`;

const CategoryButton = styled.button`
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  padding: 12px 24px;
  background-color: transparent;
  color: #a0a0a0;
  border: none;
  border-radius: 30px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    color: #fff;
    background-color: rgba(255, 255, 255, 0.05);
  }

  &.selected {
    background-color: #bb86fc;
    color: #121212;
    box-shadow: 0 4px 15px rgba(187, 134, 252, 0.4);
  }

  @media (max-width: 768px) {
    width: 100%;
    margin: 4px 0;
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
