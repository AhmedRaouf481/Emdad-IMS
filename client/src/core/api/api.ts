import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api/",
});

api.interceptors.request.use((config) => {
    const token: string = localStorage.getItem('token') ?? '';
    if (token.length > 0) {
        config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token') ?? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjbHQ3N2VqamYwMDAwMTA2aHk2Ym8xdjZ6IiwiaWF0IjoxNzA5MzIxODgyLCJleHAiOjE3MDkzNjUwODJ9.hnpNHFQaPq-3FA-Yd20QC_j5aoY8Cd9kfz9vhUJcKvI';
    }
    return config;
})

export default api;