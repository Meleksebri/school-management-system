import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Box } from "@mui/system";
import axios from "axios";
import swal from "sweetalert";

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

const Marks = () => {
  const rows = useSelector((state) => {
    return state?.teacher?.teacherclass?.classro?.students;
  });
  const exams = useSelector((state) => {
    return state?.teacher?.exams?.exams;
  });

  const [pickedExam, setPickedExam] = useState(null);
  const handleChange = (event) => {
    setPickedExam(event.target.value);
  };

  if (pickedExam) {
    var myexam = exams?.find((el) => el.name === pickedExam);
  }
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const input = { examname: pickedExam, exammarks: data };
    axios
      .put("/api/v1/teacher/submitmarks", input)
      .then((res) => {
        swal(
          "Done!",
          "Exam's Marks has been submitted successfully !",
          "success"
        ).then(() => console.log(res));
      })
      .catch((err) => {
        swal("Oops!", err.response.data.msg, "error");
      });
  };
  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4" gutterBottom style={{ color: "#ff808b" }}>
          Student's Marks
        </Typography>
      </Stack>
      <Stack spacing={2} style={{ width: "20%", margin: "auto" }}>
        <TextField
          id="outlined-select-currency"
          select
          label="Please select exam"
          onChange={handleChange}
        >
          {exams?.map((option, i) => (
            <MenuItem key={i} value={option.name}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
      </Stack>
      <br />
      <br />
      {pickedExam ? (
        <>
          <TableContainer
            component={Paper}
            style={{ width: "70%", margin: "auto" }}
          >
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Full Name</StyledTableCell>
                  <StyledTableCell align="right">Class</StyledTableCell>
                  <StyledTableCell align="right">Gender</StyledTableCell>
                  <StyledTableCell align="right">Total Mark</StyledTableCell>
                  <StyledTableCell align="right">Mark</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows?.map((row, i) => {
                  const myemail = row?._id;
                  const markassigned = Object.entries(myexam?.marks)?.find(
                    (el) => el[0]?.includes(myemail)
                  )[1];
                  console.log(markassigned);
                  return (
                    <StyledTableRow key={i}>
                      <StyledTableCell component="th" scope="row">
                        {`${row.firstName} ${row.lastName}`}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.classIn}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.gender}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {myexam?.totalMark}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <input
                          defaultValue={markassigned || ""}
                          type="number"
                          id="mark"
                          name="mark"
                          min="0"
                          max={myexam?.totalMark}
                          {...register(row._id, { required: true })}
                        />
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <br />
          <Box m={1} display="flex" justifyContent="center" alignItems="center">
            <Button
              variant="contained"
              color="success"
              style={{ width: "10%" }}
              onClick={handleSubmit(onSubmit)}
            >
              Submit
            </Button>
          </Box>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Marks;
