import axios from 'axios';

export const getSneakerById = async (id) => {
	const response = await axios.get(`/sneaker/${id}`);
	return response.data;
};

export const getAllProductsByPagination = async (page) => {
	const response = await axios.get(`/sneakers?page=${page}`);
	return response.data;
};

export const getSneakerQuantities = async (sneakers) => {
  const response = await axios.post(`/sneakers/quantities`,sneakers, {
	headers: {
	  'Content-Type': 'application/json',
	  Accept: 'application/json'
	}
  });
  return response.data;
};