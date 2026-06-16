import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ReactCardFlip from 'react-card-flip';
import loadingGif from '../../assets/loading.gif';
import imageError from '../../assets/imageError.png';
import { fetchApodGallery } from '../../services/nasaApi';
import type { ApodImage, Category } from '../../types/nasa';

interface SpaceCardsProps {
  category: Extract<Category, 'gallery'>;
}

const CardContainer = styled.article`
  margin: 20px;
  padding: 10px;
  border-radius: 8px;
  text-align: center;
  display: inline-block;
  width: min(350px, calc(100vw - 40px));
  height: 400px;
  overflow: hidden auto;
  transition: width 0.3s, height 0.3s;
  background-color: #313338;
`;

const SpaceImage = styled.img`
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

const SpaceTitle = styled.h3`
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  font-size: 18px;
`;

const SpaceDescription = styled.p`
  padding-top: 10px;
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  line-height: 1.5;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
`;

const LoadingImage = styled.img`
  width: 100px;
  height: auto;
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

  &:disabled {
    cursor: not-allowed;
    opacity: 0.65;
  }
`;

const Message = styled.p`
  padding: 24px;
  text-align: center;
`;

const INITIAL_VISIBLE_CARDS = 20;
const INITIAL_FETCH_COUNT = 21;
const LOAD_MORE_COUNT = 12;

const SpaceCards = ({ category }: SpaceCardsProps) => {
  const [spaceData, setSpaceData] = useState<ApodImage[]>([]);
  const [visibleCards, setVisibleCards] = useState(INITIAL_VISIBLE_CARDS);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (category !== 'gallery' || loaded) {
      return;
    }

    const fetchSpaceData = async () => {
      try {
        setError(null);
        const gallery = await fetchApodGallery(INITIAL_FETCH_COUNT);
        setSpaceData(gallery);
      } catch (unknownError) {
        console.error(unknownError);
        setError('Nao foi possivel carregar a galeria.');
      } finally {
        setLoaded(true);
      }
    };

    fetchSpaceData();
  }, [category, loaded]);

  const handleCardClick = (index: number) => {
    setFlippedCards((currentFlippedCards) => {
      const nextFlippedCards = new Set(currentFlippedCards);

      if (nextFlippedCards.has(index)) {
        nextFlippedCards.delete(index);
      } else {
        nextFlippedCards.add(index);
      }

      return nextFlippedCards;
    });
  };

  const handleLoadMore = async () => {
    try {
      setLoading(true);
      setError(null);
      const moreImages = await fetchApodGallery(LOAD_MORE_COUNT);
      setSpaceData((currentSpaceData) => [...currentSpaceData, ...moreImages]);
      setVisibleCards((currentVisibleCards) => currentVisibleCards + LOAD_MORE_COUNT);
    } catch (unknownError) {
      console.error(unknownError);
      setError('Nao foi possivel carregar mais imagens.');
    } finally {
      setLoading(false);
    }
  };

  if (!loaded) {
    return (
      <Container>
        <LoadingImage src={loadingGif} alt="Carregando..." />
      </Container>
    );
  }

  if (error && spaceData.length === 0) {
    return (
      <Container>
        <Message>{error}</Message>
      </Container>
    );
  }

  return (
    <>
      {error && <Message>{error}</Message>}
      <CardWrapper>
        {spaceData.slice(0, visibleCards).map((item, index) => (
          <ReactCardFlip
            key={`${item.date}-${item.title}-${index}`}
            isFlipped={flippedCards.has(index)}
            flipDirection="horizontal"
          >
            <CardContainer onClick={() => handleCardClick(index)}>
              <SpaceImage
                src={item.media_type === 'image' ? item.url : imageError}
                alt={item.title}
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src = imageError;
                }}
              />
              <SpaceTitle>{item.title}</SpaceTitle>
            </CardContainer>
            <CardContainer onClick={() => handleCardClick(index)}>
              <SpaceDescription>{item.explanation}</SpaceDescription>
            </CardContainer>
          </ReactCardFlip>
        ))}
      </CardWrapper>
      <LoadMoreButton type="button" onClick={handleLoadMore} disabled={loading}>
        {loading ? 'Carregando...' : 'Carregar Mais'}
      </LoadMoreButton>
    </>
  );
};

export default SpaceCards;
