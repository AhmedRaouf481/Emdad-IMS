import axios from "axios";
import { getSession } from 'next-auth/react'

export const API_BASE_URL = "http://localhost:8080/api/"
const api = axios.create({
    baseURL: API_BASE_URL,
});

api.interceptors.request.use(async (config) => {
    const session = await getSession()

    if (session) {
        console.log(session.token);

        config.headers.Authorization = `Bearer ${session.token}`

    }
    console.log(config);

    return config;
})

export default api;