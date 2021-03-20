import React from "react";
import Card from "../Card";
import AddNewButton from "../NewAccount/AddNewButton";
import { Link } from "react-router-dom";
import NewAccountForm from "../NewAccount/NewAccountForm";
import { useSelector, useDispatch } from "react-redux";
import {deleteAccounts, getMovements} from "../../actions/actionCreator";
import Movement from "./Movement";
import { uuidv4 } from "../../js/uuidv4";

const MyAccounts = () => {
    const accounts = useSelector((state) => state.accounts);
    const dispatch = useDispatch();


    const handleClick = (e, id) => {
        e.preventDefault();
        dispatch(deleteAccounts(id));
    };

    const handleMovement = (mov) => {
        dispatch(getMovements(mov));
        localStorage.setItem('account_id', mov);
    };

    if (Object.values(accounts).length) {
        return (
            <React.Fragment>
                <div className="wrapper wrapper-content col-12">
                    <div
                        style={{marginLeft: "12px"}}
                        className="ibox-content col-md-6 float-right"
                    >
                        <h1 className="text-box">Account movements.</h1>
                        <Movement/>
                    </div>

                    <div className="row animated fadeInRight" style={{display: "flex"}}>
                        {Object.values(accounts).map((account) => {
                            return (
                                <Card
                                    id={account.id}
                                    handleMovement={() => handleMovement(account.id)}
                                    handleClick={(e, id) => handleClick(e, id)}
                                    key={uuidv4()}
                                    description={account.description}
                                    amount={account.cash}
                                    card_no={account.name}
                                />
                            );
                        })}
                        <Link to="/home/new_account/">
                            <AddNewButton/>
                        </Link>
                    </div>
                </div>
            </React.Fragment>
        );
    } else
        return (
            <div className="wrapper wrapper-content animated fadeInRight">
                <div className="row">
                    <div className="ibox ibox-content col-lg-12">
                        <h3>
                            You have not any account. Set up your first credit for furthers
                            loans.
                        </h3>
                        <NewAccountForm/>
                    </div>
                </div>
            </div>
        );
};

export default MyAccounts;
