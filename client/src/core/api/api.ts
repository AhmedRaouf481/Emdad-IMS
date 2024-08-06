import axios from "axios";
import { getSession } from 'next-auth/react'
import LoadingService from "../utlis/loading-service";

export const API_BASE_URL = "http://localhost:8080/api/"
const api = axios.create({
    baseURL: API_BASE_URL,
});

api.interceptors.request.use(async (config) => {
    LoadingService.showLoading();
    const session = await getSession()

    if (session) {
        console.log(session.token);

        config.headers.Authorization = `Bearer ${session.token}`

    }
    console.log(config);

    return config;
}, (error) => {
    LoadingService.hideLoading();
    return Promise.reject(error);
  })

  api.interceptors.response.use(
    (response) => {
        LoadingService.hideLoading();
      // Modify the response or perform other tasks
      return response;
    },
    (error) => {
      LoadingService.hideLoading();
    
      return Promise.reject(error);
    }
  );

export default api;