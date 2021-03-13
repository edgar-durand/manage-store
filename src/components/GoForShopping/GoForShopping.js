import React from "react";
import { connect } from "react-redux";
import { addToCart } from "../../actions/actionCreator";
import ProductGrid from "../ProductGrid";
import CartSummary from "../CartSummary/CartSummary";
import NewProductForm from "../NewProductForm/NewProductForm";
import Paging from "../Paging/Paging";

const GoForShopping = ({ products, cart, addToCart }) => {
  if (Object.values(products).length) {
    return (
      <React.Fragment>
        <div className="col-12 ">
            <Paging
              data={products}
              are_mine={true}
              col={Object.values(cart).length ? "9" : "12"}
              Component={ProductGrid}
              action={(product, event) => addToCart(product, event)}
              priceField
            />
            {Object.values(cart).length ? <CartSummary /> : null}
        </div>
      </React.Fragment>
    );
  }
  return <NewProductForm />;
};

const mapStateToProps = () => {
  return {
    products: JSON.parse(localStorage.getItem("store"))?.productList,
    cart: JSON.parse(localStorage.getItem("store"))?.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart(product, e) {
      e.preventDefault();
      dispatch(addToCart(product));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(GoForShopping);
