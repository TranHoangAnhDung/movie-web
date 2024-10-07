import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3/movie";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
  },
});

export const get = async (path, options = {}) => {
  const response = await api.get(path, options);
  console.log('call search api');
  return response.data;
};

export default api;
