import axios from "axios";

// Define o domínio do frontend como API_URL
const API_URL = "https://vitalis-uat.zapto.org";

export const api = axios.create({
  baseURL: API_URL, // Define a URL base para `api`
});

export const apiChat = axios.create({
  baseURL: "http://54.160.38.83:3001", // Mantém o IP para o chat
});
export function USER_GET(id) {
  return {
    url: API_URL + "/usuarios/" + id,
  };
}
