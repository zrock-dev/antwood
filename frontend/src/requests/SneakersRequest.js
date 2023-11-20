import axios from 'axios';

export const getSneakerById = async (id) => {
	const response = await axios.get(`/sneaker/${id}`);
	return response.data;
};

export const getAllProductsByPagination = async (page) => {
	const response = await axios.get(`/sneakers?page=${page}`);
	return response.data;
};

export const getSearchSuggestions = async (input = '') => {
	const response = await axios.get(
		`/sneakers/search/suggestions?input=${input}`
	);
	return response.data;
};

export const getSearchByPagination = async (input, page) => {
	const response = await axios.get(
		`/sneakers/search/products/${input}?page=${page}`
	);
	return response.data;
};
