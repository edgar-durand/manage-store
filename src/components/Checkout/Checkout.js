import React, { useState } from "react";
import msgNotification from "../../js/msgNotification";
import authHelper from "../../js/authHelper";
import toastr from "toastr";
import send from "../../js/send";
import CheckoutUI from "./CheckoutUI";
import {
  clearCart,
  getAccounts,
  setListProducts,
} from "../../actions/actionCreator";
import { connect } from "react-redux";

const Checkout = ({
  cart,
  accounts,
  getAccounts,
  clearCart,
  setListProducts,
}) => {
  const [state, setState] = useState({
    purchase: {
      description: null,
      products: [],
    },
    credit: 0,
    account: null,
    total: +Object.values(cart).reduce(
      (a, b) => a + b.price_cost * b.inStock,
      0
    ),
  });

  const handleSelect = (e) => {
    if (e)
      setState({
        ...state,
        account: e.value,
        credit: Object.values(accounts).find((x) => x.id === e.value).a_amount,
      });
    else setState({ ...state, credit: 0 });
  };

  const handleCheckout = () => {
    if (Object.values(cart).length) {
      if (state.account) {
        if (state.credit >= state.total) {
          msgNotification(
            "Confirm",
            `You are about to buy ${Object.values(cart).length} products.
                        Your credit is going to decrease from $ ${state.credit.toFixed(
                          2
                        )} to --> $ ${(state.credit - state.total).toFixed(2)}`,
            "question",
            "OK",
            true,
            "CANCEL"
          ).then((r) => {
            if (r.value) {
              send(
                {
                  token: authHelper(),
                  data: Object.values(cart).map((x) => ({
                    product: x.id,
                    cant: x.inStock,
                    p_cost: x.price_cost,
                  })),
                  account: state.account,
                  venta_total: state.total,
                  description: state.purchase.description,
                },
                "/api/purchasescart",
                "post"
              ).then((res) => {
                if (!res.error) {
                  getAccounts();
                  clearCart();
                  setListProducts();
                } else {
                  toastr.error(res, "ERROR !");
                }
              });
            }
          });
        } else {
          toastr.options.preventDuplicates = true;
          toastr.warning("Your credit is not enough", "WARNING !");
        }
      } else toastr.warning("You should set up the account", "WARNING !");
    } else {
      toastr.warning("You need to purchase some product first.", "WARNING !");
    }
  };

  const handleChange = (e) => {
    setState({
      ...state,
      purchase: {
        ...state.purchase,
        description: e.target.value,
      },
    });
  };

  return (
    <CheckoutUI
      credit={state.credit}
      total={state.total}
      handleSelect={(e) => handleSelect(e)}
      handleChange={(e) => handleChange(e)}
      handleCheckout={() => handleCheckout()}
    />
  );
};
const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    accounts: state.accounts,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAccounts() {
      dispatch(getAccounts());
    },
    clearCart() {
      dispatch(clearCart());
    },
    setListProducts() {
      dispatch(setListProducts());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
