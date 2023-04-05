import axios from "axios";
const AUTH_URL = "http://127.0.0.1:8000/api/users/register/";

export const fetchUser = async (userData, thunkAPI) => {
  try {
    const { data } = await axios.post(AUTH_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: userData
    });
    console.log(data);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue("user already exists")
  }
};
