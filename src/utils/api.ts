import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_PATH_ENV || `https://mobx-test-backend.herokuapp.com/api/`,
});

export default api;
