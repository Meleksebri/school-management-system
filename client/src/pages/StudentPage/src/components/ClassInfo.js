import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import ClassIcon from "@mui/icons-material/Class";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import axios from "axios";
import { getClasses } from "../../../../slices/adminSlice";
import EditIcon from "@mui/icons-material/Edit";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { Link } from "react-router-dom";

const ClassInfo = ({ subject }) => {
  const teachers = useSelector((state) => {
    return state?.student?.teachers?.teacherlist;
  });

  const myteacher = teachers?.find((el) => el.subject === subject);
  console.log(teachers);
  return (
    <>
      <Card
        sx={{ width: "26%" }}
        style={{
          backgroundColor: "#0093E9",
          backgroundImage: "linear-gradient(160deg, #0093E9 0%, #80D0C7 55%)",
        }}
      >
        <CardContent>
          <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
            <Grid item>
              <Typography gutterBottom variant="h4">
                {subject}
              </Typography>

              <Typography color="textPrimary" variant="overline">
                {"Teacher : "}
              </Typography>
            </Grid>
            <Grid item>
              <ClassIcon
                sx={{
                  height: 40,
                  width: 40,
                }}
              ></ClassIcon>
            </Grid>
          </Grid>
          <Box
            sx={{
              pt: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography color="textSecondary" variant="subtitle1">
              <Link
                to={`/studentDashboard/teacher/${myteacher?._id}`}
                state={myteacher?._id}
                style={{ textDecoration: "none", color: "#696969" }}
              >
                {`${myteacher?.firstName} ${myteacher?.lastName}`}
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default ClassInfo;
