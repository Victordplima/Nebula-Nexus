import { useEffect, useState } from 'react';
import styled from 'styled-components';
import loadingGif from '../../assets/loading.gif';
import imageError from '../../assets/imageError.png';
import { fetchMarsPhotos } from '../../services/nasaApi';
import type { MarsPhoto, RoverName } from '../../types/nasa';

interface MarsCardsProps {
  rover: RoverName;
}

interface CardContainerProps {
  $expanded: boolean;
}

const CardContainer = styled.article<CardContainerProps>`
  margin: 20px;
  padding: 10px;
  border-radius: 8px;
  text-align: center;
  display: inline-block;
  width: ${({ $expanded }) => ($expanded ? 'min(720px, calc(100vw - 40px))' : 'min(350px, calc(100vw - 40px))')};
  min-height: 400px;
  max-height: ${({ $expanded }) => ($expanded ? 'none' : '400px')};
  overflow: hidden auto;
  transition: width 0.3s, height 0.3s;
  background-color: #313338;
`;

const RoverImage = styled.img`
  width: min(300px, 100%);
  height: 300px;
  padding-top: 15px;
  padding-bottom: 15px;
  cursor: pointer;
  object-fit: cover;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
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
    color: #fff;
  }
`;

const LoadingImage = styled.img`
  width: 100px;
  height: auto;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
`;

const Message = styled.p`
  padding: 24px;
  text-align: center;
`;

const INITIAL_VISIBLE_PHOTOS = 20;
const LOAD_MORE_COUNT = 12;

const MarsCards = ({ rover }: MarsCardsProps) => {
  const [roverPhotos, setRoverPhotos] = useState<MarsPhoto[]>([]);
  const [expandedPhoto, setExpandedPhoto] = useState<number | null>(null);
  const [visiblePhotos, setVisiblePhotos] = useState(INITIAL_VISIBLE_PHOTOS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoverData = async () => {
      try {
        setLoading(true);
        setError(null);
        setExpandedPhoto(null);
        setVisiblePhotos(INITIAL_VISIBLE_PHOTOS);

        const photos = await fetchMarsPhotos(rover);
        setRoverPhotos(photos);
      } catch (unknownError) {
        console.error(unknownError);
        setRoverPhotos([]);
        setError('Nao foi possivel carregar as fotos de Marte.');
      } finally {
        setLoading(false);
      }
    };

    fetchRoverData();
  }, [rover]);

  const handlePhotoClick = (index: number) => {
    setExpandedPhoto((currentExpandedPhoto) => (index === currentExpandedPhoto ? null : index));
  };

  const handleLoadMore = () => {
    setVisiblePhotos((currentVisiblePhotos) =>
      Math.min(currentVisiblePhotos + LOAD_MORE_COUNT, roverPhotos.length),
    );
  };

  if (loading) {
    return (
      <Container>
        <LoadingImage src={loadingGif} alt="Carregando..." />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Message>{error}</Message>
      </Container>
    );
  }

  if (roverPhotos.length === 0) {
    return (
      <Container>
        <Message>Nenhuma foto encontrada para esse rover.</Message>
      </Container>
    );
  }

  return (
    <div>
      <CardWrapper>
        {roverPhotos.slice(0, visiblePhotos).map((photo, index) => (
          <CardContainer key={photo.id} $expanded={expandedPhoto === index}>
            <RoverImage
              src={photo.img_src}
              alt={photo.camera.full_name}
              onClick={() => handlePhotoClick(index)}
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = imageError;
              }}
            />
            <RoverPhotoTitle>{photo.camera.full_name}</RoverPhotoTitle>
            {expandedPhoto === index && (
              <RoverPhotoDescription>
                Camera: {photo.camera.name} | Sol: {photo.sol} | Data: {photo.earth_date}
              </RoverPhotoDescription>
            )}
          </CardContainer>
        ))}
      </CardWrapper>
      {visiblePhotos < roverPhotos.length && (
        <LoadMoreButton type="button" onClick={handleLoadMore}>
          Carregar Mais
        </LoadMoreButton>
      )}
    </div>
  );
};

export default MarsCards;
