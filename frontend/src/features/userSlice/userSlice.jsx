import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUser } from "./userThunk";
import { getUserData } from "../../utils";

export const getUser = createAsyncThunk("userSlice/getUser", fetchUser);

const initialState = {
  isLoading: false,
  isError: false,
  user: getUserData(),
  message: "",
  succesfullyLoggedIn: false
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    emptyMessage (state) {
      state.message = ""
    },
    resetSuccessStatus (state) {
      state.succesfullyLoggedIn = false
    },
    logout (state) {
      state.user = null
    }

  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.succesfullyLoggedIn = false
        state.isLoading = true;
        state.isError = false;
        state.message = ""
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.succesfullyLoggedIn = true
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isError = true
        state.isLoading = false
        state.message = action.payload
        state.succesfullyLoggedIn = false
        console.log(action.payload);
      })
  },
});

export default userSlice.reducer

export const userSliceActions = userSlice.actions
