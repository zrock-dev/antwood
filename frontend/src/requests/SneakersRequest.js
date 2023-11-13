import axios from 'axios';
import { SERVER_DOMAIN } from './Requester';

export const getSneakerById = async (id) => {
	const response = await axios.get(`${SERVER_DOMAIN}/sneaker/${id}`);
	return response.data;
};

export const getAllProductsByPagination = async (page) => {
	const response = await axios.get(`${SERVER_DOMAIN}/sneakers?page=${page}`);
	return response.data;
};

export const getSneakersByFilters = async (filters) => {
  try {
    const response = await axios.post(`${SERVER_DOMAIN}/sneakers/${filter}`, filters);
    return response.data;
  } catch (error) {
    console.error('Error when obtain sneakers by filters:', error);
    throw error;
  }
};
