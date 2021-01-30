import React from "react";

const Card = ({card_no,amount,description}) => {
    return (


                <div className="col-md-4">
                    <div className="payment-card">
                        <i className="fa fa-check-circle-o payment-icon-big text-success"/>
                        <div className="col-sm-8 text-right float-right">
                            <small>
                                {description}
                            </small>
                        </div>
                        <h2>
                            **** **** **** {card_no}
                        </h2>
                        <div className="row">
                            <div className="col-sm-6">
                                <strong>Availabe amount:</strong>
                            </div>
                            <div className="col-sm-6 text-right text-success float-right">
                                <span className="label label-primary float-right">$ {amount}</span>
                            </div>

                        </div>
                    </div>
                </div>



    )

}
export default Card