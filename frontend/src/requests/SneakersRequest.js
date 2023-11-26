import axios from 'axios';

export const getSneakerById = async (id) => {
	const response = await axios.get(`/sneaker/${id}`);
	return response.data;
};

export const getAllProductsByPagination = async (page) => {
	const response = await axios.get(`/sneakers?page=${page}`);
	return response.data;
};



export const checkSneakerExistence = async (id) => {
	try {
		const response = await axios.get(`/check-sneaker-existence/${id}`);
		return response.data.exists;
	} catch (error) {
		console.error('Error checking sneaker existence:', error);
		return false;
	}
};