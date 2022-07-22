// component
import Iconify from "../../components/Iconify";

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: "dashboard",
    path: "/teacherDashboard/app",
    icon: getIcon("eva:pie-chart-2-fill"),
  },
  {
    title: "Students",
    path: "/teacherDashboard/students",
    icon: getIcon("ph:student-bold"),
  },
  {
    title: "Attendance",
    path: "/teacherDashboard/attendance",
    icon: getIcon("fluent:presenter-24-filled"),
  },
  {
    title: "Exams",
    path: "/teacherDashboard/exam",
    icon: getIcon("healthicons:i-exam-multiple-choice"),
  },
  {
    title: "Marks",
    path: "/teacherDashboard/marks",
    icon: getIcon("ph:exam-fill"),
  },
  {
    title: "Homework",
    path: "/teacherDashboard/homework",
    icon: getIcon("icon-park-solid:notebook-and-pen"),
  },
  {
    title: "Calender",
    path: "/teacherDashboard/calender",
    icon: getIcon("uis:calender"),
  },
  {
    title: "Kanban",
    path: "/teacherDashboard/kanban",
    icon: getIcon("fluent:clipboard-task-list-rtl-24-filled"),
  },
];

export default navConfig;
