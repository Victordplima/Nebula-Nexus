import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
`;

const Title = styled.h2`
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 10px;
`;

const DateInput = styled.input`
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  padding: 8px;
  margin-bottom: 10px;
`;

const ShowImageButton = styled.button`
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  padding: 10px 20px;
  background-color: #bb86fc;
  color: #121212;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 20px;
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
  margin-bottom: 10px;
`;

const ImageName = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const ImageDescription = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  padding-bottom: 30px;
`;

const AstronomyImageByDate = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [imageSrc, setImageSrc] = useState('');
    const [imageName, setImageName] = useState('');
    const [imageDescription, setImageDescription] = useState('');

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const handleShowImage = () => {
        fetch(`https://api.nasa.gov/planetary/apod?api_key=YKLQnPmppobspjAUnmZ63vnKrvfsHgiwbtmiTNNG&date=${selectedDate}`)
            .then(response => response.json())
            .then(data => {
                setImageSrc(data.url);
                setImageName(data.title);
                setImageDescription(data.explanation);
            })
            .catch(error => console.error('Error fetching image:', error));
    };

    return (
        <Container>
            <Title>Imagem Astronômica por Data</Title>
            <label>
                Escolha uma data:
                <DateInput type="date" value={selectedDate} onChange={handleDateChange} />
            </label>
            <br />
            <ShowImageButton onClick={handleShowImage}>Mostrar Imagem</ShowImageButton>
            {selectedDate && <p>Data selecionada: {selectedDate}</p>}
            {imageSrc && <Image src={imageSrc} alt={imageName} />}
            {imageName && <ImageName>{imageName}</ImageName>}
            {imageDescription && <ImageDescription>{imageDescription}</ImageDescription>}
        </Container>
    );
};

export default AstronomyImageByDate;
