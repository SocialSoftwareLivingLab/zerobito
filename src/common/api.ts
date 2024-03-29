import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL
});

export default api;

// criar uma env ou arquivo.ts para colocar a url do servidor
