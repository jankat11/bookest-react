import axios from "axios";
const BASE_URL = "https://www.googleapis.com/books/v1/volumes";

export const fetchBook = async (idData, thunkAPI) => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}${idData.id ? "/" + idData.id : "?q=isbn:" + idData.isbn}`
    );
    return data.isbn ? data.items[0] : data;
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
