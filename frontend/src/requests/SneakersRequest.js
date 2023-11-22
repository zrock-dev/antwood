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

export const getSneakerQuantities = async (sneakers) => {
  const response = await axios.post(`/sneakers/quantities`,sneakers, {
	headers: {
	  'Content-Type': 'application/json',
	  Accept: 'application/json'
	}
  });
  return response.data;
};


export const confirmAvailableSizes = async (body) => {
	const response = await axios.put(
    "/sneakers/confirm/quantities",
    body,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
	return response.data;
}