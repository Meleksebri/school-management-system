// routes
import Router from "./routes";
// theme
import ThemeProvider from "./theme";
// components
import ScrollToTop from "./components/ScrollToTop";
import { BaseOptionChartStyle } from "./components/chart/BaseOptionChart";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getUserInfo,
  getClasses,
  myClass,
  getExams,
  getHomeworks,
} from "../../../slices/teacherSlice";

// ----------------------------------------------------------------------

export default function Teacher() {
  const { isAuth, userInfo } = useSelector((state) => state.user);

  const mySubject = useSelector((state) => {
    return state.teacher?.userInfo?.user?.subject;
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserInfo(userInfo));
    dispatch(myClass(mySubject));
    dispatch(getClasses());
    dispatch(getExams(mySubject));
    dispatch(getHomeworks(mySubject));
  }, [dispatch, userInfo, mySubject]);

  return (
    <ThemeProvider>
      <ScrollToTop />
      <BaseOptionChartStyle />
      <Router isAuth={isAuth} role={userInfo.role} />
    </ThemeProvider>
  );
}
