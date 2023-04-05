import axios from "axios";
const BASE_URL = "http://127.0.0.1:8000/api/users/";

export const fetchUser = async (userData, thunkAPI) => {
  const { isRegister, ...userCredentials } = userData;
  try {
    console.log("credentials: ", userCredentials, isRegister);
    const AUTH_URL = `${BASE_URL}${isRegister ? "register/" : "login/"}`;
    console.log("auth is: ", AUTH_URL);
    const { data } = await axios.post(
      AUTH_URL,
      isRegister
        ? userCredentials
        : {
            username: userCredentials.email,
            password: userCredentials.password,
          },
      {
        "Content-Type": "application/json",
      }
    );
    console.log(data);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      isRegister ? "user already exists" : "email or password is wrong"
    );
  }
};
