import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { selectFields } from "express-validator/src/select-fields";
import swal from "sweetalert";
import axios from "axios";

import { LoadingButton } from "@mui/lab";
import { getUserInfo } from "../../../../slices/studentSlice";
const EditAccount = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const states = [
    {
      value: "Male",
      label: "Male",
    },
    {
      value: "Female",
      label: "Female",
    },
  ];
  const dispatch = useDispatch();

  const userf = useSelector((state) => {
    return state?.student?.userInfo?.user;
  });
  const { isAuth, userInfo } = useSelector((state) => state?.user);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(null);
  const navigate = useNavigate();
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("age", data.age);
    formData.append("gender", data.gender);
    console.log(file);
    setLoading(true);
    axios
      .put(`/api/v1/teacher/update/${userf?._id}`, formData)
      .then((res) => {
        swal("Done!", "User has been updated successfully !", "success").then(
          () => {
            setLoading(false);
            dispatch(getUserInfo(userInfo));
            navigate("/studentDashboard/app");
          }
        );
      })
      .catch((err) => {
        swal("Oops!", err.response.data.msg, "error");
        setLoading(false);
        console.log(err.response.data);
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
          Edit Profile
        </Typography>
      </Stack>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              <Card>
                <CardContent>
                  <Box
                    sx={{
                      alignItems: "center",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Avatar
                      src={userf?.profileImage}
                      sx={{
                        height: 64,
                        mb: 2,
                        width: 64,
                      }}
                    />
                    <Typography color="textPrimary" gutterBottom variant="h5">
                      {`${userf?.firstName} ${userf?.lastName}`.toUpperCase()}
                    </Typography>
                    <Typography color="textSecondary" variant="body2">
                      {userf?.role}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      variant="body2"
                      style={{ color: "green" }}
                    >
                      {"Approved"}
                    </Typography>
                  </Box>
                </CardContent>
                <Divider />
                <CardActions>
                  <label htmlFor="upload-photo" style={{ width: "100%" }}>
                    <input
                      style={{ display: "none" }}
                      id="upload-photo"
                      name="upload-photo"
                      type="file"
                      onChange={(e) => setFile(e.target.files[0])}
                      enctype="multipart/form-data"
                    />

                    <Button
                      color="secondary"
                      variant="contained"
                      component="span"
                      style={{ width: "100%" }}
                    >
                      Upload button
                    </Button>
                  </label>
                </CardActions>
              </Card>
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <form autoComplete="off" noValidate>
                <Card>
                  <CardHeader
                    subheader="The information can be edited"
                    title="Profile"
                  />
                  <br />
                  <Divider />
                  <CardContent>
                    <Grid container spacing={3}>
                      <Grid item md={6} xs={12}>
                        <TextField
                          fullWidth
                          name="firstName"
                          defaultValue={userf?.firstName}
                          variant="outlined"
                          {...register("firstName", { required: true })}
                        />
                        <p style={{ color: "red" }}>
                          {errors.firstName?.type === "required" &&
                            "First Name is required"}
                        </p>
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          fullWidth
                          name="lastName"
                          defaultValue={userf?.lastName}
                          variant="outlined"
                          {...register("lastName", { required: true })}
                        />
                        <p style={{ color: "red" }}>
                          {errors.lastName?.type === "required" &&
                            "Last Name is required"}
                        </p>
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          fullWidth
                          name="email"
                          defaultValue={userf?.email}
                          variant="outlined"
                          {...register("email", { required: true })}
                        />
                        <p style={{ color: "red" }}>
                          {errors.email?.type === "required" &&
                            "Email is required"}
                        </p>
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          fullWidth
                          name="phone"
                          type="number"
                          defaultValue={userf?.phoneNumber}
                          variant="outlined"
                          {...register("phoneNumber", { required: true })}
                        />
                        <p style={{ color: "red" }}>
                          {errors.phoneNumber?.type === "required" &&
                            "Phone Number is required"}
                        </p>
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          fullWidth
                          lable="Age"
                          name="age"
                          variant="outlined"
                          type="number"
                          defaultValue={userf?.age || ""}
                          {...register("age", { required: true })}
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          fullWidth
                          name="state"
                          select
                          defaultValue={userf?.gender}
                          SelectProps={{ native: true }}
                          variant="outlined"
                          {...register("gender", { required: true })}
                        >
                          {states.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </TextField>
                      </Grid>
                    </Grid>
                  </CardContent>
                  <Divider />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      p: 2,
                    }}
                  >
                    <LoadingButton
                      onClick={handleSubmit(onSubmit)}
                      loading={loading}
                      variant="contained"
                    >
                      Save Details
                    </LoadingButton>
                  </Box>
                </Card>
              </form>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default EditAccount;
