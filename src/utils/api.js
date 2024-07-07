import axios from 'axios';

const API_BACKEND = 'https://bridge-backend-omega.vercel.app/';

export const getCryptoList = async (page, per_page) => {
    try {
      const response = await axios.get(`${API_BACKEND}tokens?page=${page}&per_page=${per_page}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching crypto list:', error);
      throw error; 
    }
  };

export const getCryptoInfo = async (id) => {
    const response = await axios.get(`${API_BACKEND}coins/${id}`);
    return response.data;
}
