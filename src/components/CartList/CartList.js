import React from "react";
import { connect } from "react-redux";
import msgNotification from "../../js/msgNotification";
import toastr from "toastr";
import CartListUI from "./CartListUI";
import {
  deleteFromCart,
  setProductQuantity,
} from "../../actions/actionCreator";
import {storeToLocalStore} from "../../js/storeHelper";

const CartList = ({ cart, handleChange, handleClick }) => (
  <CartListUI
    products={cart}
    handleClick={(e) => handleClick(e)}
    handleChange={(e, p) => handleChange(e, p)}
  />
);

const mapStateToProps = (state) => {
  return {
    // cart: JSON.parse(localStorage.getItem('store')).cart,
    cart: state.cart,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    handleChange(e, product) {

        dispatch(
          setProductQuantity(
            Object.assign(product, {inStock: +e.target?.value})
          )
        );
        storeToLocalStore('cart','cart');

      if (e.target.value === "0") {
        e.target.value = 1;
        toastr.warning(
          "If you dont want this product here please 'Remove item' but 0 is not valid here",
          "WARNING !"
        );
      }
    },
    handleClick(id) {
      msgNotification(
        "Confirm",
        "Are you sure of delete this item ?",
        "question",
        "OK",
        true,
        "CANCEL"
      ).then((r) => {
        if (r.value) {
          dispatch(deleteFromCart(id));
          storeToLocalStore('cart','cart');
        }
      });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CartList);
