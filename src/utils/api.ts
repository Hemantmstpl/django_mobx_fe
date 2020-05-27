import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_PATH_ENV || `http://8f695df9.ngrok.io/api/`,
});

// api.interceptors.response.use((response) => {
//   if (response.data && response.data.error) {
//     return Promise.reject(response);
//   }
//   return response;
// }, (error: any) => {
//   if (!error.response) {
//       // window.emergingMessage.showToast("Network Error.", "error");
//     return Promise.reject(error);
//   }
//   if (error.response.status === 440 || error.response.status === 401) {
//       // window.emergingMessage.showToast("Your session has expired please login again.", "error");
//   }
//   return Promise.reject(error);
// });

export default api;
