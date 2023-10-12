import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

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
  background-color: #1d1d1d;
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

const SpaceCards = () => {
    const [spaceData, setSpaceData] = useState(null);
    const [expandedCard, setExpandedCard] = useState(null);

    useEffect(() => {
        const fetchSpaceData = async () => {
            try {
                const response = await axios.get(
                    'https://api.nasa.gov/planetary/apod?api_key=YKLQnPmppobspjAUnmZ63vnKrvfsHgiwbtmiTNNG&count=20'
                );
                setSpaceData(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchSpaceData();
    }, []);

    if (!spaceData) {
        return <div>Loading...</div>;
    }

    const handleCardClick = (index) => {
        setExpandedCard(index === expandedCard ? null : index);
    };

    return (
        <CardWrapper>
            {spaceData.map((item, index) => (
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
    );
};

export default SpaceCards;
