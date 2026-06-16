import { useEffect, useState } from 'react';
import styled from 'styled-components';
import loadingGif from '../../assets/loading.gif';
import imageError from '../../assets/imageError.png';
import { fetchApod } from '../../services/nasaApi';
import type { ApodImage } from '../../types/nasa';

const Container = styled.section`
  display: flex;
  justify-content: center;
  background-color: #2b2d31;
  margin: 0;
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
  color: white;
  padding-bottom: 10px;
`;

const Daily = styled.h1`
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  font-size: clamp(28px, 5vw, 36px);
  text-align: center;
  color: white;
  padding-top: 10px;
`;

const Image = styled.img`
  width: min(100%, 500px);
  display: block;
  margin: 0 auto;
  padding-top: 20px;
  padding-bottom: 20px;
`;

const VideoFrame = styled.iframe`
  width: min(100%, 720px);
  aspect-ratio: 16 / 9;
  display: block;
  margin: 20px auto;
  border: 0;
`;

const LoadingImage = styled.img`
  width: 100px;
  height: auto;
`;

const Description = styled.p`
  padding: 0 64px 15px;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: white;
  text-align: center;

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
