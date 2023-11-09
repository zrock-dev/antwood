import axios from "axios";


const API  = "http://localhost:4500"


const axiosConfig = {
  headers: {
    "Content-Type": "application/json"
  },
};



export const loginUser =(user, provider) => axios.post(`${API}/auth/login?provider=${provider}`,user,axiosConfig)

export const registerUser = (user,provider) =>
  axios.post(`${API}/auth/register?provider=${provider}`, user, axiosConfig);

export const getUser = () =>
  axios.get(`${API}/auth/user?provider=${provider}`, axiosConfig);
  export const getUserByEmail = (email) =>
    axios.get(`${API}/auth/user/${email}`, axiosConfig);

export const logoutUser = (user,provider) =>
  axios.post(`${API}/auth/logout?provider=${provider}`, user, axiosConfig);

export const getCodeToVerifyAccount = (email) =>
  axios.get(`${API}/auth/verify-account/${email}`, axiosConfig);