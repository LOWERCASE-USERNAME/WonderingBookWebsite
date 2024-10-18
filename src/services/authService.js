import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
const API_URL = "/User";

export const register = async (userData) => {
  const res = await axios.post(`${API_URL}/register`, userData);
  return res.data;
};

export const login = async (loginData) => {
  const res = await axios.post(`${API_URL}/login`, loginData);
  if (res.data.token) {
    localStorage.setItem("user-token", JSON.stringify(res.data.token));

    axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
  }
  return res.data;
};

export const logout = () => {
  localStorage.removeItem("user-token"); //JWT token stored in localStorage
  Cookies.remove("userInfo"); //actual user info stored in cookie
  delete axios.defaults.headers.common["Authorization"];
};

export const getCurrentUser = () => {
  const user = JSON.parse(localStorage.getItem("user-token"));
  return user;
};

export const isTokenValid = (token) => {
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    return decoded.exp > Date.now() / 1000;
  } catch (err) {
    return false;
  }
};

export const isAuthenticated = () => {
  const user = getCurrentUser();
  if (!user) return false;

  const { token } = user;
  return isTokenValid(user);
};

export const getUserIdFromToken = () => {
  const token = localStorage.getItem("user-token");
  if (!token) return null;

  const decodedToken = jwtDecode(token);
  return decodedToken.sub;
};

export const getUserInfo = async (userId) => {
  const response = await axios.get(`/User/home/${userId}`, {
    headers: {
      Authorization: `Bearer ${getCurrentUser()}`, // Pass the token in headers
    },
  });

  return response.data.userInfo;
};
