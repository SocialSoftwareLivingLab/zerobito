import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3001",

});

export default api;

//criar uma env ou arquivo.ts para colocar a url do servidor