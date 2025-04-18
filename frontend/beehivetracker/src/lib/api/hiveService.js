import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * Fetch hive logs from the backend.
 * @param {Object} params - Optional query params { startDate, endDate, page, limit }
 * @returns {Promise<Array>} - List of hive logs
 */
export const getHiveLogs = async (params = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('token='))
        ?.split('=')[1];

      if (!token) return reject('Unauthorized: No token found');

      const response = await axios.get(`${BASE_URL}/hives/gethive`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params,
      });
      console.log(response);

      resolve(response.data); // Assumes your backend returns an array or { data, meta }
    } catch (error) {
      reject(error?.response?.data?.message || 'Failed to fetch hive logs');
    }
  });
};
