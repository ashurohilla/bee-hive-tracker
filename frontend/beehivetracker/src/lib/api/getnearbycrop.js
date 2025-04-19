import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * Fetch nearby crops based on location.
 * @param {{ latitude: number, longitude: number, radius?: number }} params
 * @returns {Promise<Array>} - List of crops
 */
export const getNearbyCrops = async (params = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('token='))
        ?.split('=')[1];

      if (!token) return reject('Unauthorized: No token found');

      const response = await axios.get(`${BASE_URL}/crops/nearby`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params,
      });

      console.log(response);
      resolve(response.data);
    } catch (error) {
      reject(error?.response?.data?.message || 'Failed to fetch nearby crops');
    }
  });
};
