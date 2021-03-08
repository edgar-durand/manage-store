import React,{useState} from "react";
import Card from "../Card";
import AddNewButton from "../NewAccount/AddNewButton";
import { Link } from "react-router-dom";
import NewAccountForm from "../NewAccount/NewAccountForm";
import { connect } from "react-redux";
import { deleteAccounts } from "../../actions/actionCreator";
import Movement from "./Movement";

const MyAccounts = ({ accounts, deleteAccounts }) => {
  const [movement,setMovement] = useState();
  const handleClick = (e, id) => {
    e.preventDefault();
    deleteAccounts(id);
  };
  const handleMovement = (mov)=>{
    setMovement(mov);
  }

  if (Object.values(accounts).length) {
    return (
      <React.Fragment>
        <div className="wrapper wrapper-content col-12">
          <div
            style={{ marginLeft: "12px" }}
            className="ibox-content col-md-6 float-right"
          >
            <h1 className="text-box">Account movements.</h1>
            <Movement id={movement} />            
          </div>

          <div className="row animated fadeInRight" style={{ display: "flex" }}>
            {Object.values(accounts).map((account, index) => {
              return (
                <Card
                  id={account.id}
                  handleMovement={(mov)=>handleMovement(mov)}
                  handleClick={(e, id) => handleClick(e, id)}
                  key={index}
                  description={account.description}
                  amount={account.cash}
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
const mapDispatchToProps = (dispatch) => {
  return {
    deleteAccounts(id) {
      dispatch(deleteAccounts(id));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MyAccounts);
