import axios from 'axios';

const axiosInstance = axios.create()

axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers['Authorization'] = token
        }
        // config.headers['Content-Type'] = 'application/json';
        return config
    },
    error => {
        Promise.reject(error)
    }
)

axiosInstance.interceptors.response.use(
    response => {
        return response
    },
    error => {

        if (error?.response?.data?.statusCode === 401) {
            localStorage.clear();
            // window.location.href = '/'
        }

        return Promise.reject((error.response && error.response.data) || 'Wrong service')
    }
)

export default axiosInstance