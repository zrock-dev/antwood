import axios from 'axios';

export const getCartProductsInformation = async (products) => {
	const response = await axios.post(
		'/sneakers/colors/all',
		products,
		{
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			}
		}
	);
	return response.data;
};
