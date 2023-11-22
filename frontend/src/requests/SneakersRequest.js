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

export const getSearchSuggestions = async (input = '') => {
	const response = await axios.get(
		`/sneakers/search/suggestions?input=${input}`
	);
	return response.data;
};

export const getSearchSuggestionsForAdmin = async (input = '') => {
	const response = await axios.get(
		`/sneakers/search/suggestions?input=${input}&foradmin=true`
	);
	return response.data;
};

export const getSearchByPagination = async (input, page) => {
	const response = await axios.get(
		`/sneakers/search/products/${input}?page=${page}`
	);
	return response.data;
};

export const getSearchByPaginationForAdmin = async (input, page) => {
	const response = await axios.get(
		`/sneakers/search/products/${input}?page=${page}&foradmin=true`
	);
	return response.data;
};
