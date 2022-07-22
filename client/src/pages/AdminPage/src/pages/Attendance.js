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
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Swal from "sweetalert2";
import { DesktopDatePicker } from "@mui/lab";

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

const Attendance = () => {
  const [marked, setMarked] = useState(false);
  const [update, setUpdate] = useState(false);

  const rows = useSelector((state) => {
    return state.admin.usersApproved.student;
  });
  const [value, setValue] = useState(null);

  const handleChange = (newValue) => {
    setValue(newValue);
    setMarked(true);
    setUpdate(false);
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
          Mark Employee attendance
        </Typography>
      </Stack>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack spacing={2} style={{ width: "30%", margin: "auto" }}>
          <DesktopDatePicker
            label="Pick attendance date"
            value={value}
            onChange={handleChange}
            inputFormat="MM/dd/yyyy"
            renderInput={(params) => <TextField {...params} />}
          />
        </Stack>
      </LocalizationProvider>
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
                <StyledTableCell>Full Name</StyledTableCell>
                <StyledTableCell align="right">Role</StyledTableCell>
                <StyledTableCell align="right">Status</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows?.map((row, i) => (
                <StyledTableRow key={i}>
                  <StyledTableCell component="th" scope="row">
                    {`${row?.firstName} ${row?.lastName}`}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row?.role}</StyledTableCell>
                  <StyledTableCell align="right">
                    <input
                      type="radio"
                      name={`p${i}`}
                      id={`p${i}`}
                      style={{
                        transform: "scale(1.7)",
                        marginRight: "5px",
                      }}
                      className="present"
                      required
                    />
                    <label
                      for={`p${i}`}
                      style={{
                        position: "relative",
                        left: "-15px",
                        top: "-4px",
                        fontSize: "8pt",
                        opacity: "1",
                        color: "green",
                      }}
                    >
                      P
                    </label>
                    <input
                      type="radio"
                      name={`p${i}`}
                      id={`a${i}`}
                      style={{ transform: "scale(1.7)" }}
                      className="absent"
                      required
                    />
                    <label
                      for={`a${i}`}
                      style={{
                        position: "relative",
                        left: "-11px",
                        top: "-4px",
                        fontSize: "8pt",
                        opacity: "0.9",
                        color: "red",
                      }}
                    >
                      A
                    </label>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
          <br />
          <br />
          <Box m={1} display="flex" justifyContent="center" alignItems="center">
            {update ? (
              <Button
                variant="contained"
                color="primary"
                sx={{ height: 40 }}
                style={{ width: "15%" }}
                onClick={() => {
                  Swal.fire("Done!", "Employee Attendance updated!", "success");
                }}
              >
                Update
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                sx={{ height: 40 }}
                style={{ width: "15%" }}
                onClick={() => {
                  setUpdate(true);
                  Swal.fire(
                    "Done!",
                    `Employee Attendance marked for ${value}`,
                    "success"
                  );
                }}
              >
                Submit
              </Button>
            )}
          </Box>
        </TableContainer>
      ) : (
        <></>
      )}
    </>
  );
};

export default Attendance;
