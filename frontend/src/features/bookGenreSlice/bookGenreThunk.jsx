import axios from "axios"
const BASE_URL = "http://localhost:3000/books";

export const fetchBooks = async (_, thunkAPI) => {
  try {
    const {data} = await axios.get(BASE_URL)
    return data
  } catch (error) {
    console.log(error, thunkAPI);
    return thunkAPI.rejectWithValue(error.message)
  }
}