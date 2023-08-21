import axios from 'axios'
import { apiURL } from '../utils/constants'


const axiosInstance = axios.create({
    baseURL: apiURL,
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosInstance;