import axios from "axios";
const BASE_URL = import.meta.env.VITE_NYT_URL;
const API_KEY = import.meta.env.VITE_API_KEY;
const GOOGLE_URL = "https://www.googleapis.com/books/v1/volumes?q=";
const BOOK_AMOUNT_PER_PAGE = 36;

const fetchBooks = async (genre, thunkAPI) => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}${genre}.json?api-key=${API_KEY}`
    );
    return data.results.books;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
};
export default fetchBooks;

export const searchBooks = async (searchData, thunkAPI) => {
  try {
    const page = searchData.searchPage;
    console.log("page: ", searchData.searchPage);
    const start = (page - 1) * BOOK_AMOUNT_PER_PAGE
   
    const { data } = await axios.get(
      `${GOOGLE_URL}${searchData.words}&startIndex=${start}&maxResults=${BOOK_AMOUNT_PER_PAGE}`
    );
    return data.items;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
};
