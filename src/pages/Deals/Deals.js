import React from 'react'
import {addToCart} from '../../actions/actionCreator';
import Paging from '../../components/Paging/Paging';
import {connect} from "react-redux";
import store from '../../store';
import ProductGrid from '../../components/ProductGrid';
import CartSummary from '../../components/CartSummary/CartSummary';
import {storeToLocalStore} from "../../js/storeHelper";


const Deals = ({allproducts, cart, page}) => {

    return (
        <React.Fragment>
            <Paging
                data={allproducts}
                page={page}
                col={(cart && Object.values(cart ?? []).length) ? "9" : "12"}
                Component={ProductGrid}
                show="20"
                action={(product) => {
                    store.dispatch(addToCart(product));
                    storeToLocalStore('cart','cart');
                }}
                priceField
                Paginated="products"
            />
            {Object.values(cart ?? []).length ? <CartSummary/> : null}
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        // allproducts: JSON.parse(localStorage.getItem("store")).paginated_products.data,
        allproducts: state.paginated_products.data,
        cart: state?.cart,
        // cart: JSON.parse(localStorage.getItem("store"))?.cart,
        page: state.paginated_products.current_page,
        // page: JSON.parse(localStorage.getItem("store"))?.paginated_products.current_page,
    }
}
export default connect(mapStateToProps)(Deals)
