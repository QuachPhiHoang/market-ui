import axios from 'axios';
import { refreshToken } from '~/redux/user/userSlice';

const BASE_URL = 'http://localhost:8080/api/';
let store;

export const injectStore = (_store) => {
    store = _store;
};
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
});
axiosInstance.interceptors.request.use(
    (config) => {
        const state = store.getState();
        const token = state.user?.user?.accessToken;
        if (!token) return config;
        if (!config.headers['Authorization'] && token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error),
);
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
            prevRequest.sent = true;
            const newAccessToken = await store.dispatch(refreshToken());
            prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            return axiosInstance(prevRequest);
        }
        return Promise.reject(error);
    },
);

export default axiosInstance;
