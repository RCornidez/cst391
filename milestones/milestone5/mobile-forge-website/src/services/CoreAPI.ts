import axios from 'axios';
import router from '../Routes';
import ROUTES from '../routes';

const api = axios.create({ baseURL: 'http://10.0.0.69:5000', withCredentials: true });

api.interceptors.response.use(
    response => response,
        error => {

        if (error.response?.status === 401) {
            router.navigate(ROUTES.LOGIN);  
        }
        
        return Promise.reject(error);
    }
);

export default api;
