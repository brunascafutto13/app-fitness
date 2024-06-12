// auth.service.js

import axios from 'axios';

const API_URL = 'http://localhost:3001/api/auth';

const register = async (username, email, password, peso) => {
  try {
    const response = await axios.post(API_URL + '/register', {
      username,
      email,
      password,
      peso,
    });
    
    // Se o registro for bem-sucedido, armazene o ID do usuário no localStorage (armazenando email)
    localStorage.setItem('email', email);
       
    return response;
  } catch (error) {
    throw error;
  }
};

const login = async (email, password) => {
  try {
    const response = await axios.post(API_URL + '/login', {
      email,
      password,
    });
    // Se o login for bem-sucedido, armazene o ID do usuário no localStorage
    localStorage.setItem('email', email);
    console.log(localStorage)
    return response;
  } catch (error) {
    throw error;
  }
};

const getUserByEmail = async (email) => {
  try {
    const response = await axios.get(`${API_URL}/users/${email}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default {
  register,
  login,
  getUserByEmail,
};