import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import "./auth.css";
import imageforsign from "../images/log.svg";
import imageforsign2 from "../images/register.svg";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../slices/userSlice";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const Auth = () => {
  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const {
    register: loginRegister,
    handleSubmit: handleLogin,
    formState: { errors: loginError },
  } = useForm();

  const { fields, append, remove } = useFieldArray({
    name: "NchildId",
    control,
  });

  const nchild = watch("NchildId");
  useEffect(() => {
    const currentProp = parseInt(nchild || 0);
    const previousProp = fields.length;
    if (currentProp > previousProp) {
      for (let i = previousProp; i < currentProp; i++) {
        append({ name: "" });
      }
    } else {
      for (let i = previousProp; i > currentProp; i--) {
        remove(i - 1);
      }
    }
  }, [nchild]);
  const role = watch("role");

  const [flag, setFlag] = useState(0);

  const clickHandle = (e) => {
    setFlag((prev) => prev ^ 1);
  };
  const onSubmit = (data) => {
    axios
      .post("/api/v1/users/register", data)
      .then((res) => {
        swal(
          "Done!",
          "Your register request has been sent successfully! Wait to be approved",
          "success"
        ).then(() => window.location.reload(false));

        console.log(res.data);
      })
      .catch((err) => {
        swal("Oops!", err.response.data.msg, "error");

        reset({ email: "" });
        console.log(err.response.data);
      });
  };

  const dispatch = useDispatch();
  const {
    errors: loginerror,
    isAuth,
    userInfo,
  } = useSelector((state) => state.user);

  const onSubmitLogin = (data) => {
    dispatch(loginUser(data));
    console.log(data);
  };
  const nav = useNavigate();
  useEffect(() => {
    if (isAuth && userInfo.role === "admin") nav("/dashboard");
    else if (isAuth && userInfo.role === "student") nav("/studentDashboard");
    else if (isAuth && userInfo.role === "parent") nav("/parentdashboard");
    else if (isAuth && userInfo.role === "teacher") nav("/teacherDashboard");
  }, [isAuth, nav, userInfo.role]);

  return (
    <div className={flag === 0 ? "container1" : "container1 sign-up-mode"}>
      <div className="forms-container" style={{ width: "100%" }}>
        <div className="signin-signup">
          <form className="sign-in-form">
            <h2 className="title" style={{ fontFamily: "poppins" }}>
              Sign in
            </h2>
            <div className="input-field">
              <i className="fas fa-user" />
              <input
                name="email"
                type="email"
                placeholder="Email"
                {...loginRegister("email", { required: true })}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock" />
              {/* <div
                      style={{
                        border: "0 solid #FFF",
                        borderLeftColor: "#acacac"
                      }}
                    > */}
              <input
                name="password"
                placeholder="Password"
                type="password"
                {...loginRegister("password", { required: true })}
              />

              {/* </div> */}
            </div>
            <p style={{ color: "red" }}>{loginerror && loginerror}</p>
            <input
              type="submit"
              value="Login"
              className="btnauth solid"
              onClick={handleLogin(onSubmitLogin)}
            />
          </form>
          <form class="sign-up-form">
            <h2 className="title" style={{ fontFamily: "poppins" }}>
              Sign up
            </h2>
            <div className="input-field">
              <i className="fas fa-user" />
              <input
                name="firstName"
                type="text"
                placeholder="First Name"
                {...register("firstName", { required: true })}
              />
            </div>
            <p style={{ color: "red" }}>
              {errors.firstName?.type === "required" &&
                "First Name is required"}
            </p>
            <div className="input-field">
              <i className="fas fa-user" />
              <input
                name="lastName"
                type="text"
                placeholder="Last Name"
                {...register("lastName", { required: true })}
              />
            </div>
            <p style={{ color: "red" }}>
              {errors.lastName?.type === "required" && "Last Name is required"}
            </p>
            <div className="input-field">
              <i className="fas fa-envelope" />
              <input
                name="email"
                type="email"
                placeholder="Email"
                {...register("email", {
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  required: true,
                })}
              />
            </div>
            <p style={{ color: "red" }}>
              {errors.email?.type === "required" && "Email is required"}
              {errors.email?.type === "pattern" && "Unvalid email"}
            </p>

            <div className="input-field">
              <i className="fas fa-phone" />
              <input
                type="text"
                name="phoneNumber"
                placeholder="Contact Number"
                {...register("phoneNumber", {
                  required: true,
                  pattern: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[\s\./0-9]*$/g,
                })}
              />
            </div>
            <p style={{ color: "red" }}>
              {errors.phoneNumber?.type === "required" &&
                "Phone Number is required"}
              {errors.phoneNumber?.type === "pattern" && "Unvalid phone number"}
            </p>
            <div className="input-field">
              <i className="fas fa-lock" />
              <input
                name="role"
                type="text"
                placeholder="Role"
                {...register("role", {
                  required: true,
                  pattern: /teacher|student|parent/g,
                })}
              />
            </div>
            <p style={{ color: "red" }}>
              {errors.role?.type === "required" && "Role is required"}
              {errors.role?.type === "pattern" &&
                "Role must be : student , parent or teacher"}
            </p>
            <input
              type="submit"
              class="btnauth"
              value="Sign up"
              onClick={handleSubmit(onSubmit)}
            />
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3 style={{ fontFamily: "poppins" }}>New here ?</h3>
            <p style={{ fontFamily: "poppins" }}>Then Sign Up and Start!</p>
            <button
              className="btnauth transparent"
              id="sign-up-btn"
              onClick={clickHandle}
              style={{ fontFamily: "poppins" }}
            >
              Sign up
            </button>
          </div>
          <img src={imageforsign} className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3 style={{ "font-family": "poppins" }}>One of us ?</h3>
            <p style={{ "font-family": "poppins" }}>
              Then Sign In and get Started!
            </p>
            <button
              className="btnauth transparent"
              id="sign-in-btn"
              onClick={clickHandle}
              style={{ "font-family": "poppins" }}
            >
              Sign in
            </button>
          </div>
          <img src={imageforsign2} className="image" alt="" />
        </div>
      </div>
    </div>
  );
};
export default Auth;
