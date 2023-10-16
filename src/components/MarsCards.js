import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import loadingGif from '../assets/loading.gif';

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

const RoverImage = styled.img`
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

const RoverPhotoTitle = styled.h3`
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  font-size: 18px;
`;

const RoverPhotoDescription = styled.p`
  padding-top: 10px;
  font-family: 'Roboto', sans-serif;
  font-size: 12px;
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

const LoadingImage = styled.img`
  width: 100px; /* Ajuste o tamanho conforme necessário */
  height: auto;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  max-height: 100vh;
`;

const MarsCards = ({ rover }) => {
    const [roverPhotos, setRoverPhotos] = useState([]);
    const [expandedPhoto, setExpandedPhoto] = useState(null);
    const [visiblePhotos, setVisiblePhotos] = useState(20);
    const [totalPhotos, setTotalPhotos] = useState(0);
    const [limit, setLimit] = useState(40);
    const [loaded, setLoaded] = useState(false);


    useEffect(() => {
        const fetchRoverPhotos = async () => {
            try {
                const response = await axios.get(
                    `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=1000&api_key=YKLQnPmppobspjAUnmZ63vnKrvfsHgiwbtmiTNNG`
                );

                const photos = response.data.photos.slice(0, limit);
                setTotalPhotos(response.data.photos.length);
                setRoverPhotos(photos);
                setLoaded(true);
            } catch (error) {
                console.error(error);
            }
        };

        fetchRoverPhotos();
    }, [rover, limit]);

    const handlePhotoClick = (index) => {
        setExpandedPhoto(index === expandedPhoto ? null : index);
    };

    const handleLoadMore = () => {
        setLimit(prevLimit => prevLimit + 12);
        const newVisiblePhotos = visiblePhotos + 12;
        setVisiblePhotos(newVisiblePhotos <= totalPhotos ? newVisiblePhotos : totalPhotos);
    };

    if (!loaded) {
        return (
            <Container>
                <LoadingImage src={loadingGif} alt="Loading..." />
            </Container>
        );
    }

    return (
        <div>
            <CardWrapper>
                {roverPhotos.slice(0, visiblePhotos).map((photo, index) => (
                    <CardContainer
                        key={index}
                        style={{
                            width: expandedPhoto === index ? '100%' : '150px',
                            height: expandedPhoto === index ? 'auto' : '150px',
                        }}
                    >
                        <RoverImage
                            src={photo.img_src}
                            alt={photo.camera.full_name}
                            onClick={() => handlePhotoClick(index)}
                        />
                        <RoverPhotoTitle>{photo.camera.full_name}</RoverPhotoTitle>
                        {expandedPhoto === index && (
                            <RoverPhotoDescription>{photo.camera.name}</RoverPhotoDescription>
                        )}
                    </CardContainer>
                ))}
            </CardWrapper>
            {visiblePhotos < totalPhotos && (
                <LoadMoreButton onClick={handleLoadMore}>Carregar Mais</LoadMoreButton>
            )}
        </div>
    );
};

export default MarsCards;
