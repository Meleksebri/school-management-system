// component
import Iconify from "../../components/Iconify";

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: "dashboard",
    path: "/dashboard/app",
    icon: getIcon("eva:pie-chart-2-fill"),
  },
  {
    title: "user",
    path: "/dashboard/user",
    icon: getIcon("eva:people-fill"),
  },
  {
    title: "Students",
    path: "/dashboard/students",
    icon: getIcon("ph:student-fill"),
  },
  {
    title: "Teachers",
    path: "/dashboard/teachers",
    icon: getIcon("fa-solid:chalkboard-teacher"),
  },
  {
    title: "Parents",
    path: "/dashboard/parents",
    icon: getIcon("raphael:parent"),
  },
  {
    title: "Classes",
    path: "/dashboard/classes",
    icon: getIcon("healthicons:i-training-class"),
  },
  {
    title: "Subjects",
    path: "/dashboard/subjects",
    icon: getIcon("ic:round-flight-class"),
  },
  {
    title: "Attendance",
    path: "/dashboard/markattendance",
    icon: getIcon("bxs:hand"),
  },

  {
    title: "Calender",
    path: "/dashboard/calender",
    icon: getIcon("uis:calender"),
  },
  {
    title: "Kanban",
    path: "/dashboard/kanban",
    icon: getIcon("fluent:clipboard-task-list-rtl-24-filled"),
  },
];

export default navConfig;
