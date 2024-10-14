import axios from "axios";
const BASE_URL = import.meta.env.VITE_BOOKEST_GENRE_URL;
const GOOGLE_URL = import.meta.env.VITE_GOOGLE_URL
const GOOGLE_API = import.meta.env.VITE_GOOGLE_API
const BOOK_AMOUNT_PER_PAGE = 36;



const fetchBooks = async (genre, thunkAPI) => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/${genre}`
    );
    return data.results.books
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
};
export default fetchBooks;


export const searchBooks = async (searchData, thunkAPI) => {
  try {
    const page = searchData.searchPage;
    const start = (page - 1) * BOOK_AMOUNT_PER_PAGE
   
    const { data } = await axios.get(
      `${GOOGLE_URL}${searchData.words}&startIndex=${start}&maxResults=${BOOK_AMOUNT_PER_PAGE}&key=${GOOGLE_API}`
    );
    return data.items;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
}; 




/* const fetchBooks = async (genre, thunkAPI) => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}${genre}.json?api-key=${API_KEY}`
    );
    return data.results.books;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
};
export default fetchBooks; */