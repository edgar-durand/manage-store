import React, {useState} from "react"
import store from "../../store";
import msgNotification from "../../js/msgNotification";
import authHelper from "../../js/authHelper";
import toastr from "toastr";
import send from "../../js/send";
import CheckoutUI from "./CheckoutUI";

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
                if (state.credit>=state.total) {
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
                                                toastr.error(Object.keys(res).map(x => `${x}: [Required !]<br/>`), "ERROR !")
                                        } else {

                                        }
                                    })
                            }
                        })
                }else toastr.warning("Your credit is not enough", "WARNING !")
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


    return <CheckoutUI
        credit={state.credit}
        total={state.total}
        handleSelect={(e)=>handleSelect(e)}
        handleChange={(e)=>handleChange(e)}
        handleCheckout={()=>handleCheckout()}
    />
}
export default Checkout