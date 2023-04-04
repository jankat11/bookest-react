import axios from "axios";
const AUTH_URL = "http://127.0.0.1:8000/";

export const fetchUser = async (_, thunkAPI) => {
  try {
    const { data } = await axios.get(AUTH_URL, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(data);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.messsage);
  }
};
