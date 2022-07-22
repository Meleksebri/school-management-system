import { faker } from "@faker-js/faker";
// @mui
import { useTheme } from "@mui/material/styles";
import { Grid, Container, Typography } from "@mui/material";
// components
import Page from "../components/Page";
import Iconify from "../components/Iconify";
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from "../sections/@dashboard/app";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getApprovedUsers } from "../../../../slices/adminSlice";

import {
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject,
} from "@syncfusion/ej2-react-schedule";
import "../../../../../node_modules/@syncfusion/ej2-base/styles/material.css";
import "../../../../../node_modules/@syncfusion/ej2-buttons/styles/material.css";
import "../../../../../node_modules/@syncfusion/ej2-calendars/styles/material.css";
import "../../../../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css";
import "../../../../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
import "../../../../../node_modules/@syncfusion/ej2-lists/styles/material.css";
import "../../../../../node_modules/@syncfusion/ej2-navigations/styles/material.css";
import "../../../../../node_modules/@syncfusion/ej2-popups/styles/material.css";
import "../../../../../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css";
import "../../../../../node_modules/@syncfusion/ej2-react-schedule/styles/material.css";
// ----------------------------------------------------------------------
import { PieChart } from "react-minimal-pie-chart";
import { getClasses } from "../../../../slices/teacherSlice";

export default function DashboardApp() {
  var todayDate = new Date().toISOString().slice(0, 10).split("-");
  const data = [
    {
      Id: 2,
      Subject: "Meeting",
      StartTime: new Date(+todayDate[0], +todayDate[1], +todayDate[2], 10, 0),
      EndTime: new Date(+todayDate[0], +todayDate[1], +todayDate[2], 12, 30),
      IsAllDay: false,
      Status: "Completed",
      Priority: "High",
    },
    {
      Id: 1,
      Subject: "Class course",
      StartTime: new Date(
        +todayDate[0],
        +todayDate[1],
        +todayDate[2] - 3,
        9,
        0
      ),
      EndTime: new Date(+todayDate[0], +todayDate[1], +todayDate[2] - 3, 12, 0),
      IsAllDay: false,
    },
    {
      Id: 3,
      Subject: "Class practical work",
      StartTime: new Date(
        +todayDate[0],
        +todayDate[1],
        +todayDate[2] - 2,
        14,
        0
      ),
      EndTime: new Date(
        +todayDate[0],
        +todayDate[1],
        +todayDate[2] - 2,
        16,
        30
      ),
      IsAllDay: false,
    },
    {
      Id: 4,
      Subject: "Class course",
      StartTime: new Date(
        +todayDate[0],
        +todayDate[1],
        +todayDate[2] - 4,
        14,
        0
      ),
      EndTime: new Date(+todayDate[0], +todayDate[1], +todayDate[2] - 4, 17, 0),
      IsAllDay: false,
    },
    {
      Id: 5,
      Subject: "Revision",
      StartTime: new Date(
        +todayDate[0],
        +todayDate[1],
        +todayDate[2] - 2,
        10,
        0
      ),
      EndTime: new Date(+todayDate[0], +todayDate[1], +todayDate[2] - 2, 12, 0),
      IsAllDay: false,
    },
  ];

  const piedata = {
    series: [44, 55, 41, 17, 15],
    options: {
      chart: {
        type: "donut",
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getApprovedUsers());
    dispatch(getClasses());
  }, [dispatch]);
  const theme = useTheme();
  const users = useSelector((state) => {
    return state.admin.usersApproved;
  });
  const myClass = useSelector((state) => {
    return state.teacher.teacherclass.classro;
  });
  const classList = useSelector((state) => {
    return state.teacher.classrooms.classes;
  });

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="My Students"
              total={myClass?.students?.length}
              icon={"icons8:student"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Teachers"
              total={users?.teacher?.length}
              color="info"
              icon={"fa-solid:chalkboard-teacher"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Parents"
              total={users?.parent?.length}
              color="warning"
              icon={"ri:parent-line"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Classrooms"
              total={classList?.length}
              color="error"
              icon={"arcticons:classroom"}
            />
          </Grid>

          <Grid item style={{ marginTop: "4%" }}>
            <ScheduleComponent
              height="550px"
              selectedDate={
                new Date(+todayDate[0], +todayDate[1], +todayDate[2])
              }
              eventSettings={{
                dataSource: data,
                fields: {
                  id: "Id",
                  subject: { name: "Subject" },
                  isAllDay: { name: "IsAllDay" },
                  startTime: { name: "StartTime" },
                  endTime: { name: "EndTime" },
                },
              }}
            >
              <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
            </ScheduleComponent>
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <AppCurrentSubject
              title="My Attendance"
              chartData={[
                { title: "Present", value: 70, color: "#88B04B" },
                { title: "Absent", value: 30, color: "#955251" },
              ]}
              chartColors={[...Array(6)].map(
                () => theme.palette.text.secondary
              )}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <AppCurrentSubject
              title="Students Gender Percentage"
              chartData={[
                { title: "Male", value: 60, color: "#E38627" },
                { title: "Female", value: 40, color: "#C13C37" },
              ]}
              chartColors={[...Array(6)].map(
                () => theme.palette.text.secondary
              )}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8} style={{ margin: "auto" }}>
            <AppTasks
              title="Tasks"
              list={[
                { id: "1", label: "Correct Students exams" },
                { id: "2", label: "Go to meeting" },
                { id: "3", label: "Prepare exam" },
                { id: "4", label: "Scoping & Estimations" },
                { id: "5", label: "Talk to the parents" },
                { id: "6", label: "Mark attendance" },
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
