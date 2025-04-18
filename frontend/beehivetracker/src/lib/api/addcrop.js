import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


export const createCrop = async (cropData) => {
    return new Promise(async (resolve, reject) => {
      try {
        const token = document.cookie
          .split('; ')
          .find((row) => row.startsWith('token='))
          ?.split('=')[1];
  
        if (!token) {
          return reject('Unauthorized: No token found');
        }
  
        const response = await axios.post(`${BASE_URL}/crops/createcrop`, cropData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
  
        resolve(response.data);
      } catch (error) {
        reject(error?.response?.data?.message || 'Failed to create crop');
      }
    });
  };