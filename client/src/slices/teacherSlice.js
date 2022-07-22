import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUserInfo = createAsyncThunk(
  "teacher/userinfo",
  async (input, { rejectWithValue }) => {
    try {
      console.log(input);
      const res = await axios.get("/api/v1/admin/userInfo", {
        params: { email: input?.email },
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

export const getClasses = createAsyncThunk(
  "teacher/classroom",
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

export const myClass = createAsyncThunk(
  "teacher/teacherclass",
  async (input, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/v1/teacher/myclass", {
        params: { subject: input },
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

export const getExams = createAsyncThunk(
  "teacher/exams",
  async (input, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/v1/teacher/allexams", {
        params: { subject: input },
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

export const getHomeworks = createAsyncThunk(
  "teacher/homework",
  async (input, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/v1/teacher/allhomeworks", {
        params: { subject: input },
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

const teacherSlice = createSlice({
  name: "teacher",
  initialState: {
    userInfo: {},
    classrooms: {},
    teacherclass: {},
    exams: {},
    homework: {},
    errors: null,
  },

  extraReducers: {
    [getUserInfo.fulfilled]: (state, action) => {
      state.userInfo = action.payload;
      state.errors = null;
    },
    [getUserInfo.rejected]: (state, action) => {
      state.errors = action.payload;
    },
    [getClasses.fulfilled]: (state, action) => {
      state.classrooms = action.payload;
      state.errors = null;
    },
    [getClasses.rejected]: (state, action) => {
      state.errors = action.payload;
    },
    [myClass.fulfilled]: (state, action) => {
      state.teacherclass = action.payload;
      state.errors = null;
    },
    [myClass.rejected]: (state, action) => {
      state.errors = action.payload;
    },
    [getExams.fulfilled]: (state, action) => {
      state.exams = action.payload;
      state.errors = null;
    },
    [getExams.rejected]: (state, action) => {
      state.errors = action.payload;
    },
    [getHomeworks.fulfilled]: (state, action) => {
      state.homework = action.payload;
      state.errors = null;
    },
    [getHomeworks.rejected]: (state, action) => {
      state.errors = action.payload;
    },
  },
});
export default teacherSlice.reducer;
