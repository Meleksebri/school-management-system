import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Label from "../components/Label";

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
  const [marked, setMarked] = useState(false);

  const subject = useSelector((state) => {
    return state?.student?.myClass?.classr?.subject;
  });

  const exams = useSelector((state) => {
    return state?.student?.exams?.examlist;
  });

  const myid = useSelector((state) => {
    return state?.student?.userInfo?.user?._id;
  });

  const [mysubject, setMysubject] = useState(null);
  console.log(mysubject);
  const handleChange = (event) => {
    setMysubject(event.target.value);
    setMarked(true);
  };
  if (mysubject) {
    var myexam = exams?.filter((el) => el.subject === mysubject);
  }

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4" gutterBottom style={{ color: "#ff808b" }}>
          Exam's Marks
        </Typography>
      </Stack>

      <Box
        sx={{ minWidth: 120 }}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FormControl style={{ width: "20%" }}>
          <InputLabel id="demo-simple-select-label">Subject</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Subject"
            onChange={handleChange}
          >
            {subject?.map((el) => (
              <MenuItem value={el}>{el}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <br />
      <br />
      {marked ? (
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 700 }}
            aria-label="customized table"
            style={{ width: "50%", margin: "auto" }}
          >
            <TableHead>
              <TableRow>
                <StyledTableCell>Exam's Name</StyledTableCell>
                <StyledTableCell align="right">Total Mark</StyledTableCell>
                <StyledTableCell align="right">Your Mark</StyledTableCell>
                <StyledTableCell align="right">Percentage</StyledTableCell>
                <StyledTableCell align="right">Status</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {myexam?.map((row, i) => (
                <StyledTableRow key={i}>
                  <StyledTableCell component="th" scope="row">
                    {row?.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row?.totalMark}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row?.marks[myid]}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {`${Math.round(
                      (row?.marks[myid] / row?.totalMark) * 100
                    )}%`}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Label
                      variant="ghost"
                      color={
                        (Math.round(
                          (row?.marks[myid] / row?.totalMark) * 100
                        ) >=
                          50 ===
                          false &&
                          "error") ||
                        "success"
                      }
                    >
                      {Math.round((row?.marks[myid] / row?.totalMark) * 100) >=
                      50
                        ? "Passed"
                        : "Failed"}
                    </Label>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <></>
      )}
    </>
  );
};

export default Marks;
