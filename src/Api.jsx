import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:8080',
});

export function USER_GET(id) {
  return {
    url: API_URL + '/usuarios/' + id,
  };
}
