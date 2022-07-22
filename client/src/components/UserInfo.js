import React, { useEffect, useState } from "react";
import "./UserInfo.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useLocation } from "react-router-dom";
import axios from "axios";

const UserInfo = () => {
  const location = useLocation();
  const userid = location.state;
  const [user, setuser] = useState({});
  useEffect(() => {
    axios
      .get(`/api/v1/admin/user/view/${userid}`)
      .then(function (result) {
        setuser(result.data.user);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);
  console.log(user);
  return (
    <div className="container">
      <div className="main-body">
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center">
                  <img
                    src={user?.profileImage}
                    alt="Admin"
                    className="rounded-circle"
                    width={150}
                  />
                  <div className="mt-3">
                    <h4>{`${user?.firstName} ${user?.lastName}`}</h4>
                    <p className="text-secondary mb-1">{user.role}</p>
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
                    {user?.firstName}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Last Name</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {user?.lastName}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Email</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">{user?.email}</div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Phone</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">{`(+216) ${user?.phoneNumber}`}</div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Age</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {user?.age ? user?.age : "Unknown"}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Gender</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {user?.gender ? user?.gender : "Unknown"}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">More Info</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {user?.classIn || user?.subject || "Unknown"}
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

export default UserInfo;
