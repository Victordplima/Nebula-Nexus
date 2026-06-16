import { useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import AstronomyPictureOfTheDay from './components/ImageByDate/AstronomyPictureOfTheDay';
import CategorySelector from './components/CategorySelector';
import SpaceCards from './components/Gallery/SpaceCards';
import Header from './components/Header';
import MarsInfo from './components/Mars/MarsInfo';
import AstronomyImageByDate from './components/ImageByDate/AstronomyImageByDate';
import type { Category } from './types/nasa';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: radial-gradient(circle at top, #1a1a2e 0%, #121212 100%);
    background-attachment: fixed;
    color: #fff;
    font-family: 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #121212;
  }

  ::-webkit-scrollbar-thumb {
    background: #bb86fc;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #9965f4;
  }

  button,
  input {
    font: inherit;
  }
`;

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('gallery');

  return (
    <>
      <GlobalStyle />
      <Header />
      <AstronomyPictureOfTheDay />
      <CategorySelector
        selectedCategory={selectedCategory}
        handleCategoryChange={setSelectedCategory}
      />
      {selectedCategory === 'gallery' && <SpaceCards category={selectedCategory} />}
      {selectedCategory === 'mars' && <MarsInfo />}
      {selectedCategory === 'date-image' && <AstronomyImageByDate />}
    </>
  );
};

export default App;
