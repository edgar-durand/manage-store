import React, { useState } from "react";
import msgNotification from "../../js/msgNotification";
import authHelper from "../../js/authHelper";
import toastr from "toastr";
import send from "../../js/send";
import CheckoutUI from "./CheckoutUI";
import {
  clearCart,
  getAccounts, getAllPurchases,
  setListProducts,
} from "../../actions/actionCreator";
import { connect } from "react-redux";
import store from "../../store";

const Checkout = ({
  cart,
  accounts,
  getAccounts,
  clearCart,
  setListProducts,
}) => {
  const [state, setState] = useState({
    purchase: {  
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
        credit: accounts.find((x) => x.id === e.value).cash,
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
                    product_id: x.id,
                    quantity: x.inStock,
                    price: x.price_cost,
                  })),
                  account: state.account,
                  total: state.total
                },
                "/api/purchase",
                "post"
              ).then((res) => {
                if (!res.error) {
                  getAccounts();
                  setListProducts();
                  store.dispatch(getAllPurchases());
                  clearCart();
                  toastr.success("Seccess. !");
                } else {
                  toastr.error(res.error.message, "ERROR !");
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

  return (
    <CheckoutUI
      credit={state.credit}
      total={state.total}
      handleSelect={(e) => handleSelect(e)}
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
