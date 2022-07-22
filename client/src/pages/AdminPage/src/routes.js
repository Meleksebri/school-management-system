import { Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";

//

import User from "./pages/User";

import NotFound from "./pages/Page404";

import Students from "./pages/Students";
import DashboardApp from "./pages/DashboardApp";
import Page404 from "./pages/Page404";
import Auth from "../../../components/Auth";
import AddUserForm from "../../../components/AddUserForm";
import Teachers from "./pages/Teachers";
import Parents from "./pages/Parents";
import Calender from "../../../components/Calender";
import UserInfo from "../../../components/UserInfo";
import Subjects from "./pages/Subjects";
import Classes from "./pages/Classes";
import ClassStudentList from "../../../components/ClassStudentList";
import EditAccount from "../../../components/EditAccount";
import Attendance from "./pages/Attendance";
import Kanban from "./pages/Kanban";

// ----------------------------------------------------------------------

export default function Router({ isAuth, role }) {
  return useRoutes([
    {
      path: "/dashboard",
      element: isAuth && role === "admin" ? <DashboardLayout /> : <Page404 />,
      children: [
        { path: "app", element: <DashboardApp /> },
        { path: "user", element: <User /> },
        { path: "students", element: <Students /> },

        { path: "newuser", element: <AddUserForm UserRole="student" /> },
        { path: "newusert", element: <AddUserForm UserRole="teacher" /> },
        { path: "newuserp", element: <AddUserForm UserRole="parent" /> },
        { path: ":id", element: <UserInfo /> },
        { path: "teachers", element: <Teachers /> },
        { path: "classes", element: <Classes /> },
        { path: "subjects", element: <Subjects /> },
        { path: "parents", element: <Parents /> },
        { path: "calender", element: <Calender /> },
        { path: "classes/class/:id", element: <ClassStudentList /> },
        { path: "students/profile/:id", element: <EditAccount /> },
        { path: "markattendance", element: <Attendance /> },
        { path: "kanban", element: <Kanban /> },
        { path: "*", element: <Page404 /> },
      ],
    },
  ]);
}
