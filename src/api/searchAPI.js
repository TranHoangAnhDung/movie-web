import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";

const SearchApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
  },
});

export const getSearchList = async (path, options = {}) => {
  const response = await SearchApi.get(path, options);
  return response.data;
};

export default SearchApi;
