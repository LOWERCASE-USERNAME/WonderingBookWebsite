import axios from "axios";

const API_URL = "/Book";

export const searchBooksByName = async (bookName) => {
  const response = await axios.get(
    `${API_URL}/search-by-name?query=${bookName}`,
  );
  return response.data;
};
