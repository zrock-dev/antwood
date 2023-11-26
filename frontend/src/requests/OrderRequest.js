import axios from "axios";

const API = "/api/payment";
const axiosConfig = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export const getUserOrders = async (email) => {
  const response = await axios.get(`${API}/orders/${email}`, axiosConfig);
  return response.data;
};

export const verifyOrderStatus = async (intentId, status) => {
  const response = await axios.put(
    `${API}/orders/${intentId}/${status}`,
    axiosConfig
  );
  return response.data;
};

export const getPaymentIntent = async (email, body) => {
  const response = await axios.post(
    `${API}/create-payment-intent/${email}`,
    body,
    axiosConfig
  );
  return response.data;
};
