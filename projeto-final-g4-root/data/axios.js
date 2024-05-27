import axios from 'axios';

// Adicionar token JWT ao cabeçalho de autorização em todas as solicitações
axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Ou sessionStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axios;
