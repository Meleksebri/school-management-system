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
  getApprovedUsers,
  getClasses,
  getNoApprovedUsers,
} from "../../../slices/adminSlice";

// ----------------------------------------------------------------------

export default function Admin() {
  const { isAuth, userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getApprovedUsers());
    dispatch(getNoApprovedUsers());
    dispatch(getClasses());
  }, [dispatch]);
  return (
    <ThemeProvider>
      <ScrollToTop />
      <BaseOptionChartStyle />
      <Router isAuth={isAuth} role={userInfo.role} />
    </ThemeProvider>
  );
}
