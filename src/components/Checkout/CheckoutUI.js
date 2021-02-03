import React,{useRef} from "react";
import store from "../../store";
import Select from "react-select";
import {Link} from "react-router-dom";
import CartSummary from "../CartSummary/CartSummary";

const CheckoutUI = ({credit,total,handleSelect,handleChange,handleCheckout}) =>{
    const label = useRef("label");
    const text = useRef("text");

    if (label.current.classList)
        if (credit >= total) {
            text.current.innerHTML = " <i style='font-size: 30px' class='fa fa-check text-info text-right'/>"
            label.current.classList.remove("text-warning")
            label.current.classList.add("text-success")
        } else {
            text.current.innerHTML = " <i style='font-size: 30px' class='fa fa-close text-danger text-right'/>"
            label.current.classList.remove("text-success")
            label.current.classList.add("text-warning")
        }

    return (
        <div className="wrapper wrapper-content">
            <div className="row">
                <div className="col-md-9 animated fadeInRight">
                    <div className="ibox">
                        <div className="ibox-title">
                            <span
                                className="float-right">(<strong>{Object.values(store.getState().cart).length}</strong>) items purchased</span>
                            <h5>Checkout</h5>
                        </div>
                        <div className="ibox-content">
                            <label className="col-12 form-inline"> Account
                                credit:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <h5 className="text-center"
                                                                                ref={label}> $ {credit.toFixed(2)} </h5>
                                <p ref={text}></p>
                            </label>
                            <div className="col-12">
                                <Select
                                    options={
                                        Object.values(store.getState().accounts).map(x => ({
                                                value: x.id,
                                                label: `${x.name} ${x.description}`
                                            })
                                        )
                                    }
                                    isClearable={true}
                                    placeholder="Select account"
                                    name="accounts"
                                    onChange={(e) => handleSelect(e)}
                                />
                            </div>
                            <br/>
                            <label className="col-12 form-inline">
                                Description
                            </label>
                            <textarea onChange={(event) => handleChange(event)} className="form-control"
                                      name="description"/>

                        </div>
                        <div className="ibox-content">

                            <button onClick={() => handleCheckout()} className="btn btn-primary float-right col-auto"><i
                                style={{fontSize: "20px"}}
                                className="fa fa-check"/> Checkout
                            </button>
                            <Link to="/home/shopping/" className="btn btn-white"><i
                                className="fa fa-arrow-left"/> Continue shopping
                            </Link>

                        </div>
                    </div>
                </div>
                <CartSummary
                    total={total}
                />
            </div>
        </div>
    )
}
export default CheckoutUI