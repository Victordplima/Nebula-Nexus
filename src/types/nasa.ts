export type Category = 'gallery' | 'mars' | 'date-image';

export type RoverName = 'curiosity' | 'opportunity' | 'spirit';

export interface ApodImage {
  copyright?: string;
  date: string;
  explanation: string;
  hdurl?: string;
  media_type: 'image' | 'video' | string;
  service_version: string;
  title: string;
  url: string;
}

export interface RoverCamera {
  id: number;
  name: string;
  rover_id: number;
  full_name: string;
}

export interface MarsPhoto {
  id: number;
  sol: number;
  camera: RoverCamera;
  img_src: string;
  earth_date: string;
}

export interface MarsPhotosResponse {
  photos: MarsPhoto[];
}
