import React, {useEffect, useState} from "react"
import MyAccountsUI from "./MyAccountsUI";
import Card from "../Card";
import send from "../../js/send";
import authHelper from "../../js/authHelper";
import AddNewButton from "../NewAccount/AddNewButton";
import {Link} from "react-router-dom";
import NewAccountForm from "../NewAccount/NewAccountForm";

const MyAccounts = () => {
    const [accounts, setAccount] = useState({});

    useEffect(() => {
        send({token: authHelper()}, "/api/accounts/", "get")
            .then(r => {
                setAccount({...r})
            })

    }, [])

    if (Object.values(accounts).length) {
        return (
            <>
                <div className="wrapper wrapper-content animated fadeInRight">
                    <div className="row">
                        {
                            Object.values(accounts).map((account, index) => {
                                return (
                                    <Card
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
    }else
        return (
            <>
                <h2>You have not account. Set up your first credit for furthers loans.</h2>
            <NewAccountForm/>
            </>
            )
}
export default MyAccounts