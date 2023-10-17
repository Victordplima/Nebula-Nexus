import React, { useState } from 'react';
import AstronomyPictureOfTheDay from './components/ImageByDate/AstronomyPictureOfTheDay';
import CategorySelector from './components/CategorySelector';
import SpaceCards from './components/Gallery/SpaceCards';
import { createGlobalStyle } from 'styled-components';
import Header from './components/Header';
import MarsInfo from './components/Mars/MarsInfo';
import AstronomyImageByDate from './components/ImageByDate/AstronomyImageByDate';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    background-color: #121212;
    color: #fff;
  }
`;

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState('gallery');

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <GlobalStyle />
      <Header></Header>
      <div>
        <AstronomyPictureOfTheDay />
      </div>
      <div>
        <CategorySelector
          selectedCategory={selectedCategory}
          handleCategoryChange={handleCategoryChange}
        />
        {selectedCategory === 'gallery' ? (
          <SpaceCards category={selectedCategory} />
        ) : selectedCategory === 'mars' ? (
          <MarsInfo />
        ) : selectedCategory === 'date-image' ? (
          <AstronomyImageByDate />
        ) : null}
      </div>
    </>
  );
};

export default App;
