import axios from "axios";
const BASE_URL = "https://www.googleapis.com/books/v1/volumes";

export const fetchBook = async (idData, thunkAPI) => {
  try {
    const bookData = await axios.get(
      `${BASE_URL}${idData.id ? "/" + idData.id : "?q=isbn:" + idData.isbn}`
    )
    let book = idData.isbn ? bookData.data.items[0] : bookData.data;
    if (idData.isbn) {
      const {data} = await axios.get(
        `${BASE_URL}${"/" + book.id }`
      )
      book = data
    }
    return book 
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
};

export const fetchResult = async (selfLink, thunkAPI) => {
  try {
    const { data } = await axios.get(selfLink);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
};
