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



export const getUser = async () =>{
  const res = await axios.get(`${AUTH_DOMAIN}/auth/user`, axiosConfig)
  return res.data
}
  

export const getUserByEmail = (email) =>{
  return axios.get(`${AUTH_DOMAIN}/auth/user/${email}`, axiosConfig);

}
  


export const logoutUser = () =>
  axios.get(`${AUTH_DOMAIN}/auth/logout`, axiosConfig);

export const getCodeToVerifyAccount = async (email) => {
  const response = await axios.get(`${AUTH_DOMAIN}/auth/verify-account/${email}`, axiosConfig)
  return  response.data
}


export const isValidCode = async (code, encryptedCode) =>{
  const response = await axios.get(`${AUTH_DOMAIN}/auth/verify-code?encryptedcode=${encryptedCode}&code=${code}`, axiosConfig);
  return response.data && response.data.status
}
