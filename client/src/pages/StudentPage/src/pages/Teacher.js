import React, { useEffect, useState } from "react";
import "../../../../components/UserInfo.css";
import "../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const Teacher = () => {
  const location = useLocation();
  const teacherid = location.state;
  const teachers = useSelector((state) => {
    return state?.student?.teachers?.teacherlist;
  });
  const teacher = teachers?.find((el) => el._id === teacherid);
  return (
    <div className="container">
      <div className="main-body">
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center">
                  <img
                    src={teacher?.profileImage}
                    alt="Admin"
                    className="rounded-circle"
                    width={150}
                  />
                  <div className="mt-3">
                    <h4>{`${teacher?.firstName} ${teacher?.lastName}`}</h4>
                    <p className="text-secondary mb-1">{teacher?.role}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card mb-3">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">First Name</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {teacher?.firstName}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Last Name</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {teacher?.lastName}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Email</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {teacher?.email}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Phone</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">{`(+216) ${teacher?.phoneNumber}`}</div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Age</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {teacher?.age ? teacher?.age : "Unknown"}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Gender</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {teacher?.gender ? teacher?.gender : "Unknown"}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Subject</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {teacher?.subject}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teacher;
