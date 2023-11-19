import axios from 'axios';

export const getSneakerById = async (id) => {
	const response = await axios.get(`/sneaker/${id}`);
	return response.data;
};

export const getAllProductsByPagination = async (page) => {
	const response = await axios.get(`/sneakers?page=${page}`);
	return response.data;
};

export const getSneakerSearchSuggestions = async (input = '') => {
	const response = await axios.get(
		`/sneakers/search/suggestions?input=${input}`
	);
	return response.data;
};
