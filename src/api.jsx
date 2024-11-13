import axios from "axios";

export const api = axios.create({
  baseURL: "http://18.211.206.217:5225", // Corrigido: substitua o ponto e vírgula por vírgula
});

export const apiChat = axios.create({
  baseURL: "http://54.160.38.83:3001",
});

export function USER_GET(id) {
  return {
    url: API_URL + "/usuarios/" + id,
  };
}
