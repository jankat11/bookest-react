import axios from "axios";

const fetchBooks = async (genre,thunkAPI) => {
  try {
    const { data } = await axios.get(
      `https://api.nytimes.com/svc/books/v3/lists/current/${genre}.json?api-key=LqUHIwL9cMprnPyH5reZJcaOH0In51Am`
    );
    return data.results.books
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message)
  }
};
export default fetchBooks;
