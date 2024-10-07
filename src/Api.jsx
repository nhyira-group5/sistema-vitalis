import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:8080',
});

export const apiChat = axios.create({
  baseURL: 'http://localhost:3001',
});

export function USER_GET(id) {
  return {
    url: API_URL + '/usuarios/' + id,
  };
}
