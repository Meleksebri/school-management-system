import React, { useEffect, Suspense } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Loading from "./components/Loading";
import { getUserData } from "./slices/userSlice";
const Auth = React.lazy(() => import("./components/Auth"));
const Admin = React.lazy(() => import("./pages/AdminPage/src/Admin"));
const Student = React.lazy(() => import("./pages/StudentPage/src/Student"));
const Teacher = React.lazy(() => import("./pages/TeacherPage/src/Teacher"));

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);
  const { isAuth, userInfo } = useSelector((state) => state.user);
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/login" element={<Auth />} />
        </Routes>
      </Suspense>
      {isAuth && userInfo.role === "admin" ? (
        <Suspense fallback={<Loading />}>
          <Admin />
        </Suspense>
      ) : isAuth && userInfo.role === "teacher" ? (
        <Suspense fallback={<Loading />}>
          <Teacher />
        </Suspense>
      ) : isAuth && userInfo.role === "student" ? (
        <Suspense fallback={<Loading />}>
          <Student />
        </Suspense>
      ) : (
        <></>
      )}
    </>
  );
};

export default App;
