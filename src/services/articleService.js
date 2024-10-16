import axios from "axios";
import { getCurrentUser } from "./authService";

const API_URL = "/Articles";
// const DEFAULT_HEADER = {
//   Authorization: `Bearer ${getCurrentUser()}`, // Pass the token in headers
// };

export const getArticles = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getArticlesByUserId = async (userId) => {
  const response = await axios.get(`${API_URL}/user/${userId}`);
  return response.data;
};

export const getArticle = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};
export const postArticle = async (article) => {
  const response = await axios.postForm(`${API_URL}`, article);
  return response.data;
};
export const putArticle = async (article) => {
  const response = await axios.putForm(
    `${API_URL}/${article.get("articleId")}`,
    article,
  );
  return response.data;
};
export const deleteArticle = (id) => {};
