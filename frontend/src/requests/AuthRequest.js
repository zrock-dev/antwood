import axios from "axios";


const axiosConfig = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true
};



export const loginUser =(user, provider) => axios.post(`/auth/login?provider=${provider}`,user,axiosConfig)

export const registerUser = (user,provider) =>
  axios.post(`/auth/register?provider=${provider}`, user, axiosConfig);



export const getUser = async () =>{
  const res = await axios.get(`/auth/user`, axiosConfig)
  return res.data
}
  


export const getUserByEmail = (email) =>{
  return axios.get(`/auth/user/${email}`, axiosConfig);

}
  


export const logoutUser = () =>
  axios.get(`/auth/logout`, axiosConfig);

export const getCodeToVerifyAccount = async (email) => {
  const response = await axios.get(`/auth/verify-account/${email}`, axiosConfig)
  return  response.data
}


export const isValidCode = async (code, encryptedCode) =>{
  const response = await axios.get(`/auth/verify-code?encryptedcode=${encryptedCode}&code=${code}`, axiosConfig);
  return response.data && response.data.status
}
