import axios from "axios";



import { AUTH_DOMAIN } from "./Requester";

const axiosConfig = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true
};



export const loginUser =(user, provider) => axios.post(`${AUTH_DOMAIN}/auth/login?provider=${provider}`,user,axiosConfig)

export const registerUser = (user,provider) =>
  axios.post(`${AUTH_DOMAIN}/auth/register?provider=${provider}`, user, axiosConfig);



export const getUser = () =>
  axios.get(`${AUTH_DOMAIN}/auth/user?provider=${provider}`, axiosConfig);


export const getUserByEmail = (email) =>
  axios.get(`${AUTH_DOMAIN}/auth/user/${email}`, axiosConfig);



export const logoutUser = (provider) =>
  axios.post(`${AUTH_DOMAIN}/auth/logout?provider=${provider}`, axiosConfig);

export const getCodeToVerifyAccount = async (email) => {
  const response = await axios.get(`${AUTH_DOMAIN}/auth/verify-account/${email}`, axiosConfig)
  return  response.data
}


export const isValidCode = async (code, encryptedCode) =>{
  const response = await axios.get(`${AUTH_DOMAIN}/auth/verify-code?encryptedcode=${encryptedCode}&code=${code}`, axiosConfig);
  return response.data && response.data.status
}
