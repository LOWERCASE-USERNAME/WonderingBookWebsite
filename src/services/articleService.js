import axios from "axios";

const API_URL = "/Articles";
// const DEFAULT_HEADER = {
//   Authorization: `Bearer ${getCurrentUser()}`, // Pass the token in headers
// };

export const getArticles = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getArticlesExtended = async () => {
  const response = await axios.get(API_URL + "/admin");
  return response.data;
};

export const getPublishedArticles = async () => {
  const response = await axios.get(API_URL + "/user");
  return response.data;
};

export const recommendArticles = async () => {
  const response = await axios.get(`${API_URL}/recommend`);
  return response.data;
};

export const getArticlesByUserId = async (userId) => {
  const response = await axios.get(`${API_URL}/user/${userId}`);
  return response.data;
};

export const getArticlesByBookId = async (bookId) => {
  const response = await axios.get(`${API_URL}/search-by-book-id?id=${bookId}`);
  return response.data;
};

export const getArticlesByBook = async (bookName) => {
  const response = await axios.get(
    `${API_URL}/search-by-book?name=${bookName}`,
  );
  return response.data;
};

export const getArticle = async (id) => {
  console.log("Hello");
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
export const putArticleStatus = async (articleStatusDTOs) => {
  const response = await axios.put(
    `${API_URL}/update-status-bulk`,
    articleStatusDTOs,
  );
  return response.data;
};

export const deleteArticle = (id) => {};
