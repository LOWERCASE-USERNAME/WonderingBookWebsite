import axios from "axios";
import { getCurrentUser } from "./authService";

const API_URL = "https://localhost:7213/api/Articles";
const DEFAULT_HEADER = {
  Authorization: `Bearer ${getCurrentUser()}`, // Pass the token in headers
};

export const getArticles = async () => {
  const response = await axios.get(`${API_URL}`, {
    headers: DEFAULT_HEADER,
  });
  return response.data;
};

export const getArticlesByUserId = async (userId) => {
  const response = await axios.get(`${API_URL}/user/${userId}`, {
    headers: DEFAULT_HEADER,
  });
  return response.data;
};

export const getArticle = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`, {
    headers: DEFAULT_HEADER,
  });
  return response.data;
};
export const postArticle = async (article) => {
  const response = await axios.post(`${API_URL}`, article, {
    headers: DEFAULT_HEADER,
  });
  return response.data;
};
export const putArticle = async (article) => {
  const response = await axios.put(`${API_URL}/${article.articleId}`, article, {
    headers: DEFAULT_HEADER,
  });
  return response.data;
};
export const deleteArticle = (id) => {};
