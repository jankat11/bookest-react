/* const BASE_URL = "http://127.0.0.1:8000/api/users/"; */
const BASE_URL = "https://bookest-server.up.railway.app/api/users/";
import axios from "axios";

export const fetchBooks = async (userData, thunkAPI) => {
  try {
    const { data } = await axios.get(`${BASE_URL}mybooks/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userData.token}`,
      },
    });
    if (!data) {
      throw error;
    }
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      "something went wrong but dont worry for that!"
    );
  }
};

export const fetchAddBook = async (userData, thunkAPI) => {
  try {
    const { data } = await axios.post(`${BASE_URL}addbook/`, userData.state, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userData.user.token}`,
      },
    });
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const fetchRemoveBook = async (userData, thunkAPI) => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}removeBook/${userData.bookId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
      }
    );
    return userData.bookId;
  } catch (error) {
    return thunkAPI.rejectWithValue("book could not removed!");
  }
};
