import CryptoJS from "crypto-js";

export const encryptData = (data, secret = "secret") => {
  return CryptoJS.AES.encrypt(data, secret).toString();
};

export const decryptData = (data = "", secret = "secret") => {
  const bytes = CryptoJS.AES.decrypt(data, secret);
  return bytes?.toString(CryptoJS.enc.Utf8);
};

// calculte siz in KB
export function getBase64SizeInKB(base64String) {
  const base64WithoutPrefix = base64String.split(",")[1] || base64String;
  const padding = (base64WithoutPrefix.match(/=/g) || []).length;
  const sizeInBytes = (base64WithoutPrefix.length * 3) / 4 - padding;
  const sizeInKB = sizeInBytes / 1024;
  return sizeInKB.toFixed(2);
}
