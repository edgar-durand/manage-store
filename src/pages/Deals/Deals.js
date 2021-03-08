import React from 'react'
import { addToCart } from '../../actions/actionCreator';
import Paging from '../../components/Paging/Paging';
import { connect} from "react-redux";
import store from '../../store';
import ProductGrid from '../../components/ProductGrid';
import CartSummary from '../../components/CartSummary/CartSummary';


const Deals = ({allproducts, cart, page}) => {
  
  return (
    <React.Fragment>
      <Paging
      data={allproducts}
      page={page}
      col={Object.values(cart).length ? "9" : "12"}
      Component={ProductGrid}
      show="10"
      action={(product) =>store.dispatch(addToCart(product))}
      priceField
      />
       {Object.values(cart).length ? <CartSummary /> : null}
    </React.Fragment>
  )
}

const mapStateToProps = () =>{
  return{
    allproducts: JSON.parse(localStorage.getItem("store"))?.allproducts,
    cart: JSON.parse(localStorage.getItem("store"))?.cart,
    page: JSON.parse(localStorage.getItem("store"))?.page,
  }
}
export default connect(mapStateToProps)(Deals)
