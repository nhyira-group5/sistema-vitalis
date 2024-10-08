import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:8080',
  //baseURL: "http://34.231.202.208:5225" // IP publico do backend
});

export const apiChat = axios.create({
  baseURL: 'http://localhost:3001',
  //const URL = 'http://44.196.0.230:3001';
});

export function USER_GET(id) {
  return {
    url: API_URL + '/usuarios/' + id,
  };
}
