import axios from "axios";
const BASE_URL = "https://bookest-server.up.railway.app/api/users/";
/* const BASE_URL = "http://127.0.0.1:8000/api/users/"; */
const GOOGLE_AUTH_URL = "http://127.0.0.1:8000/api/auth/google/callback/";
/* const GOOGLE_AUTH_URL = "https://bookest-server.up.railway.app/api/auth/google/callback/"; */

export const fetchUser = async (userData, thunkAPI) => {
  const { isRegister, ...userCredentials } = userData;
  try {
    const AUTH_URL = `${BASE_URL}${isRegister ? "register/" : "login/"}`;

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
    localStorage.setItem("user", JSON.stringify(data));
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      isRegister ? "user already exists" : "email or password is wrong"
    );
  }
};


export const fetchGoogleCallBack = async (access_token, thunkAPI) => {
  try {
    const { data } = await axios.post(
      GOOGLE_AUTH_URL,
      { token: access_token },
      { "Content-Type": "application/json" },
    );
    console.log("data from thunk : ", data);
    localStorage.setItem("user", JSON.stringify(data));
    return data


    
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
};
