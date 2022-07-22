import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import UserCard from "../../../../components/UserCard";
import Iconify from "../components/Iconify";

const Parents = () => {
  const userList = useSelector((state) => {
    return state.admin.usersApproved.parent;
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
          Parents List
        </Typography>
        <Link to="/dashboard/newuserp" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Parent
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
        {userList.length === 0 ? (
          <h2>No parents yet</h2>
        ) : (
          userList.map((el) => (
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

export default Parents;
