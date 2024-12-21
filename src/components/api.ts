import axios from 'axios';
import {UnsplashImage} from '../types/types'

const API_KEY = 'N8NiyfrWfcDMb9Uv_jaw3yF1BcGJvl6XVHTrK6LTBuo';
const BASE_URL = 'https://api.unsplash.com/search/photos';

type UnsplashApiResponse = {
  results: UnsplashImage[];
  total_pages: number;
};

type FetchImagesResponse = {
  images: UnsplashImage[];
  totalPages: number;
};

export const fetchImages = async (
  query: string,
  page: number = 1
): Promise<FetchImagesResponse> => {
  try {
    const response = await axios.get<UnsplashApiResponse>(BASE_URL, {
      params: {
        query,
        per_page: 12,
        page,
      },
      headers: {
        Authorization: `Client-ID ${API_KEY}`,
      },
    });

    return {
      images: response.data.results,
      totalPages: response.data.total_pages,
    };
  } catch (error) {
    console.error('Error fetching images:', error);
    throw new Error('Failed to fetch images');
  }
};