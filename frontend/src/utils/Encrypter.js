import CryptoJS from "crypto-js";

const secretKey = "your-secret-key";

export const encryptData = (data) => {
    return CryptoJS.AES.encrypt(data, secretKey).toString();
};

export const decryptData = (encryptedData) => {
  let originalData = "";
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    originalData = bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error("Error al descifrar:", error);
  }
  return originalData;
};
