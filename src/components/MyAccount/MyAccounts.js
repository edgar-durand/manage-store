import React from "react";
import Card from "../Card";
import AddNewButton from "../NewAccount/AddNewButton";
import { Link } from "react-router-dom";
import NewAccountForm from "../NewAccount/NewAccountForm";
import { connect } from "react-redux";
import { deleteAccounts } from "../../actions/actionCreator";

const MyAccounts = ({ accounts, deleteAccounts}) => {
  const handleClick = (e, id) => {
    e.preventDefault();
    deleteAccounts(id);
  };

  if (Object.values(accounts).length) {
    return (
      <React.Fragment>
        <div className="wrapper wrapper-content animated fadeInRight col-12">
          <div className="row " style={{ display: "flex" }}>
            {Object.values(accounts).map((account, index) => {
              return (
                <Card
                  id={account.id}
                  handleClick={(e, id) => handleClick(e, id)}
                  key={index}
                  description={account.description}
                  amount={account.a_amount}
                  card_no={account.name}
                />
              );
            })}
            <Link to="/home/new_account/">
            <AddNewButton />
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
            <NewAccountForm />
          </div>
        </div>
      </div>
    );
};

const mapStateToProps = (state) => {
  return {
    accounts: state.accounts,
  };
};
const mapDispatchToProps = dispatch => {
    return{
        deleteAccounts(id){
            dispatch(deleteAccounts(id))
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(MyAccounts);
