import axios from 'axios';


const axiosConfig = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    }};

export const  createPayment = async (email) => {
	const response = await axios.post(`http://172.20.41.15:5000/api/shopping/payment`, {}, axiosConfig);
	return response.data;
};