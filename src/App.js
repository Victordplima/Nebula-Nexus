import React, { useState } from 'react';
import AstronomyPictureOfTheDay from './components/AstronomyPictureOfTheDay';
import SpaceCards from './components/SpaceCards';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    background-color: #121212;
    color: #fff; /* Define a cor do texto para contrastar com o fundo */
  }
`;

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState('gallery'); // Padrão: Galeria

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <GlobalStyle />
      <div>
        <h1>Daily Image</h1>
        <AstronomyPictureOfTheDay />
      </div>
      <div>
        <button onClick={() => handleCategoryChange('gallery')}>Galeria de Imagens Espaciais</button>
        <button onClick={() => handleCategoryChange('mars')}>Exploração de Marte</button>
        <h1>{selectedCategory === 'gallery' ? 'Galeria de Imagens Espaciais' : 'Exploração de Marte'}</h1>
        <SpaceCards category={selectedCategory} />
      </div>
    </>
  );
};

export default App;
