import React from "react";
import "./AddUserForm.css";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import axios from "axios";
import { useSelector } from "react-redux";

const AddUserForm = ({ UserRole }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const input = { ...data, role: UserRole };
    console.log(input);
    axios
      .post("/api/v1/admin/newUser", input)
      .then((res) => {
        swal("Done!", "User has been added successfully !", "success").then(
          () => {
            window.location.reload(false);
            console.log(res.data);
          }
        );
      })
      .catch((err) => {
        swal("Oops!", err.response.data.msg, "error");

        reset({ email: "" });
        console.log(err.response.data);
      });
  };
  const style = {
    backgroundSize: "cover",
    width: "50vw",

    display: "grid",
    alignItems: "center",
    justifyItems: "center",
    marginLeft: "20%",
  };
  const classroom = useSelector((state) => {
    return state?.admin?.classrooms?.classes;
  });

  const subj = classroom?.map((el) => el.subject);
  if (subj) {
    var subject = [].concat(...subj);
  }

  return (
    <div className="contact-us" style={style}>
      <form className="userForm">
        <input
          className="inputForm"
          placeholder="First Name"
          type="text"
          {...register("firstName", { required: true })}
        />
        <p style={{ color: "red" }}>
          {errors.firstName?.type === "required" && "First Name is required"}
        </p>
        <input
          className="inputForm"
          placeholder="Last Name"
          type="text"
          {...register("lastName", { required: true })}
        />
        <p style={{ color: "red" }}>
          {errors.lastName?.type === "required" && "Last Name is required"}
        </p>
        <input
          className="inputForm"
          name="customerEmail"
          placeholder="Email"
          type="email"
          {...register("email", {
            required: true,
            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          })}
        />
        <p style={{ color: "red" }}>
          {errors.email?.type === "required" && "Email is required"}
          {errors.email?.type === "pattern" && "Unvalid email"}
        </p>
        <input
          className="inputForm"
          name="password"
          placeholder="Password"
          type="password"
          {...register("password", { required: true })}
        />
        <p style={{ color: "red" }}>
          {errors.password?.type === "required" && "Password is required"}
        </p>
        <input
          className="inputForm"
          name="customerPhone"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          placeholder="Phone Number"
          type="tel"
          {...register("phoneNumber", {
            pattern: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[\s\./0-9]*$/g,
            required: true,
          })}
        />
        <p style={{ color: "red" }}>
          {errors.phoneNumber?.type === "required" &&
            "Phone Number is required"}
          {errors.phoneNumber?.type === "pattern" && "Unvalid phone number"}
        </p>
        <select
          id="gender"
          name="gender"
          className="inputForm"
          {...register("gender", { required: true })}
        >
          <option className="inputForm" selected disabled hidden>
            --Select gender--
          </option>
          <option value="Male" className="inputForm">
            Male
          </option>
          <option value="Female" className="inputForm">
            Female
          </option>
        </select>

        {UserRole === "student" ? (
          <select
            id="class"
            name="class"
            className="inputForm"
            {...register("classIn", { required: true })}
          >
            <option className="inputForm" selected disabled hidden>
              --Select classroom--
            </option>
            {classroom?.map((classroomm, i) => (
              <option
                key={i}
                value={classroomm.classesName}
                className="inputForm"
              >
                {classroomm.classesName}
              </option>
            ))}
          </select>
        ) : UserRole === "teacher" ? (
          <select
            id="subject"
            name="subject"
            className="inputForm"
            {...register("conditional.subject", { required: true })}
          >
            <option className="inputForm" selected disabled hidden>
              --Select teacher's subject--
            </option>
            {subject?.map((sub, i) => (
              <option key={i} value={sub} className="inputForm">
                {sub}
              </option>
            ))}
          </select>
        ) : (
          <></>
        )}

        <button
          className="buttonForm"
          type="button"
          onClick={handleSubmit(onSubmit)}
        >
          ADD USER
        </button>
      </form>
    </div>
  );
};

export default AddUserForm;
