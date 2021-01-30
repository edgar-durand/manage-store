import React, {useState} from "react";
import NewAccountFormUI from "./NewAccountFormUI";
import send from "../../js/send";
import authHelper from "../../js/authHelper";
import msgNotification from "../../js/msgNotification";
import {Redirect} from "react-router-dom";

const NewAccountForm = () => {
    const [account, setAccount] = useState({name: null, description: null, a_amount: null})

    const handleChange = (e) => {
        setAccount({
            ...account,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        send({...account,token: authHelper()}, "/api/accounts/", "post")
            .then(r => {
                if (!r.error) {
                    msgNotification("Success !", `The new account has been added successfully`, "success", "OK")
                        .then(p => {
                            if (p.value)
                                setAccount({...account,...r})
                        })
                } else
                    msgNotification("Error !", `${r.error}`, "error", "OK")


            })
    }

    return <NewAccountFormUI
        handleChange={(e) => handleChange(e)}
        handleSubmit={(e) => handleSubmit(e)}

    />
}
export default NewAccountForm