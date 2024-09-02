import axios from "axios";
import Cookies from 'universal-cookie';
import { SERVER_URL } from "../consts";

function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Check if this cookie is the one we're looking for
      if (cookie.startsWith(name + '=')) {
        // Return everything after the cookie name
        return decodeURIComponent(cookie.substring(name.length + 1));
      }
    }
    return null;
  }


const axiosInstance = axios.create({
    baseURL: SERVER_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });

  axiosInstance.interceptors.request.use(
    config => {

      const token = getCookie('token')

      console.log("cookies.accessToken", document.cookie)
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }

      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  export default axiosInstance;
