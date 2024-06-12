// src/services/auth.service.js
import axios from 'axios';

const API_URL = 'http://localhost:3001/api/auth';

const register = (username, email, password,peso) => {
  return axios.post(API_URL + '/register', {
    username,
    email,
    password,
    peso,
  });
};

const login = (email, password) => {
  return axios.post(API_URL + '/login', {
    email,
    password,
  });
};

export default {
  register,
  login,
};
