import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import UserCard from "../../../../components/UserCard";
import Iconify from "../components/Iconify";

const Students = () => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const userList = useSelector((state) => {
    return state.admin.usersApproved.student;
  });
  console.log(userList);

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4" gutterBottom style={{ color: "#ff808b" }}>
          Student List
        </Typography>
        <Link to="/dashboard/newuser" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Student
          </Button>
        </Link>
      </Stack>

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "5%",
        }}
      >
        {userList?.length === 0 ? (
          <p>No students yet</p>
        ) : (
          userList?.map((el) => (
            <UserCard
              id={el._id}
              firstName={el.firstName}
              lastName={el.lastName}
              email={el.email}
              image={el.profileImage}
            />
          ))
        )}
      </div>
    </>
  );
};

export default Students;
