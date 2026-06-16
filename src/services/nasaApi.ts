import axios from 'axios';
import type { ApodImage, MarsPhoto, MarsPhotosResponse, RoverName } from '../types/nasa';

const nasaApi = axios.create({
  baseURL: 'https://api.nasa.gov',
});

const getNasaApiKey = (): string => {
  const apiKey = process.env.REACT_APP_NASA_API_KEY;

  if (!apiKey) {
    throw new Error('NASA API key ausente. Configure REACT_APP_NASA_API_KEY no arquivo .env.');
  }

  return apiKey;
};

export const fetchApod = async (): Promise<ApodImage> => {
  const response = await nasaApi.get<ApodImage>('/planetary/apod', {
    params: { api_key: getNasaApiKey() },
  });

  return response.data;
};

export const fetchApodGallery = async (count: number): Promise<ApodImage[]> => {
  const response = await nasaApi.get<ApodImage[]>('/planetary/apod', {
    params: { api_key: getNasaApiKey(), count },
  });

  return response.data;
};

export const fetchApodByDate = async (date: string): Promise<ApodImage> => {
  const response = await nasaApi.get<ApodImage>('/planetary/apod', {
    params: { api_key: getNasaApiKey(), date },
  });

  return response.data;
};

export const fetchMarsPhotos = async (rover: RoverName, sol = 1000): Promise<MarsPhoto[]> => {
  const response = await nasaApi.get<MarsPhotosResponse>(
    `/mars-photos/api/v1/rovers/${rover}/photos`,
    {
      params: { api_key: getNasaApiKey(), sol },
    },
  );

  return response.data.photos;
};
