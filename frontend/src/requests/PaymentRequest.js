import axios from 'axios';


const axiosConfig = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    }};

    const payload = {
      _id: "654d3febcbc3abd01cb97a71",
      products: [
        {
          _id: "6543c443d88b1c5386061b89",
          color: "6543c46cd88b1c5386061b8b",
          size: 12.4,
          amount: 12,
          subtotal: 3,
        },
      ],
      subtotal: 12,
      total: 12,
    };


export const  createPayment = async (email) => {
	const response = await axios.post(`/api/payment`, payload, axiosConfig);
	return response.data;
};