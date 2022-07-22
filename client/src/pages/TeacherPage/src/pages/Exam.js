import { filter } from "lodash";
import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
  Card,
  Table,
  Avatar,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  TableContainer,
  TablePagination,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Iconify from "../components/Iconify";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import swal from "sweetalert";
import { DataGrid } from "@mui/x-data-grid";
import {
  UserListHead,
  UserListToolbar,
  UserMoreMenu,
} from "../sections/@dashboard/user";
import Label from "../components/Label";
import Scrollbar from "../components/Scrollbar";

import SearchNotFound from "../components/SearchNotFound";
import { getExams } from "../../../../slices/teacherSlice";

const TABLE_HEAD = [
  { id: "name", label: "Name", alignRight: false },
  { id: "class", label: "Class", alignRight: false },
  { id: "subject", label: "Subject", alignRight: false },
  { id: "date", label: "Date", alignRight: false },
  { id: "total mark", label: "Total Mark", alignRight: false },
  { id: "" },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis?.map((el) => el[0]);
}

const Exam = () => {
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
    const input = { ...data, classname: claas, subject };
    axios
      .post("/api/v1/teacher/newexam", input)
      .then((res) => {
        swal("Done!", "New Exam has been added successfully !", "success").then(
          () => {
            handleClose();
          }
        );
      })
      .catch((err) => {
        swal("Oops!", err.response.data.msg, "error");
      });
    dispatch(getExams(subject));
  };
  const USERLIST = useSelector((state) => {
    return state.teacher?.exams?.exams;
  });
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST?.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST?.length) : 0;

  const filteredUsers = applySortFilter(
    USERLIST,
    getComparator(order, orderBy),
    filterName
  );

  const isUserNotFound = filteredUsers?.length === 0;

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
            Add New Exam
          </Typography>
          <hr></hr>
          <TextField
            id="outlined-basic"
            label="Exam name"
            variant="outlined"
            style={{ width: "100%" }}
            {...register("name", { required: true })}
          />
          <p style={{ color: "red", textAlign: "center" }}>
            {errors.name?.type === "required" && "Exam Name is required"}
          </p>
          <TextField
            id="date"
            label="Exam's date"
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
            label="Total Marks"
            variant="outlined"
            type="number"
            style={{ width: "100%" }}
            {...register("totalMark", { required: true })}
          />
          <p style={{ color: "red", textAlign: "center" }}>
            {errors.totalMark?.type === "required" && "Total Mark is required"}
          </p>
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
          Exam List
        </Typography>

        <Button
          variant="contained"
          startIcon={<Iconify icon="eva:plus-fill" onClick={handleOpen} />}
        >
          New Exam
        </Button>
      </Stack>

      <Card>
        <UserListToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <UserListHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={USERLIST?.length}
                numSelected={selected?.length}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
              />
              <TableBody>
                {filteredUsers
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  ?.map((row) => {
                    const { _id, name, subject, classname, totalMark, dateOf } =
                      row;
                    const isItemSelected = selected.indexOf(name) !== -1;

                    return (
                      <TableRow
                        hover
                        key={_id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            onChange={(event) => handleClick(event, name)}
                          />
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={2}
                          >
                            <Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{classname}</TableCell>
                        <TableCell align="left">{subject}</TableCell>
                        <TableCell align="left">{dateOf}</TableCell>
                        <TableCell align="left">{totalMark}</TableCell>

                        <TableCell align="right">
                          <UserMoreMenu
                            id={_id}
                            name={name}
                            dateOf={dateOf}
                            totalMark={totalMark}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>

              {isUserNotFound && (
                <TableBody>
                  <TableRow>
                    <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                      <SearchNotFound searchQuery={filterName} />
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          component="div"
          count={USERLIST?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </>
  );
};

export default Exam;
