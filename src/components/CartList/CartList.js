import React from "react";
import { connect } from "react-redux";
import msgNotification from "../../js/msgNotification";
import toastr from "toastr";
import CartListUI from "./CartListUI";
import {
  deleteFromCart,
  setProductQuantity,
} from "../../actions/actionCreator";

const CartList = ({ cart, handleChange, handleClick }) => (
  <CartListUI
    products={cart}
    handleClick={(e) => handleClick(e)}
    handleChange={(e, p) => handleChange(e, p)}
  />
);

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    handleChange(e, product) {

      clearTimeout();
      setTimeout(() => {
        dispatch(
          setProductQuantity(
            Object.assign(product, { inStock: +e.target.value})
          )
        );
      },1000);
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
        }
      });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CartList);
