import { Button } from "@mui/material";
import axios from "axios";
import React from "react";
import Swal from "sweetalert2";
import DeleteIcon from "@mui/icons-material/Delete";
import { getHomeworks } from "../../../../slices/teacherSlice";
import { useDispatch, useSelector } from "react-redux";

const DeleteHomework = ({ id }) => {
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
        Swal.fire("Deleted!", "Homework has been deleted.", "success");
        axios
          .delete(`/api/v1/teacher/delete/${id}`)
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
        dispatch(getHomeworks(subject));
      }
    });
  };
  return (
    <Button
      variant="outlined"
      startIcon={<DeleteIcon />}
      onClick={handleDelete}
      color="error"
    >
      Delete
    </Button>
  );
};

export default DeleteHomework;
