import React, {useState, useRef} from "react"
import Select from "react-select";
import store from "../../store";
import CartSummary from "../CartSummary/CartSummary";
import {Link} from "react-router-dom";
import msgNotification from "../../js/msgNotification";
import authHelper from "../../js/authHelper";
import toastr from "toastr";
import send from "../../js/send";

const Checkout = () => {
    const [state, setState] = useState({
        purchase: {
            account: null,
            description: null,
            products: []
        },
        credit: 0,
        total: +Object.values(store.getState().cart).reduce((a, b) => a + b.price_cost * b.inStock, 0)
    });
    const label = useRef("label");
    const text = useRef("text");

    const handleSelect = (e) => {
        if (e)
            setState({
                ...state,
                purchase: {...state.purchase, account: e.value},
                credit: Object.values(store.getState().accounts).find(x => x.id === e.value).a_amount
            })
        else setState({...state, credit: 0})
    }
    const handleCheckout = () => {
        if (Object.values(store.getState().cart).length){
            setState({
                ...state,
                purchase:{
                    ...state.purchase,
                    products: Object.values(store.getState().cart).map(x=>x.id)
                }
            })
            if (state.purchase.account && state.purchase.description) {
                msgNotification("Confirm", `You are about to buy ${Object.values(store.getState().cart).length} products.
             Your credit is going to decrease from $ ${state.credit.toFixed(2)} to --> $ ${(state.credit - state.total).toFixed(2)}`,
                    "question", "OK", true, "CANCEL")
                    .then(r => {
                        if (r.value) {
                            send({token: authHelper(), ...state.purchase}, "/api/purchases/", "post")
                                .then(res => {
                                    if (!res.error) {
                                        if (res.id)
                                        toastr.success(res, "SUCCESS !")
                                        else
                                            toastr.error(Object.keys(res).map(x=> `${x}: [Required !]<br/>`), "ERROR !")
                                    } else {

                                    }
                                })
                        }
                    })
            }else
                toastr.warning("You should fill up all fields", "WARNING !")



        }
    }

    const handleChange = (e) => {
        setState({
            ...state,
            purchase: {
                ...state.purchase,
                description: e.target.value
            }
        })
    }


    if (label.current.classList)
        if (state.credit >= state.total) {
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
                                                                                ref={label}> $ {state.credit.toFixed(2)} </h5>
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
                    total={state.total}
                />
            </div>
        </div>
    )
}
export default Checkout