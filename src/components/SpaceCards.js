import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import loadingGif from '../assets/loading.gif'

const CardContainer = styled.div`
  margin: 20px;
  padding: 10px;
  //border: 1px solid #ccc;
  border-radius: 8px;
  text-align: center;
  display: inline-block; /* Adicione esta linha para ocupar apenas parte da linha */
  min-width: 350px; /* Defina o tamanho mínimo dos cards */
  min-height: 400px; /* Defina o tamanho mínimo dos cards */
  max-width: 350px; /* Defina o tamanho máximo dos cards */
  max-height: 400px; /* Defina o tamanho máximo dos cards */
  overflow: hidden;
  transition: width 0.3s, height 0.3s; /* Adicione uma transição para animar a mudança de tamanho */
  overflow-y: auto; /* Adicione scroll vertical */
  //background-color: #1d1d1d;
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
  font-size: 12px;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  max-height: 100vh;
`;

const LoadingImage = styled.img`
  width: 100px; /* Ajuste o tamanho conforme necessário */
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
    const [expandedCard, setExpandedCard] = useState(null);
    const [visibleCards, setVisibleCards] = useState(20);
    const [loaded, setLoaded] = useState(false); // Adicionando o estado loaded

    useEffect(() => {
        // Verificando se a categoria é 'gallery' antes de carregar os dados
        if (category === 'gallery' && !loaded) {
            const fetchSpaceData = async () => {
                try {
                    const response = await axios.get(
                        'https://api.nasa.gov/planetary/apod?api_key=YKLQnPmppobspjAUnmZ63vnKrvfsHgiwbtmiTNNG&count=21'
                    );
                    setSpaceData(response.data);
                    setLoaded(true); // Atualizando o estado loaded
                } catch (error) {
                    console.error(error);
                }
            };

            fetchSpaceData();
        }
    }, [category, loaded]);

    if (!spaceData) {
        return (
            <Container>
                <LoadingImage src={loadingGif} alt="Loading..." />
            </Container>
        );
    }

    const handleCardClick = (index) => {
        setExpandedCard(index === expandedCard ? null : index);
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

    if (category !== 'gallery' || !loaded) {
        return null; // Retorna null se a categoria não for a correta ou os dados ainda não foram carregados
    }


    return (
        <>
            <CardWrapper>
                {spaceData.slice(0, visibleCards).map((item, index) => (
                    <CardContainer
                        key={index}
                        style={{
                            width: expandedCard === index ? '100%' : '150px',
                            height: expandedCard === index ? 'auto' : '150px',
                        }}
                    >
                        <SpaceImage src={item.url} alt={item.title} onClick={() => handleCardClick(index)} />
                        <SpaceTitle>{item.title}</SpaceTitle>
                        {expandedCard === index && <SpaceDescription>{item.explanation}</SpaceDescription>}
                    </CardContainer>
                ))}
            </CardWrapper>
            {visibleCards < spaceData.length && (
                <LoadMoreButton onClick={handleLoadMore}>Carregar Mais</LoadMoreButton>
            )}
        </>
    );
};

export default SpaceCards;