import axios from "axios";

export const api = axios.create({
  baseURL: "http://34.231.202.208:5225",
});

export const apiChat = axios.create({
  baseURL: "http://44.223.87.21:3001",
});

export function USER_GET(id) {
  return {
    url: API_URL + "/usuarios/" + id,
  };
}
