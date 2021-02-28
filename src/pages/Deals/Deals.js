import React from 'react'
import { addToCart, getAllProducts } from '../../actions/actionCreator';
import Paging from '../../components/Paging/Paging';
import { connect} from "react-redux";
import store from '../../store';
import ProductGrid from '../../components/ProductGrid';
import CartSummary from '../../components/CartSummary/CartSummary';


const Deals = ({allproducts, cart}) => {
  if (!Object.values(allproducts).length){
    store.dispatch(getAllProducts());
  }
  return (
    <React.Fragment>
      <Paging
      data={allproducts}
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
  }
}
export default connect(mapStateToProps)(Deals)
