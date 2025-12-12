import axios from 'axios';
import Swal from 'sweetalert2';

const api = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 403) {
            Swal.fire({
                text: 'Você não possui permissão para executar a tarefa.',
                icon: 'error',
                timer: 1800,
                showConfirmButton: false,
                position: 'center',
                toast: true
            });
            return { data: null, status: 403, erro: true };
        }
    }
);

export default api;

// criar uma env ou arquivo.ts para colocar a url do servidor
