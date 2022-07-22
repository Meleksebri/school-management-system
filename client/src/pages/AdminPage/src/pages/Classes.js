import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import { getClasses } from "../../../../slices/adminSlice";

import ClassInfo from "../components/ClassInfo";
import Iconify from "../components/Iconify";

const Classes = () => {
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
  const classList = useSelector((state) => {
    return state.admin.classrooms.classes;
  });
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    axios
      .post("/api/v1/admin/newclass", data)
      .then((res) => {
        swal(
          "Done!",
          "New Class has been added successfully !",
          "success"
        ).then(() => console.log(res));
      })
      .catch((err) => {
        swal("Oops!", err.response.data.msg, "error");
        reset({ classesName: "" });
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
            Add New Class
          </Typography>
          <hr></hr>
          <TextField
            id="outlined-basic"
            label="Class name"
            variant="outlined"
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
              Success
            </Button>
            <Button variant="outlined" color="error" onClick={handleClose}>
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4" gutterBottom style={{ color: "#ff808b" }}>
          Class List
        </Typography>

        <Button
          variant="contained"
          startIcon={<Iconify icon="eva:plus-fill" onClick={handleOpen} />}
        >
          New Class
        </Button>
      </Stack>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          alignContent: "space-around",
          gap: "40px",
        }}
      >
        {classList?.length === 0 ? (
          <h6>No Classes yet! Please add a class</h6>
        ) : (
          classList?.map((el) => (
            <ClassInfo
              id={el._id}
              name={el.classesName}
              number={el.students.length}
            />
          ))
        )}
      </div>
    </>
  );
};

export default Classes;
