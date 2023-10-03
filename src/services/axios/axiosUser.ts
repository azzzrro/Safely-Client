import axios from "axios";

const createAxiosUser = (userToken:any) => {

    const axiosUser = axios.create({
        baseURL: import.meta.env.VITE_API_URL_USER,
        headers: {
            "Content-Type": "application/json",
        },
    });

    axiosUser.interceptors.request.use(
        (config: any) => {
            const token = userToken;
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

    axiosUser.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
    return axiosUser;
};
export default createAxiosUser;
