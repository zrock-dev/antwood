import axios from "axios";



import { AUTH_DOMAIN } from "./Requester";

const axiosConfig = {
  headers: {
    "Content-Type": "application/json"
  },
};



export const loginUser =(user, provider) => axios.post(`${AUTH_DOMAIN}/auth/login?provider=${provider}`,user,axiosConfig)

export const registerUser = (user,provider) =>
  axios.post(`${AUTH_DOMAIN}/auth/register?provider=${provider}`, user, axiosConfig);



export const getUser = () =>
  axios.get(`${AUTH_DOMAIN}/auth/user?provider=${provider}`, axiosConfig);


  export const getUserByEmail = (email) =>
    axios.get(`${AUTH_DOMAIN}/auth/user/${email}`, axiosConfig);



export const logoutUser = (user,provider) =>
  axios.post(`${AUTH_DOMAIN}/auth/logout?provider=${provider}`, user, axiosConfig);

export const getCodeToVerifyAccount = (email) =>
  axios.get(`${AUTH_DOMAIN}/auth/verify-account/${email}`, axiosConfig);