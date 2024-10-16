import axios from "axios";

const API_URL = "/GoogleBookSearch";
// const DEFAULT_HEADER = {
//   Authorization: `Bearer ${getCurrentUser()}`, // Pass the token in headers
// };

export const getGoogleBooks = async (query) => {
  const response = await axios.get(`${API_URL}/search?query=${query}`);
  return response.data;
};
