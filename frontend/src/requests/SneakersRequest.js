import axios from 'axios';

export const getSneakerById = async (id) => {
	const response = await axios.get(`/sneaker/${id}`);
	return response.data;
};

export const getAllProductsByPagination = async (page) => {
	const response = await axios.get(`/sneakers?page=${page}`);
	return response.data;
};

export const getRelatedSneakersById = async (tags) => {
	const response = await axios.get(`${SERVER_DOMAIN}/sneaker/${tags}`);
	return response.data;
};
