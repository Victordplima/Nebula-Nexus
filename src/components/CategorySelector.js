import React from 'react';

const CategorySelector = ({ onSelectCategory }) => {
  const categories = ['Galeria de Imagens Espaciais', 'Exploração de Marte'];

  return (
    <div>
      <h2>Escolha uma Categoria:</h2>
      <ul>
        {categories.map((category, index) => (
          <li key={index}>
            <button onClick={() => onSelectCategory(category)}>{category}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategorySelector;
