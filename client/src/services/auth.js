import axios from 'axios';

const baseUrl = 'http://localhost:8000/api/auth/user';

const login = async (credentials) => {
  const response = await axios.post(`${baseUrl}/login`, credentials);

  return response.data;
};

const register = async (credentials) => {
  const response = await axios.post(`${baseUrl}/register`, credentials);

  return response.data;
};

const authService = { login, register };

export default authService;
