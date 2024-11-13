import axios from "axios";

export const api = axios.create({
  baseURL: "http://vitalis-uat.zapto.org", // URL pública do Nginx
});

export const apiChat = axios.create({
  baseURL: "http://54.160.38.83:3001",
});

export function USER_GET(id) {
  return {
    url: API_URL + "/usuarios/" + id,
  };
}
