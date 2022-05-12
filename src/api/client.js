import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:8081/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  config.headers['Authorization'] = `Bearer ${token}`;
  return config;
});

export default client;
