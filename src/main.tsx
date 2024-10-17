import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import axios from "axios";
import { getCurrentUser } from "./services/authService";

axios.defaults.baseURL = "http://13.76.25.67:8080/api"
// axios.defaults.baseURL = "https://localhost:7213/api";

const token = getCurrentUser();
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

// axios.interceptors.request.use(request => {
//   console.log(request);
//   // Edit request config
//   return request;
// }, error => {
//   console.log(error);
//   return Promise.reject(error);
// });

// axios.interceptors.response.use(response => {
//   console.log(response);
//   // Edit response config
//   return response;
// }, error => {
//   console.log(error);
//   return Promise.reject(error);
// });


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
