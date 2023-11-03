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
  axios.put(`${API}/sneaker/${shoe.id}`, axiosConfig);

export const deleteShoe = (id) =>
  axios.delete(`${API}/sneaker/${id}`, axiosConfig);

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

export const updateShoeColor = (shoeColor) =>
  axios.put(
    `${API}/sneakercolor/${shoeColor.id}`,
    JSON.stringify(shoeColor),
    axiosConfig
  );

export const deleteShoeColor = (id, idColor) =>
  axios.delete(`${API}/sneaker/color/${id}/${idColor}`, axiosConfig);

export const addColorShoe = (shoeColor, id) =>
  axios.post(
    `${API}/sneakercolor?sneakerid=${id}`,
    JSON.stringify(shoeColor),
    axiosConfig
  );
