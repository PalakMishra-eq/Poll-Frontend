import axios from "axios";

const api = axios.create({
  baseURL: "https://interpolls.onrender.com", // Replace with your backend URL
});

export default api;
