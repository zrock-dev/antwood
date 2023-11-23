import axios from 'axios';

export const getSneakerById = async (id) => {
	const response = await axios.get(`/sneaker/${id}`);
	return response.data;
};

export const getAllProductsByPagination = async (page) => {
	const response = await axios.get(`/sneakers?page=${page}`);
	return response.data;
};


export const createSneaker = async(sneaker)=>{
	const response = await axios.post("/sneaker", sneaker, {
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		}
	});

	return response.data
}

export const  insertSneakerColor = async(form, id)=>{
	const response = await axios.post(`/sneakercolor?sneakerid=${id}`, form, {
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
    },
  });
  return response.data
}