import axios from 'axios';
import queryString from 'query-string';

export const getSneakerById = async (id) => {
	const response = await axios.get(`/sneaker/${id}`);
	return response.data;
};

export const getAllProductsByPagination = async (page, size = 4) => {
	const response = await axios.get(`/sneakers?page=${page}&pageSize=${size}`);
	return response.data;
};

export const getSneakerColorById = async (id) => {
	const response = await axios.get(`/sneakercolor/${id}`);
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

export const getSneakerQuantityInformation = async (sneakerId) => {
	const response = await axios.get(`/sneaker/quantity/${sneakerId}`);
	return response.data;
};

export const getSneakerQuantities = async (sneakers) => {
	const response = await axios.post(`/sneakers/quantities`, sneakers, {
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		}
	});
	return response.data;
};

export const confirmAvailableSizes = async (body) => {
	const response = await axios.put('/sneakers/confirm/quantities', body, {
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		}
	});
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
		`/sneakers/search/products/${input}?page=${page}&pageSize=3`
	);
	return response.data;
};

export const getSearchByPaginationForAdmin = async (input, page) => {
	const response = await axios.get(
		`/sneakers/search/products/${input}?page=${page}&pageSize=4&foradmin=true`
	);
	return response.data;
};

export const getFilterOptions = async () => {
	const response = await axios.get('/sneakers/filters/options');
	return response.data;
};

export const getSneakerFilteredByPagination = async (
	filters,
	page,
	pageSize = 3
) => {
	if (filters) {
		const params = {
			page,
			pageSize
		};
		if (filters.brand !== '') {
			params['brand'] = filters.brand;
		}
		if (filters.color !== '') {
			params['color'] = filters.color;
		}
		if (filters.minPrice != 0 && filters.maxPrice != 0) {
			params['minPrice'] = filters.minPrice;
			params['maxPrice'] = filters.maxPrice;
		}
		if (filters.size != 0) {
			params['size'] = filters.size;
		}
		if (filters.tags.length > 0) {
			params['tags'] = filters.tags.toString();
		}
		const queryParams = queryString.stringify(params);
		const response = await axios.get(
			`/sneakers/filters/products?${queryParams}`
		);

		return response.data;
	}

	return {
		sneakers: []
	};
};

export const createSneaker = async (sneaker) => {
	const response = await axios.post('/sneaker', sneaker, {
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		}
	});

	return response.data;
};

export const insertSneakerColor = async (form, id) => {
	const response = await axios.post(`/sneakercolor?sneakerid=${id}`, form, {
		headers: {
			'Content-Type': 'multipart/form-data',
			Accept: 'application/json'
		}
	});
	return response.data;
};

export const updateSneakerColorById = async (form, id) => {
	const response = await axios.put(`/sneakercolor/${id}`, form, {
		headers: {
			'Content-Type': 'multipart/form-data',
			Accept: 'application/json'
		}
	});
	return response.data;
};

export const updateSneakerById = async (sneaker) => {
	const response = await axios.put(`/sneaker/${sneaker._id}`, sneaker, {
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		}
	});
	return response.data;
};

export const deleteSneakerById = async (id) => {
	const response = await axios.delete(`/sneaker/${id}`);
	return response.data;
};

export const deleteSneakerColorById = async (sneakerColorId) => {
	const response = await axios.delete(`/sneakercolor/${sneakerColorId}`);
	const data = response.data;
};
