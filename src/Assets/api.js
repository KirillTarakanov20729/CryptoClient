import axios from "axios";
import router from "@/Router/index.js";

const api = axios.create();

api.interceptors.request.use(async (config) => {
    if (localStorage.getItem('token')) {
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    }
    return config;
}, error => {
    return Promise.reject(error)
})

api.interceptors.response.use(async (response) => {
    if (localStorage.getItem('token')) {
        response.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    }
    return response;
}, error => {
    if (error.response.data.message === 'Token has expired') {
        return axios.post( import.meta.env.VITE_URL_BACKEND + 'api/client/auth/refresh', {}, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).
        then(res => {
            localStorage.setItem('token', res.data.access_token)
            error.config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
            return api.request(error.config)
        })
    }

    if (error.response.status === 401) {
        router.push({name: 'Login'})
    }

    return Promise.reject(error)
})

export default api