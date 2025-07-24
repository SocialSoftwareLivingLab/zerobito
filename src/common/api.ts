import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 403) {
            alert('Você não possui permissão para executar a tarefa.');
            return { data: null, status: 403, erro: true };
        }
    }
);

export default api;

// criar uma env ou arquivo.ts para colocar a url do servidor
