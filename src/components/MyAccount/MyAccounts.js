import React, {Fragment, useEffect, useState} from "react"
import Card from "../Card";
import send from "../../js/send";
import authHelper from "../../js/authHelper";
import AddNewButton from "../NewAccount/AddNewButton";
import {Link} from "react-router-dom";
import store from "../../store";
import msgNotification from "../../js/msgNotification";
import toastr from "toastr";
import NewAccountForm from "../NewAccount/NewAccountForm";

const MyAccounts = () => {
    const [accounts, setAccount] = useState({...store.getState().accounts});

    useEffect(() => {
        send({token: authHelper()}, "/api/accounts/", "get")
            .then(r => {
                setAccount({...r})
            })

        let unsubscribe = store.subscribe(()=>{
            setAccount({...store.getState().accounts})
            return unsubscribe;
        })


    }, [])


    const handleClick = (e,id) =>{
        e.preventDefault();
        msgNotification("Confirm !",`Do you really want to delete.`,"question","ACEPTAR",true)
            .then(r=>{
                if (r.value) {
                    send({token: authHelper()},`/api/accounts/${id}/`,"delete")
                        .then(()=>{

                            store.dispatch({
                                type: "DELETE_ACCOUNTS",
                                id
                            })
                            toastr.options.closeButton = true;
                            toastr.options.closeHtml = '<button><i class="fa fa-close"></i></button>';
                            toastr.success(`Account deleted.`, "DELETED !");
                        })
                }
            })

    }



    if (Object.values(accounts).length) {
        return (
            <Fragment>
                <div className="wrapper wrapper-content animated fadeInRight col-12">
                    <div className="row " style={{display: "flex"}}>
                        {
                            Object.values(accounts).map((account, index) => {
                                return (
                                    <Card
                                        id={account.id}
                                        handleClick={(e, id) => handleClick(e, id)}
                                        key={index}
                                        description={account.description}
                                        amount={account.a_amount}
                                        card_no={account.name}
                                    />
                                )
                            })
                        }

                    </div>
                    <Link to="/home/new_account/"><AddNewButton/></Link>
                </div>

            </Fragment>
        )
    } else
        return (
            <div className="wrapper wrapper-content animated fadeInRight">
                <div className="row">
                    <div className="ibox ibox-content col-lg-12">
                    <h3>You have not any account. Set up your first credit for furthers loans.</h3>
                        <NewAccountForm/>
                    </div>
                </div>
            </div>
        )
}
export default MyAccounts