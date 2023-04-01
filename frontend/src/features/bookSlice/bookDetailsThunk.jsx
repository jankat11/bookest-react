import axios from "axios"
const BASE_URL = "https://www.googleapis.com/books/v1/volumes?q=isbn:"

export const fetchBook = async (bookISBN, thunkAPI) => {
  try {
    const {data} = await axios.get(`${BASE_URL}${bookISBN}`)
    return data.items[0]
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message)
  }
}