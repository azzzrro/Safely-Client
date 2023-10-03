import axios from "axios";

const createAxiosDriver = (driverToken:any) => {
    const axiosDriver = axios.create({
        baseURL: import.meta.env.VITE_API_URL_DRIVER,
        headers: {
            "Content-Type": "application/json",
        },
    });

    axiosDriver.interceptors.request.use(
        (config: any) => {
            const token = driverToken
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

    axiosDriver.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
    return axiosDriver;
};
export default createAxiosDriver;
