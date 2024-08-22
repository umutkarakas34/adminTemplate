import axios from 'axios';

const api = axios.create({
  baseURL: 'http://api.fruitcrypto.online',
});

// Token'i localStorage'dan alıp Authorization başlığına ekliyoruz
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Token'i localStorage'dan al
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Authorization başlığına ekle
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // Hataları yakala
  }
);

export default api;
