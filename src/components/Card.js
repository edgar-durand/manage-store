import React,{useRef} from "react";

const Card = ({card_no,amount,description,handleClick,id}) => {
    const i = useRef("i");
    return (


                <div className="col-md-4">
                    <div className="payment-card">
                        <i className="fa fa-check-circle-o payment-icon-big text-success col-sm-1"/>
                        <div className="col-sm-10 text-right float-right">
                            <small>
                                {description}
                            </small>

                            <a href="" title="Cancel" onClick={(e)=>handleClick(e,id)}>
                                <i ref={i} style={{fontSize:"30px"}} onMouseOut={()=>i.current.classList.remove("text-danger")} onMouseOver={()=>i.current.classList.add("text-danger")} className="fa fa-credit-card-alt text-dark float-right col-sm-1"/></a>

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