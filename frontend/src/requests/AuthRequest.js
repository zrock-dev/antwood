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

export const requestEmailVerificationToken = async (email) => {
    console.log(`Request email verification token is: ${email}`)
    const response = await axios.get(`/auth/verify-account/${email}`, axiosConfig)
        .catch((err) => console.error(err))
    return response.data
}


export const requestEmailTokenValidation = async (code, encryptedCode) => {
    console.log(`code: ${code} vs encrypted code: ${encryptedCode}`)
    const response = await axios.get(`/auth/verify-code?encryptedcode=${encryptedCode}&code=${code}`, axiosConfig)
        .catch((err) => console.error(err));
    return response.data && response.data.status
}
