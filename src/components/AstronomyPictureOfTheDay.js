import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  background-color: #1f1f1f;
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
  color: #bb86fc;
  padding-top: 10px;
`;

const Image = styled.img`
  max-width: 500px;   
  display: block;
  margin: 0 auto;
  padding-top: 20px;
  padding-bottom: 20px;
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
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <Content>
                <Daily>Daily Image</Daily>
                <Image src={astronomyPicture.url} alt={astronomyPicture.title} />
                <Title>{astronomyPicture.title}</Title>
            </Content>
        </Container>
    );
};

export default AstronomyPictureOfTheDay;