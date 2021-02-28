import React from "react";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "./styles/fontawesome";

const Card = ({card_no, amount, description, handleClick, id}) => {

    return (


        <div className="col-md-4">
            <div className="payment-card">
                <FontAwesomeIcon icon={'credit-card'} size="6x" />
                <div className="col-sm-10 text-right float-right">
                    <small>
                        {description}
                    </small>

                    

                </div>
                <h2>
                    {card_no}
                </h2>
                <div className="row">
                    <div className="col-sm-4">
                        <strong>Amount:</strong>
                    </div>
                    <div className="col-sm-8 text-right text-success float-right form-inline">
                        <span className="label label-primary">$ {amount ? amount.toFixed(2):0}</span>
                        <Link className="btn btn-xs btn-white " to={"/home/account/" + id}>Movements</Link>
                        <button className="btn btn-xs btn-white float-right" onClick={(e) => handleClick(e, id)}>Cancel</button>
                    </div>

                </div>
            </div>
        </div>


    )

}
export default Card