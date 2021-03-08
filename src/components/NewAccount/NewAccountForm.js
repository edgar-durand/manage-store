import React, { useState } from "react";
import NewAccountFormUI from "./NewAccountFormUI";
import send from "../../js/send";
import authHelper from "../../js/authHelper";
import msgNotification from "../../js/msgNotification";
import { Redirect } from "react-router-dom";
import store from "../../store";
import toastr from "toastr";
import { getAccounts } from "../../actions/actionCreator";

const NewAccountForm = () => {
  const [account, setAccount] = useState({
    name: null,
    description: null,
    amount: null,
    in: false,
  });

  const handleChange = (e) => {
    setAccount({
      ...account,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    send({ ...account, token: authHelper() }, "/api/account/", "post").then(
      (r) => {
        if (!r.error?.message) {
          setAccount({ ...account, in: true });
          store.dispatch(getAccounts());
          toastr.success("Committed", "SUCCESS !");
        } else msgNotification("Error !", `${r.error.message}`, "error", "OK");
      }
    );
  };
  if (account.in) return <Redirect to="/home/my_accounts/" />;

  return (
    <NewAccountFormUI
      handleChange={(e) => handleChange(e)}
      handleSubmit={(e) => handleSubmit(e)}
    />
  );
};
export default NewAccountForm;
