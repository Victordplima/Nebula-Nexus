import { useState } from 'react';
import type { ChangeEvent } from 'react';
import styled from 'styled-components';
import imageError from '../../assets/imageError.png';
import { fetchApodByDate } from '../../services/nasaApi';
import type { ApodImage } from '../../types/nasa';

const Container = styled.section`
  max-width: 800px;
  margin: 20px auto 40px;
  padding: 30px;
  text-align: center;
  background-color: #1e1f22;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

const Title = styled.h2`
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  font-size: 28px;
  margin-bottom: 20px;
  color: #e0e0e0;
`;

const DateLabel = styled.label`
  display: inline-flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  margin-bottom: 12px;
`;

const DateInput = styled.input`
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  padding: 10px 15px;
  border-radius: 8px;
  border: 1px solid #444;
  background-color: #2b2d31;
  color: #fff;
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #bb86fc;
  }
`;

const ShowImageButton = styled.button`
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  font-weight: bold;
  padding: 12px 30px;
  background: linear-gradient(135deg, #bb86fc 0%, #7c4dff 100%);
  color: #fff;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  margin-bottom: 20px;
  transition: box-shadow 0.2s ease;
  box-shadow: 0 4px 15px rgba(187, 134, 252, 0.3);

  &:hover {
    box-shadow: 0 6px 20px rgba(187, 134, 252, 0.5);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.65;
    box-shadow: none;
  }
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
  margin: 20px 0;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
`;

const VideoFrame = styled.iframe`
  width: 100%;
  aspect-ratio: 16 / 9;
  margin: 20px 0;
  border: 0;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
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

const Message = styled.p`
  margin-bottom: 12px;
`;

const today = new Date().toISOString().slice(0, 10);

const AstronomyImageByDate = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [imageData, setImageData] = useState<ApodImage | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  const handleShowImage = async () => {
    if (!selectedDate) {
      setError('Escolha uma data antes de buscar a imagem.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const picture = await fetchApodByDate(selectedDate);
      setImageData(picture);
    } catch (unknownError) {
      console.error('Error fetching image:', unknownError);
      setImageData(null);
      setError('Nao foi possivel carregar a imagem para essa data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>Imagem Astronomica por Data</Title>
      <DateLabel>
        Escolha uma data:
        <DateInput type="date" value={selectedDate} max={today} onChange={handleDateChange} />
      </DateLabel>
      <br />
      <ShowImageButton type="button" onClick={handleShowImage} disabled={loading}>
        {loading ? 'Carregando...' : 'Mostrar Imagem'}
      </ShowImageButton>
      {selectedDate && <Message>Data selecionada: {selectedDate}</Message>}
      {error && <Message>{error}</Message>}
      {imageData?.media_type === 'video' && (
        <VideoFrame src={imageData.url} title={imageData.title} allowFullScreen />
      )}
      {imageData && imageData.media_type !== 'video' && (
        <Image
          src={imageData.url}
          alt={imageData.title}
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = imageError;
          }}
        />
      )}
      {imageData && <ImageName>{imageData.title}</ImageName>}
      {imageData && <ImageDescription>{imageData.explanation}</ImageDescription>}
    </Container>
  );
};

export default AstronomyImageByDate;
