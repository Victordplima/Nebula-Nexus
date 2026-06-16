import { useState } from 'react';
import type { ChangeEvent } from 'react';
import styled from 'styled-components';
import imageError from '../../assets/imageError.png';
import { fetchApodByDate } from '../../services/nasaApi';
import type { ApodImage } from '../../types/nasa';

const Container = styled.section`
  max-width: 700px;
  margin: 0 auto;
  padding: 0 16px 24px;
  text-align: center;
`;

const Title = styled.h2`
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 10px;
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
  padding: 8px;
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

  &:disabled {
    cursor: not-allowed;
    opacity: 0.65;
  }
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
  margin-bottom: 10px;
`;

const VideoFrame = styled.iframe`
  width: 100%;
  aspect-ratio: 16 / 9;
  margin-bottom: 10px;
  border: 0;
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
