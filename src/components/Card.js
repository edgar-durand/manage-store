import React, {useRef} from "react";
import {Link} from "react-router-dom";

const Card = ({card_no, amount, description, handleClick, id}) => {
    const i = useRef("i");
    const i2 = useRef("i2");
    return (


        <div className="col-md-4">
            <div className="payment-card">
                <Link to={"/home/account/" + id}><i title="Account status" ref={i2}
                                                    onMouseOut={() => i2.current.classList.remove("text-primary")}
                                                    onMouseOver={() => i2.current.classList.add("text-primary")}
                                                    className="fa fa-check-circle-o payment-icon-big col-sm-1"/></Link>
                <div className="col-sm-10 text-right float-right">
                    <small>
                        {description}
                    </small>

                    <a href="" title="Cancel" onClick={(e) => handleClick(e, id)}>
                        <i ref={i} style={{fontSize: "30px"}}
                           onMouseOut={() => i.current.classList.add("text-muted")}
                           onMouseOver={() => i.current.classList.remove("text-muted")}
                           className="fa fa-close text-muted float-right col-sm-1"/></a>

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