import axios from "axios";
import { getCurrentUser } from "./authService";

const API_URL = "https://localhost:7213/api/IdeaCard";
const DEFAULT_HEADER = {
  Authorization: `Bearer ${getCurrentUser()}`, // Pass the token in headers
};

export const getIdeaCards = async () => {
  const response = await axios.get(`${API_URL}`, {
    headers: DEFAULT_HEADER,
  });
  return response.data;
};

export const getIdeaCardsByArticleId = async (articleId) => {
  const response = await axios.get(`${API_URL}/get-by-article/${articleId}`, {
    headers: DEFAULT_HEADER,
  });
  return response.data;
};

export const getIdeaCard = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`, {
    headers: DEFAULT_HEADER,
  });
  return response.data;
};
export const postIdeaCard = async (ideaCard) => {
  const response = await axios.postForm(`${API_URL}`, ideaCard, {
    headers: DEFAULT_HEADER,
  });
  return response.data;
};

export const postIdeaCardBulk = async (ideaCardList) => {
  const response = await axios.postForm(
    `${API_URL}/bulk-create`,
    ideaCardList,
    {
      headers: DEFAULT_HEADER,
    },
  );
  return response.data;
};

export const putIdeaCardBulk = async (ideaCardList) => {
  const response = await axios.putForm(`${API_URL}/bulk-update`, ideaCardList, {
    headers: DEFAULT_HEADER,
  });
  return response.data;
};

export const deleteIdeaCard = (id) => {};
