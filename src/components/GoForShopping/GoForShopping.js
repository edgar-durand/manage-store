import React from "react";
import {connect} from "react-redux";
import {addToCart} from "../../actions/actionCreator";
import ProductGrid from "../ProductGrid";
import CartSummary from "../CartSummary/CartSummary";
import NewProductForm from "../NewProductForm/NewProductForm";
import Paging from "../Paging/Paging";
import {storeToLocalStore} from "../../js/storeHelper";

const GoForShopping = ({products, cart, addToCart, search}) => {

        if (products.length) {
            return (
                <React.Fragment>
                    <div className="col-12 ">

                        <Paging
                            data={products}
                            are_mine={true}
                            col={cart && Object.values(cart || []).length ? "9" : "12"}
                            Component={ProductGrid}
                            action={(product, event) => {
                                addToCart(product, event);
                                storeToLocalStore('cart','cart');
                            }}
                            priceField
                            searField={String(search).length ? search : ""}

                        />
                        {Object.values(cart || []).length ? <CartSummary/> : null}
                    </div>
                </React.Fragment>
            );
        }
        return <NewProductForm/>;
};

const mapStateToProps = (state) => {
    return {
        products: state.productList,
        cart: state.cart,
        search: String(state.searchField)
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
