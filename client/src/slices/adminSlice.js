import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getApprovedUsers = createAsyncThunk(
  "admin/appUser",
  async (input, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/v1/admin/number", {
        headers: { token: localStorage.getItem("token") },
      });
      console.log(res);
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

export const getNoApprovedUsers = createAsyncThunk(
  "admin/NotappUser",
  async (input, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/v1/admin/pendedusers", {
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

export const getClasses = createAsyncThunk(
  "admin/classroom",
  async (input, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/v1/admin/class", {
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

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    usersApproved: {},
    usersNotApproved: {},
    classrooms: {},
    errors: null,
  },

  extraReducers: {
    [getApprovedUsers.fulfilled]: (state, action) => {
      state.usersApproved = action.payload;
      state.errors = null;
    },
    [getApprovedUsers.rejected]: (state, action) => {
      state.errors = action.payload;
    },
    [getNoApprovedUsers.fulfilled]: (state, action) => {
      state.usersNotApproved = action.payload;
      state.errors = null;
    },
    [getNoApprovedUsers.rejected]: (state, action) => {
      state.errors = action.payload;
    },
    [getClasses.fulfilled]: (state, action) => {
      state.classrooms = action.payload;
      state.errors = null;
    },
    [getClasses.rejected]: (state, action) => {
      state.errors = action.payload;
    },
  },
});
export default adminSlice.reducer;
