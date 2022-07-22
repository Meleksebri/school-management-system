import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Iconify from "../components/Iconify";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import axios from "axios";
import { getClasses } from "../../../../slices/adminSlice";

const Subjects = () => {
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
      .post("/api/v1/admin/newsubject", data)
      .then((res) => {
        swal(
          "Done!",
          "New Subject has been added successfully !",
          "success"
        ).then(() => console.log(res));
      })
      .catch((err) => {
        swal("Oops!", err.response.data.msg, "error");
        reset({ subjectName: "" });
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
            Assign New Subject
          </Typography>
          <hr></hr>
          <FormControl style={{ width: "100%", marginBottom: "10px" }}>
            <InputLabel id="demo-simple-select-label">Class Name</InputLabel>
            <Select
              label="Class Name"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              {...register("classname", { required: true })}
            >
              {classList?.map((classroomm, i) => (
                <MenuItem key={i} value={classroomm.classesName}>
                  {classroomm.classesName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            id="outlined-basic"
            label="Subject Name"
            variant="outlined"
            style={{ width: "100%" }}
            {...register("subjectName", { required: true })}
          />
          <p style={{ color: "red" }}>
            {errors.subjectName?.type === "required" &&
              "Subject Name is required"}
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
          Classes with subjects
        </Typography>

        <Button
          variant="contained"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleOpen}
        >
          Assign Subject
        </Button>
      </Stack>

      {classList?.length === 0 ? (
        <p>No Classes yet ! Add first !!</p>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            flexWrap: "wrap",
            alignContent: "space-around",
            rowGap: "40px",
          }}
        >
          {classList?.map((el, i) => (
            <Card key={i} style={{ width: "40%" }}>
              <CardHeader style={{ color: "black" }} title={el.classesName} />
              <CardContent>
                <table
                  style={{ width: "100%", backgroundColor: "transparent" }}
                >
                  <tbody>
                    <tr
                      style={{
                        color: "orange",
                        backgroundColor: "rgba(0,0,0,.05)",
                      }}
                    >
                      <th style={{ padding: "10px" }}>Subject</th>
                      <th>Marks</th>
                    </tr>
                    {el?.subject?.length === 0 ? (
                      <p style={{ textAlign: "center", padding: "10px" }}>
                        No subjects yet!
                      </p>
                    ) : (
                      el?.subject?.map((elem) => (
                        <tr>
                          <td style={{ padding: "10px" }}>{elem}</td>
                          <td>20</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  );
};

export default Subjects;
