import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const loginUser = async (Email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        Email,
        password,
      });

      if (response.data?.token) {
        resolve(response.data); // return { token, role }
      } else {
        reject('Invalid login response');
      }
    } catch (error) {
      reject(error?.response?.data?.message || 'Login failed');
    }
  });   
};
