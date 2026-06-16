import { useEffect, useState } from 'react';
import styled from 'styled-components';
import loadingGif from '../../assets/loading.gif';
import imageError from '../../assets/imageError.png';
import { fetchApodGallery } from '../../services/nasaApi';
import type { ApodImage, Category } from '../../types/nasa';

interface SpaceCardsProps {
  category: Extract<Category, 'gallery'>;
}

const CardContainer = styled.article`
  margin: 20px;
  padding: 15px;
  border-radius: 16px;
  text-align: center;
  display: flex;
  flex-direction: column;
  width: min(350px, calc(100vw - 40px));
  height: 380px;
  transition: box-shadow 0.3s ease;
  background-color: #1e1f22;
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  cursor: pointer;

  &:hover {
    box-shadow: 0 8px 25px rgba(187, 134, 252, 0.15);
  }
`;

const SpaceImage = styled.img`
  width: 100%;
  height: 280px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 15px;
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
  color: #fff;
  margin-top: auto;
  margin-bottom: auto;
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
  margin: 40px auto;
  padding: 12px 30px;
  background: linear-gradient(135deg, #bb86fc 0%, #7c4dff 100%);
  color: #fff;
  border: none;
  border-radius: 30px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
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

const Message = styled.p`
  padding: 24px;
  text-align: center;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  padding: 20px;
`;

const ModalContent = styled.div`
  background-color: #1e1f22;
  border-radius: 16px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
  position: relative;

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: #bb86fc;
    border-radius: 4px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(0,0,0,0.5);
  color: white;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background 0.2s;

  &:hover {
    background: #bb86fc;
  }
`;

const ModalImage = styled.img`
  width: 100%;
  max-height: 50vh;
  object-fit: contain;
  background-color: #000;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
`;

const ModalTextContainer = styled.div`
  padding: 24px;
`;

const ModalTitle = styled.h2`
  font-family: 'Roboto', sans-serif;
  font-size: 24px;
  margin-bottom: 16px;
  color: #fff;
`;

const ModalDescription = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: #cccccc;
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
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);

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
    setSelectedCardIndex(index);
  };

  const closeModal = () => {
    setSelectedCardIndex(null);
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

  const selectedItem = selectedCardIndex !== null ? spaceData[selectedCardIndex] : null;

  return (
    <>
      {error && <Message>{error}</Message>}
      <CardWrapper>
        {spaceData.slice(0, visibleCards).map((item, index) => (
          <CardContainer key={`${item.date}-${item.title}-${index}`} onClick={() => handleCardClick(index)}>
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
        ))}
      </CardWrapper>
      
      {selectedItem && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={closeModal}>&times;</CloseButton>
            <ModalImage
              src={selectedItem.media_type === 'image' ? selectedItem.url : imageError}
              alt={selectedItem.title}
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = imageError;
              }}
            />
            <ModalTextContainer>
              <ModalTitle>{selectedItem.title}</ModalTitle>
              <ModalDescription>{selectedItem.explanation}</ModalDescription>
            </ModalTextContainer>
          </ModalContent>
        </ModalOverlay>
      )}

      <LoadMoreButton type="button" onClick={handleLoadMore} disabled={loading}>
        {loading ? 'Carregando...' : 'Carregar Mais'}
      </LoadMoreButton>
    </>
  );
};

export default SpaceCards;
