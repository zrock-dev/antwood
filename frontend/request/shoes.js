import axios from "axios";
const API = "http://localhost:4000";
const axiosConfig = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const saveShoe = (shoe) =>
  axios.post(`${API}/sneaker`, JSON.stringify(shoe), axiosConfig);

export const updateShoe = (shoe) =>
  axios.put(`${API}/sneaker/${shoe.id}`, JSON.stringify(shoe), axiosConfig);

export const deleteShoe = (id) =>
  axios.delete(`${API}/sneaker/${id}`, axiosConfig);

export const getAllShoes = () => axios.get(`${API}/sneaker`, axiosConfig);

// Cloudinary Management

export const deleteImage = (id) =>
  axios.delete(`${API}/cloudinary?id=${id}`, axiosConfig);

export const uploadShoeToStorageService = (image, id, brand) =>
  axios.post(`${API}/cloudinary/${id}/${brand}`, image, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// Manage Colors

export const getColorById = (id)=>
  axios.get(`${API}/sneakercolor/${id}`, axiosConfig); 


export const updateShoeColor = (form, id) =>
  axios.put(`${API}/sneakercolor/${id}`, form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const deleteShoeColor = (id, idColor) =>
  axios.delete(`${API}/sneakercolor/${id}/${idColor}`, axiosConfig);

export const addColorShoe = (form, id) =>
  axios.post(`${API}/sneakercolor?sneakerid=${id}`, form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
