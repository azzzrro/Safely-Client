import axios from "axios";

const createAxiosAdmin = (adminToken:any) => {
    const axiosAdmin = axios.create({
        baseURL: import.meta.env.VITE_API_URL_ADMIN,
        headers: {
            "Content-Type": "application/json",
        },
    });

    axiosAdmin.interceptors.request.use(
        (config: any) => {
            const token = adminToken
            return {
                ...config,
                headers: {
                    ...(token !== null && { Authorization: `Bearer ${token}` }),
                    ...config.headers,
                },
            };
        },
        (error: any) => {
            return Promise.reject(error);
        }
    );

    axiosAdmin.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
    return axiosAdmin;
};
export default createAxiosAdmin;
