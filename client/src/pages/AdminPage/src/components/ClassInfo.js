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
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import axios from "axios";
import { getClasses } from "../../../../slices/adminSlice";
import EditIcon from "@mui/icons-material/Edit";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { Link } from "react-router-dom";

const ClassInfo = ({ id, name, number }) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Class has been deleted.", "success");
        axios
          .delete(`/api/v1/admin/class/${id}`, {
            headers: { token: localStorage.getItem("token") },
          })
          .then((res) => {
            dispatch(getClasses());
          })
          .catch((err) => console.log(err));
      }
    });
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",

    boxShadow: 24,
    p: 4,
  };
  const onSubmit = (data) => {
    axios
      .put(`/api/v1/admin/class/update/${id}`, data)
      .then((res) => {
        swal("Done!", "Class has been updated successfully !", "success").then(
          () => console.log(res)
        );
      })
      .catch((err) => {
        swal("Oops!", err.response.data.msg, "error");
      });
    dispatch(getClasses());
    handleClose();
  };
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ textAlign: "center", color: "#DB7093" }}
          >
            Update Class
          </Typography>
          <hr></hr>
          <TextField
            defaultValue={name}
            id="outlined-basic"
            variant="outlined"
            label="Class Name"
            style={{ width: "100%" }}
            {...register("classesName", { required: true })}
          />
          <p style={{ color: "red" }}>
            {errors.classesName?.type === "required" &&
              "Class Name is required"}
          </p>

          <hr style={{ border: "none" }} />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="contained"
              color="success"
              onClick={handleSubmit(onSubmit)}
            >
              UPDATE
            </Button>
            <Button variant="outlined" color="error" onClick={handleClose}>
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>

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
              <Typography gutterBottom variant="overline">
                <Link
                  to={`class/${id}`}
                  state={id}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  {name}
                </Link>
              </Typography>
              <hr></hr>
              <Typography color="textPrimary" variant="h4">
                {number}
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
              Students
            </Typography>
            <div>
              <IconButton
                aria-label="delete"
                style={{ color: "#D2042D" }}
                onClick={handleDelete}
              >
                <DeleteIcon style={{ width: "20px" }} />
              </IconButton>
              <IconButton aria-label="edit">
                <EditIcon style={{ width: "20px" }} onClick={handleOpen} />
              </IconButton>
            </div>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default ClassInfo;
