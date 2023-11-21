import axios from 'axios';

export const getSneakerById = async (id) => {
	const response = await axios.get(`/sneaker/${id}`);
	return response.data;
};

export const getAllProductsByPagination = async (page) => {
	const response = await axios.get(`/sneakers?page=${page}&pageSize=4`);
	return response.data;
};

export const getSneakerQuantityInformation = async (sneakerId) => {
	const response = await axios.get(`/sneaker/quantity/${sneakerId}`);
	return response.data;
};
