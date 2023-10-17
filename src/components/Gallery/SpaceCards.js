import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import loadingGif from '../../assets/loading.gif'
import imageError from '../../assets/imageError.png'
import ReactCardFlip from 'react-card-flip';

const CardContainer = styled.div`
  margin: 20px;
  padding: 10px;
  border-radius: 8px;
  text-align: center;
  display: inline-block;
  min-width: 350px;
  min-height: 400px;
  max-width: 350px; 
  max-height: 400px;
  overflow: hidden;
  transition: width 0.3s, height 0.3s;
  overflow-y: auto;
  background-color: #313338;
`;

const SpaceImage = styled.img`
  min-height: 300px;
  min-width: 300px;
  max-width: 300px;
  max-height: 300px;
  padding-top: 15px;
  padding-bottom: 15px;
  cursor: pointer;
  object-fit: cover;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: auto;
  margin: 0 auto;
`;

const SpaceTitle = styled.h3`
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  font-size: 18px;
`;

const SpaceDescription = styled.p`
  padding-top: 10px;
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  max-height: 100vh;
`;

const LoadingImage = styled.img`
  width: 100px;
  height: auto;
`;

const LoadMoreButton = styled.button`
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  background-color: #bb86fc;
  color: #121212;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #6200ea;
  }
`;

const SpaceCards = ({ category }) => {
    const [spaceData, setSpaceData] = useState(null);
    const [visibleCards, setVisibleCards] = useState(20);
    const [loaded, setLoaded] = useState(false);
    const [flipped, setFlipped] = useState(Array(20).fill(false));

    useEffect(() => {
        if (category === 'gallery' && !loaded) {
            const fetchSpaceData = async () => {
                try {
                    const response = await axios.get(
                        'https://api.nasa.gov/planetary/apod?api_key=YKLQnPmppobspjAUnmZ63vnKrvfsHgiwbtmiTNNG&count=21'
                    );
                    setSpaceData(response.data);
                    setLoaded(true);
                } catch (error) {
                    console.error(error);
                }
            };

            fetchSpaceData();
        }
    }, [category, loaded]);

    const handleCardClick = (index) => {
        const newFlipped = [...flipped];
        newFlipped[index] = !newFlipped[index];
        setFlipped(newFlipped);
    };

    const handleLoadMore = async () => {
        try {
            const response = await axios.get(
                'https://api.nasa.gov/planetary/apod?api_key=YKLQnPmppobspjAUnmZ63vnKrvfsHgiwbtmiTNNG&count=12'
            );
            setSpaceData((prevSpaceData) => [...prevSpaceData, ...response.data]);
            setVisibleCards((prevVisibleCards) => prevVisibleCards + 12);
        } catch (error) {
            console.error(error);
        }
    };

    if (!spaceData) {
        return (
            <Container>
                <LoadingImage src={loadingGif} alt="Loading..." />
            </Container>
        );
    }

    return (
        <>
            <CardWrapper>
                {spaceData.slice(0, visibleCards).map((item, index) => (
                    <ReactCardFlip
                        key={index}
                        isFlipped={flipped[index]}
                        flipDirection="horizontal"
                    >
                        <CardContainer
                            onClick={() => handleCardClick(index)}
                        >
                            <SpaceImage
                                src={item.url}
                                alt={item.title}
                                onError={(e) => { e.target.onerror = null; e.target.src = imageError; }}
                            />
                            <SpaceTitle>{item.title}</SpaceTitle>
                        </CardContainer>
                        <CardContainer
                            onClick={() => handleCardClick(index)}
                        >
                            <SpaceDescription>{item.explanation}</SpaceDescription>
                        </CardContainer>
                    </ReactCardFlip>
                ))}
            </CardWrapper>
            <LoadMoreButton onClick={handleLoadMore}>Carregar Mais</LoadMoreButton>
        </>
    );
};

export default SpaceCards;