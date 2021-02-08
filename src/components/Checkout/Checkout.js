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
            description: null,
            products: []
        },
        credit: 0,
        account: null,
        total: +Object.values(store.getState().cart).reduce((a, b) => a + b.price_cost * b.inStock, 0)
    });


    const handleSelect = (e) => {
        if (e)
            setState({
                ...state,
                account: e.value,
                credit: Object.values(store.getState().accounts).find(x => x.id === e.value).a_amount
            })
        else setState({...state, credit: 0})
    }
    const handleCheckout = () => {
        if (Object.values(store.getState().cart).length) {

            if (state.account) {
                if (state.credit >= state.total) {
                    msgNotification("Confirm", `You are about to buy ${Object.values(store.getState().cart).length} products.
                        Your credit is going to decrease from $ ${state.credit.toFixed(2)} to --> $ ${(state.credit - state.total).toFixed(2)}`,
                        "question", "OK", true, "CANCEL")
                        .then(r => {
                            if (r.value) {
                                send({
                                    token: authHelper(),
                                    data:Object.values(store.getState().cart).map(x => ({
                                        product: x.id,
                                        cant: x.inStock,
                                        p_cost: x.price_cost
                                    })),
                                    account: state.account,
                                    venta_total: +Object.values(store.getState().cart).reduce((a, b) => a + (b.price_cost * (b.inStock === 0 ? 1 : b.inStock)), 0),
                                    description: state.purchase.description
                                }, "/api/purchasescart", "post")
                                    .then(res => {
                                        if (!res.error) {
                                                send({token: authHelper()}, "/api/accounts", "get")
                                                    .then(res => {
                                                        store.dispatch({
                                                            type: "GET_ACCOUNTS",
                                                            accounts: {...res}
                                                        })
                                                        store.dispatch({
                                                            type: "CLEAR_CART"
                                                        })
                                                        toastr.success("Committed", "SUCCESS !")
                                                    })

                                        } else {
                                            toastr.error(res, "ERROR !")
                                        }
                                    })
                            }
                        })
                } else toastr.warning("Your credit is not enough", "WARNING !")
            } else
                toastr.warning("You should set up the account", "WARNING !")


        }else {
            toastr.warning("You need to purchase some product first.", "WARNING !")

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
        handleSelect={(e) => handleSelect(e)}
        handleChange={(e) => handleChange(e)}
        handleCheckout={() => handleCheckout()}
    />
}
export default Checkout