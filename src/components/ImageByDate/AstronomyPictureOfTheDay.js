import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import loadingGif from '../../assets/loading.gif'

const Container = styled.div`
  display: flex;
  justify-content: center;
  background-color: #2b2d31;
  margin: 0;
  padding: 0;
`;

const Content = styled.div`
  margin: 10px;
`;

const Title = styled.h2`
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  text-align: center;
  color: white;
  padding-bottom: 10px;
`;

const Daily = styled.h1`
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  font-size: 36px;
  text-align: center;
  color: white;
  padding-top: 10px;
`;

const Image = styled.img`
  max-width: 500px;   
  display: block;
  margin: 0 auto;
  padding-top: 20px;
  padding-bottom: 20px;
`;

const LoadingImage = styled.img`
  width: 100px;
  height: auto;
`;

const Description = styled.p`
  padding-left: 64px;
  padding-right: 64px;
  padding-bottom: 15px;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: white;
  text-align: center;
`;

const AstronomyPictureOfTheDay = () => {
    const [astronomyPicture, setAstronomyPicture] = useState(null);

    useEffect(() => {
        const fetchAstronomyPicture = async () => {
            try {
                const response = await axios.get(
                    'https://api.nasa.gov/planetary/apod?api_key=YKLQnPmppobspjAUnmZ63vnKrvfsHgiwbtmiTNNG'
                );
                setAstronomyPicture(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchAstronomyPicture();
    }, []);

    if (!astronomyPicture) {
        return (
            <Container>
                <LoadingImage src={loadingGif} alt="Loading..." />
            </Container>
        );
    }

    return (
        <Container>
            <Content>
                <Daily>Daily Image</Daily>
                <Image src={astronomyPicture.url} alt={astronomyPicture.title} />
                <Title>{astronomyPicture.title}</Title>
                <Description>{astronomyPicture.explanation}</Description>
            </Content>
        </Container>
    );
};

export default AstronomyPictureOfTheDay;