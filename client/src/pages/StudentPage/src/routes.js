import { Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";

//

import DashboardApp from "./pages/DashboardApp";
import Page404 from "./pages/Page404";

import Calender from "../../../components/Calender";

import Kanban from "./pages/Kanban";
import Homework from "./pages/Homework";
import HomeworkDetails from "./components/HomeworkDetails";
import Subject from "./pages/Subject";
import Teacher from "./pages/Teacher";
import Exam from "./pages/Exam";
import Marks from "./pages/Marks";
import EditAccount from "./pages/EditAccount";

// ----------------------------------------------------------------------

export default function Router({ isAuth, role }) {
  return useRoutes([
    {
      path: "/studentDashboard",
      element: isAuth && role === "student" ? <DashboardLayout /> : <Page404 />,
      children: [
        { path: "app", element: <DashboardApp /> },

        { path: "calender", element: <Calender /> },
        { path: "homework", element: <Homework /> },
        { path: "subject", element: <Subject /> },

        { path: "details/:id", element: <HomeworkDetails /> },
        { path: "teacher/:id", element: <Teacher /> },
        { path: "exam", element: <Exam /> },
        { path: "marks", element: <Marks /> },
        { path: "editprofile", element: <EditAccount /> },

        { path: "kanban", element: <Kanban /> },
        { path: "*", element: <Page404 /> },
      ],
    },
  ]);
}
