// import axios from 'axios';
// import { useDispatch, useSelector } from 'react-redux';
// import { refreshToken } from '~/redux/user/userSlice';

// const BASE_URL = 'http://localhost:8080/api';
// const axiosPrivate = axios.create({
//     baseURL: BASE_URL,
//     headers: { 'Content-Type': 'application/json' },
//     withCredentials: true,
// });
// function axiosInstance() {
//     const dispatch = useDispatch();
//     const { user } = useSelector((state) => state.user);
//     if (axiosPrivate === null) {
//         axiosPrivate = axios.create({
//             baseURL: BASE_URL,
//             headers: { 'Content-Type': 'application/json' },
//             withCredentials: true,
//         });
//     }
//     axiosPrivate.interceptors.request.use(
//         (config) => {
//             if (!config.headers['Authorization']) {
//                 config.headers['Authorization'] = `Bearer ${user?.accessToken}`;
//             }
//             return config;
//         },
//         (error) => Promise.reject(error),
//     );
//     axiosPrivate.interceptors.response.use(
//         (response) => response,
//         (error) => {
//             const prevRequest = error?.config;
//             if (error?.response?.status === 403 && !prevRequest?.sent) {
//                 prevRequest.sent = true;
//                 const newAccessToken = dispatch(refreshToken());
//                 prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
//                 return axiosPrivate(prevRequest);
//             }
//             return Promise.reject(error);
//         },
//     );
//     return axiosPrivate;
// }

// export default axiosPrivate;
