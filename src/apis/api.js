
// import axios from "axios";

// export const api = axios.create({
//     baseURL: "http://[IP_PÚBLICO_DO_NGINX]" // Substitua por algo como "http://34.231.202.208"
// });



import axios from "axios";

export const api = axios.create({
    baseURL: "http://34.231.202.208:5225" // IP publico do backend
});
