import {
  Box,
  Button,
  IconButton,
  MenuItem,
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
import { getHomeworks } from "../../../../slices/teacherSlice";
import Iconify from "../components/Iconify";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import Label from "../components/Label";
import Swal from "sweetalert2";
import DeleteHomework from "../components/DeleteHomework";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Homework = () => {
  const rows = useSelector((state) => {
    return state?.teacher?.homework?.homeworks;
  });
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: 600,
    bgcolor: "background.paper",

    boxShadow: 24,
    p: 4,
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
  const subject = useSelector((state) => {
    return state?.teacher?.userInfo?.user?.subject;
  });
  const claas = useSelector((state) => {
    return state?.teacher?.teacherclass?.classro?.classesName;
  });
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    const input = { ...data, subject, classname: claas };
    axios
      .post("/api/v1/teacher/newhomework", input)
      .then((res) => {
        swal(
          "Done!",
          "New Homework has been added successfully !",
          "success"
        ).then(() => {
          handleClose();
          dispatch(getHomeworks(subject));
        });
      })
      .catch((err) => {
        swal("Oops!", err.response.data.msg, "error");
      });
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
            Add New Homework
          </Typography>
          <hr></hr>
          <TextField
            id="outlined-basic"
            label="Homework name"
            variant="outlined"
            style={{ width: "100%" }}
            {...register("name", { required: true })}
          />
          <p style={{ color: "red", textAlign: "center" }}>
            {errors.name?.type === "required" && "Homework Name is required"}
          </p>
          <TextField
            id="date"
            label="Due Date"
            type="date"
            style={{ width: "100%" }}
            InputLabelProps={{
              shrink: true,
            }}
            {...register("dateOf", { required: true })}
          />
          <p style={{ color: "red", textAlign: "center" }}>
            {errors.dateOf?.type === "required" && "Exam's date is required"}
          </p>
          <TextField
            id="outlined-basic"
            label="Homework description"
            variant="outlined"
            multiline
            style={{ width: "100%" }}
            {...register("description", { required: true })}
          />
          <p style={{ color: "red", textAlign: "center" }}>
            {errors.description?.type === "required" &&
              "Description is required"}
          </p>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              gap: "15px",
            }}
          >
            <TextField
              id="outlined-basic"
              label="Option A"
              variant="outlined"
              style={{ width: "45%" }}
              {...register("optionA", { required: true })}
            />

            <TextField
              id="outlined-basic"
              label="Option B"
              variant="outlined"
              style={{ width: "45%" }}
              {...register("optionB", { required: true })}
            />
            <TextField
              id="outlined-basic"
              label="Option C"
              variant="outlined"
              style={{ width: "45%" }}
              {...register("optionC", { required: true })}
            />
            <TextField
              id="outlined-basic"
              label="Option D"
              style={{ width: "45%" }}
              variant="outlined"
              {...register("optionD", { required: true })}
            />
          </Box>
          <TextField
            id="outlined-select-currency"
            select
            label="Correct answer"
            style={{ width: "100%", marginTop: "15px" }}
            {...register("correct", { required: true })}
          >
            <MenuItem value={"A"}>A</MenuItem>
            <MenuItem value={"B"}>B</MenuItem>
            <MenuItem value={"C"}>C</MenuItem>
            <MenuItem value={"D"}>D</MenuItem>
          </TextField>
          <hr style={{ border: "none" }} />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="contained"
              color="success"
              onClick={handleSubmit(onSubmit)}
            >
              Submit
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
          Homework List
        </Typography>

        <Button
          variant="contained"
          startIcon={<Iconify icon="eva:plus-fill" onClick={handleOpen} />}
        >
          New Homework
        </Button>
      </Stack>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell align="right">option A</StyledTableCell>
              <StyledTableCell align="right">option B</StyledTableCell>
              <StyledTableCell align="right">option C</StyledTableCell>
              <StyledTableCell align="right">option D</StyledTableCell>
              <StyledTableCell align="right">Correct Answer</StyledTableCell>
              <StyledTableCell align="right">Due Date</StyledTableCell>
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row, i) => (
              <StyledTableRow key={i}>
                <StyledTableCell component="th" scope="row">
                  {row.description}
                </StyledTableCell>
                <StyledTableCell align="right">{row.optionA}</StyledTableCell>
                <StyledTableCell align="right">{row.optionB}</StyledTableCell>
                <StyledTableCell align="right">{row.optionC}</StyledTableCell>
                <StyledTableCell align="right">{row.optionD}</StyledTableCell>
                <StyledTableCell align="right">{row.correct}</StyledTableCell>
                <StyledTableCell align="right">
                  <Label variant="ghost" color="error">
                    {row.dateOf}
                  </Label>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <DeleteHomework id={row._id} />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Homework;
