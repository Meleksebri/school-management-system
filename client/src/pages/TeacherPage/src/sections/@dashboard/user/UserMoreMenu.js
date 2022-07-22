import { useRef, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
// material
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  Modal,
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";
// component
import Iconify from "../../../components/Iconify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getExams } from "../../../../../../slices/teacherSlice";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import swal from "sweetalert";

// ----------------------------------------------------------------------

export default function UserMoreMenu({ id, name, dateOf, totalMark }) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const subject = useSelector((state) => {
    return state?.teacher?.userInfo?.user?.subject;
  });
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
          .delete(`/api/v1/teacher/deleteExam/${id}`)
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
        dispatch(getExams(subject));
      }
    });
  };
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

  const onSubmit = (data) => {
    axios
      .put(`/api/v1/teacher/updateexam/${id}`, data)
      .then((res) => {
        swal("Done!", "Exam has been updated successfully !", "success").then(
          () => console.log(res)
        );
      })
      .catch((err) => {
        swal("Oops!", err.response.data.msg, "error");
      });
    dispatch(getExams(subject));
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
            Edit Exam
          </Typography>
          <hr></hr>
          <TextField
            id="outlined-basic"
            label="Exam name"
            defaultValue={name}
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
            defaultValue={dateOf}
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
            defaultValue={totalMark}
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

      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: "100%" },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem sx={{ color: "text.secondary" }} onClick={handleDelete}>
          <ListItemIcon>
            <Iconify icon="eva:trash-2-outline" width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary="Delete"
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>
        <MenuItem sx={{ color: "text.secondary" }} onClick={handleOpen}>
          <ListItemIcon>
            <Iconify icon="ant-design:edit-outlined" width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary="Edit"
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>
      </Menu>
    </>
  );
}
