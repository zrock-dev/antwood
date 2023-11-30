import axios from 'axios';
import Review from '@/components/reviews/Review';

const axiosConfig = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    }
  };
  
export const addReview = async (sneakerId, review) => {
	const response = await axios.post(`/review/${sneakerId}`,review,axiosConfig);
	return response.data;
};

export const getReviewsByUserEmail = async (sneakerId, userEmail) => {
  const response = await axios.get(`/review/user/${sneakerId}/${userEmail}`,axiosConfig);
  return response.data;
}

export const getReviewsByAmount = async (sneakerId, from , amount) => {
  const response = await axios.get(`/review/${sneakerId}?index=${from}&amount=${amount}`,axiosConfig);
  return response.data;
}

export const userCanReview = async(email,sneaker) =>{
  const response = await axios.get(`/api/payment/orders/cancomment/${email}/${sneaker}`);
  return response.data
}
