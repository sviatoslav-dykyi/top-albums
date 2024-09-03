import { API_KEY, REACT_BASE_URL } from './config';

export const http = {
  get: async (url: string, format = 'json') => {
    return fetch(`${REACT_BASE_URL}/?method=${url}&api_key=${API_KEY}&format=${format}`, {
      method: 'GET',
      mode: 'cors',
    });
  },
};
