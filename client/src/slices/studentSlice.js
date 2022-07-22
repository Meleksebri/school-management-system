import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUserInfo = createAsyncThunk(
  "student/userinfo",
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

export const getStudentClass = createAsyncThunk(
  "student/class",
  async (input, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/v1/student/getStudentClass", {
        params: { classn: input },
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

export const getTeachers = createAsyncThunk(
  "student/teacher",
  async (input, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/v1/student/teachers");
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
  "student/homework",
  async (input, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/v1/student/homework", {
        params: { myclas: input },
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

export const getExam = createAsyncThunk(
  "student/exam",
  async (input, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/v1/student/exam", {
        params: { myclasss: input },
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

const studentSlice = createSlice({
  name: "student",
  initialState: {
    userInfo: {},
    myClass: {},
    teachers: {},
    homeworks: {},
    exams: {},
    errors: null,
  },
  extraReducers: {
    [getUserInfo.fulfilled]: (state, action) => {
      state.userInfo = action.payload;
      state.errors = null;
    },
    [getUserInfo.rejceted]: (state, action) => {
      state.errors = action.payload;
    },
    [getStudentClass.fulfilled]: (state, action) => {
      state.myClass = action.payload;
      state.errors = null;
    },
    [getStudentClass.rejceted]: (state, action) => {
      state.errors = action.payload;
    },
    [getTeachers.fulfilled]: (state, action) => {
      state.teachers = action.payload;
      state.errors = null;
    },
    [getTeachers.rejceted]: (state, action) => {
      state.errors = action.payload;
    },
    [getHomeworks.fulfilled]: (state, action) => {
      state.homeworks = action.payload;
      state.errors = null;
    },
    [getHomeworks.rejceted]: (state, action) => {
      state.errors = action.payload;
    },
    [getExam.fulfilled]: (state, action) => {
      state.exams = action.payload;
      state.errors = null;
    },
    [getExam.rejceted]: (state, action) => {
      state.errors = action.payload;
    },
  },
});

export default studentSlice.reducer;
