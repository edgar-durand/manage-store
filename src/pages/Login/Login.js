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

          toastr.error(r.error.message, "ERROR");
        } else{
          setData({
            ...data,
            token: r.response.data.token,
            load: false,
          });}
      });
    }
  };

  if (data.token && !data.error) {
    localStorage.setItem("token", data.token);
    toastr.options.preventDuplicates = true;
    toastr.success("Session logged in successfully.");
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
