import { useEffect, useState } from 'react';
import styled from 'styled-components';
import loadingGif from '../../assets/loading.gif';
import imageError from '../../assets/imageError.png';
import { fetchApod } from '../../services/nasaApi';
import type { ApodImage } from '../../types/nasa';

const Container = styled.section`
  display: flex;
  justify-content: center;
  background-color: transparent;
  margin: 20px 0;
  padding: 0;
`;

const Content = styled.div`
  width: min(100%, 960px);
  margin: 10px;
`;

const Title = styled.h2`
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  text-align: center;
  color: #e0e0e0;
  padding-bottom: 16px;
  font-size: 24px;
`;

const Daily = styled.h1`
  font-family: 'Roboto', sans-serif;
  font-weight: 900;
  font-size: clamp(32px, 5vw, 42px);
  text-align: center;
  padding-top: 20px;
  margin-bottom: 10px;
  background: linear-gradient(135deg, #fff 0%, #bb86fc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Image = styled.img`
  width: min(100%, 600px);
  display: block;
  margin: 30px auto;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }
`;

const VideoFrame = styled.iframe`
  width: min(100%, 720px);
  aspect-ratio: 16 / 9;
  display: block;
  margin: 30px auto;
  border: 0;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
`;

const LoadingImage = styled.img`
  width: 100px;
  height: auto;
`;

const Description = styled.p`
  padding: 0 20px 30px;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  line-height: 1.8;
  color: #cccccc;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding-left: 16px;
    padding-right: 16px;
  }
`;

const Message = styled.p`
  padding: 24px;
  text-align: center;
`;

const renderMedia = (picture: ApodImage) => {
  if (picture.media_type === 'video') {
    return <VideoFrame src={picture.url} title={picture.title} allowFullScreen />;
  }

  return (
    <Image
      src={picture.url}
      alt={picture.title}
      onError={(event) => {
        event.currentTarget.onerror = null;
        event.currentTarget.src = imageError;
      }}
    />
  );
};

const AstronomyPictureOfTheDay = () => {
  const [astronomyPicture, setAstronomyPicture] = useState<ApodImage | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAstronomyPicture = async () => {
      try {
        const picture = await fetchApod();
        setAstronomyPicture(picture);
      } catch (unknownError) {
        console.error(unknownError);
        setError('Nao foi possivel carregar a imagem diaria.');
      }
    };

    fetchAstronomyPicture();
  }, []);

  if (error) {
    return (
      <Container>
        <Message>{error}</Message>
      </Container>
    );
  }

  if (!astronomyPicture) {
    return (
      <Container>
        <LoadingImage src={loadingGif} alt="Carregando..." />
      </Container>
    );
  }

  return (
    <Container>
      <Content>
        <Daily>Imagem do Dia</Daily>
        {renderMedia(astronomyPicture)}
        <Title>{astronomyPicture.title}</Title>
        <Description>{astronomyPicture.explanation}</Description>
      </Content>
    </Container>
  );
};

export default AstronomyPictureOfTheDay;
