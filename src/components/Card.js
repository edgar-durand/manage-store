import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styles/fontawesome";

const Card = ({ card_no, amount, description, handleClick, id, handleMovement }) => {
  return (
    <div className="col-md-8">
      <div className="payment-card">
        <div className="col-4 float-left">
          <FontAwesomeIcon icon={"credit-card"} size="6x" />
        </div>
        <div className="col-8 float-right text-right text-success form-inline">
          <div className="col-sm-6">
            <strong>Amount:</strong>
          </div>
          <span className="label label-primary">
            <h3> $ {amount ? parseFloat(amount).toFixed(2) : 0}</h3>
          </span>
        </div>
        <h2>{card_no}</h2>
        <div className="col-sm-12 float-left">
          <h4>{description}</h4>
        </div>

        <div className="row">
          <div className="col-sm-12 text-right float-right form-inline">
            <div className="col-4"></div>
            <div className="col-8 pull-right">            
              <button
                className="btn btn-sm btn-white float-right"
                onClick={()=>handleMovement(id)}
              >
                Movements
              </button>
              <button
                className="btn btn-sm btn-white float-right"
                onClick={(e) => handleClick(e, id)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Card;
