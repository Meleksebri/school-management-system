import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import adminReducer from "./slices/adminSlice";
import teacherSlice from "./slices/teacherSlice";
import studentSlice from "./slices/studentSlice";
export default configureStore({
  reducer: {
    user: userReducer,
    admin: adminReducer,
    teacher: teacherSlice,
    student: studentSlice,
  },
});
