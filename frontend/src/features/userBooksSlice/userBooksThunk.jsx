const BASE_URL = "http://127.0.0.1:8000/api/users/";
import axios from "axios";

export const fetchBooks = async (userData, thunkAPI) => {
  try {
    const { data } = axios.post(
      `${BASE_URL}mybooks/`,
      { "Content-Type": "application/json" },
      userData
    );
    if (!data) 
    throw error
    return data;   
  } catch (error) {
    return thunkAPI.rejectWithValue("something went wrong but dont worry for that!")
  }
};

/* export const fetchUser = async (_, thunkAPI) => {
  const {user : {user}} = thunkAPI.getState(() => store)
  return user
} */
