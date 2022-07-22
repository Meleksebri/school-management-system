import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "user/login",
  async (input, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/v1/users/login", input);
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response.data.msg
          ? error.response.data.msg
          : error.response.data.errors
      );
    }
  }
);

export const getUserData = createAsyncThunk(
  "user/getUserData",
  async (input, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/v1/users", {
        headers: { token: localStorage.getItem("token") },
      });
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response.data.msg
          ? error.response.data.msg
          : error.response.data.errors
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: {},
    token: localStorage.getItem("token") || null,
    errors: null,
    isAuth: Boolean(localStorage.getItem("isAuth")) || null,
  },
  reducers: {
    logoutUser: (state) => {
      localStorage.clear();
      state.token = null;
      state.isAuth = false;
      state.userInfo = {};
      state.errors = null;
    },
  },
  extraReducers: {
    [loginUser.fulfilled]: (state, action) => {
      state.isAuth = true;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("isAuth", true);
      state.userInfo = action.payload.userInfo;

      state.errors = null;
    },
    [loginUser.rejected]: (state, action) => {
      state.errors = action.payload;
    },
    [getUserData.fulfilled]: (state, action) => {
      state.userInfo = action.payload;
      state.errors = null;
    },
    [getUserData.rejected]: (state, action) => {
      state.errors = action.payload;
    },
  },
});
export default userSlice.reducer;
export const { logoutUser } = userSlice.actions;
