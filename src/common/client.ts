import axios from "axios";

const client = axios.create({
    baseURL: "http://localhost:3001",
});

export default client;

//criar uma env ou arquivo.ts para colocar a url do servidor