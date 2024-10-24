import axios from "axios";
import { getCurrentUser } from "./authService";

const API_URL = "/IdeaCard";
// const DEFAULT_HEADER = {
//   Authorization: `Bearer ${getCurrentUser()}`, // Pass the token in headers
// };

export const getIdeaCards = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getIdeaCardsByArticleId = async (articleId) => {
  const response = await axios.get(`${API_URL}/get-by-article/${articleId}`);
  return response.data;
};

export const getIdeaCard = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};
export const postIdeaCard = async (ideaCard) => {
  const response = await axios.postForm(`${API_URL}`, ideaCard);
  return response.data;
};

export const postIdeaCardBulk = async (ideaCardList) => {
  const response = await axios.postForm(`${API_URL}/bulk-create`, ideaCardList);
  return response.data;
};

export const putIdeaCardBulk = async (ideaCardList) => {
  const response = await axios.putForm(`${API_URL}/bulk-update`, ideaCardList);
  return response.data;
};

export const deleteIdeaCard = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
