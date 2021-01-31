import React, {useEffect, useState} from "react"
import MyAccountsUI from "./MyAccountsUI";
import Card from "../Card";
import send from "../../js/send";
import authHelper from "../../js/authHelper";
import AddNewButton from "../NewAccount/AddNewButton";
import {Link} from "react-router-dom";
import NewAccountForm from "../NewAccount/NewAccountForm";
import store from "../../store";
import msgNotification from "../../js/msgNotification";
import toastr from "toastr";

const MyAccounts = () => {
    const [accounts, setAccount] = useState({...store.getState().accounts});

    useEffect(() => {
        send({token: authHelper()}, "/api/accounts/", "get")
            .then(r => {
                setAccount({...r})
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

    store.subscribe(()=>{
        setAccount({...store.getState().accounts})
    })

    if (Object.values(accounts).length) {
        return (
            <>
                <div className="wrapper wrapper-content animated fadeInRight">
                    <div className="row">
                        {
                            Object.values(accounts).map((account, index) => {
                                return (
                                    <Card
                                        id={account.id}
                                        handleClick={(e,id)=>handleClick(e,id)}
                                        key={index}
                                        description={account.description}
                                        amount={account.a_amount}
                                        card_no={account.name.substring(12, 16)}
                                    />
                                )

                            })
                        }
                        <Link to="/home/new_account/"><AddNewButton/></Link>
                    </div>
                </div>
                <MyAccountsUI/>
            </>
        )
    } else
        return (
            <div className="wrapper wrapper-content animated fadeInRight">
                <div className="row">
                    <div className="ibox ibox-content col-lg-12">
                    <h3>You have not any account. Set up your first credit for furthers loans.</h3>
                    </div>
                    <NewAccountForm/>
                </div>
            </div>
        )
}
export default MyAccounts