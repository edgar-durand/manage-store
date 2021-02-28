import React, { useState, useEffect } from "react";
import toastr from "toastr";
import LoginUI from "./LoginUI";
import send from "../../js/send";
import { Redirect } from "react-router-dom";
import authHelper from "../../js/authHelper";

const Login = () => {
  const [data, setData] = useState({
    token: null,
    error: null,
    load: false,
  });

  useEffect(() => {
    if (authHelper()) setData({ ...data, token: authHelper() });
  }, [data]);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.username !== "") {
      setData({
        ...data,
        load: true,
      });
      send(data, "/api/login", "post").then((r) => {
        if (r.error) {
          setData({
            ...data,
            ...r,
            load: false,
          });
          r.error.message
            ? toastr.error("Can't connect with service.", "ERROR")
            : toastr.error(r.error, "ERROR");
        } else if (r.non_field_errors) {
          toastr.warning(r.non_field_errors, "WARNING");
          setData({ ...data, load: false });
        } else
          setData({
            ...data,
            ...r,
            load: false,
          });
      });
    }
  };

  if (data.token && !data.error) {
    localStorage.setItem("token", data.token);
    console.log("Session logged in successfully.");
    return <Redirect to="/home/" />;
  }
  return (
    <LoginUI
      handleSubmit={(event) => handleSubmit(event)}
      handleChange={(event) => handleChange(event)}
      load={data.load}
    />
  );
};
export default Login;
