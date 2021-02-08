import React from "react";
import store from "../../store";
import {Link} from "react-router-dom";
import CartSummary from "../CartSummary/CartSummary";

const CartListUI = ({products,handleClick,handleChange}) =>{

    return (
        <div className="wrapper wrapper-content">

            <div className="row">
                <div className="col-md-9 animated fadeInRight">
                    <div className="ibox">
                        <div className="ibox-title">
                            <span
                                className="float-right">(<strong>{Object.values(store.getState().cart).length}</strong>) items</span>
                            <h5>Items in your cart</h5>
                        </div>


                        {
                            Object.values(products).sort((a, b) => a.id - b.id).map((product,index) => {
                                return (
                                    <div key={index} className="ibox-content" >
                                        <div className="table-responsive">
                                            <table className="table shopping-cart-table">
                                                <tbody>
                                                <tr>
                                                    <td width="90">
                                                        <div>
                                                            <img style={{
                                                                objectFit: "contain"
                                                            }} width="80" height="80" src={product.image} alt=""/>
                                                        </div>
                                                    </td>
                                                    <td width="520" className="desc">
                                                        <h3>
                                                            <label className="text-navy">
                                                                {product.name}
                                                            </label>
                                                        </h3>
                                                        <p className="small">
                                                            {product.description}
                                                        </p>

                                                        <div className="m-t-sm">
                                                            {/*<a href="#" className="text-muted"><i*/}
                                                            {/*    className="fa fa-gift"/> Add*/}
                                                            {/*    gift package</a>*/}
                                                            {/*|*/}
                                                            <button onClick={() => handleClick(product.id)}
                                                                    className="btn btn-xs btn-default"><i
                                                                className="fa fa-trash"/> Remove item
                                                            </button>
                                                        </div>
                                                    </td>

                                                    <td>
                                                        $ {parseFloat(product.price_cost).toFixed(2)}
                                                    </td>
                                                    <td width="65">
                                                        <input onChange={(event) => handleChange(event, product)}
                                                               type="text"
                                                               defaultValue={1}
                                                               className="form-control col-12 float-right"/>
                                                    </td>
                                                    <td className="float-right">
                                                        <h4>
                                                            <label>{((product.inStock === 0 ? 1 : product.inStock) * product.price_cost).toFixed(2)}</label>
                                                        </h4>
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                    </div>
                                )
                            })
                        }

                        <div className="ibox-content">

                            <Link to="/home/checkout/" className="btn btn-primary float-right"><i
                                className="fa fa-check-square"/> Checkout
                            </Link>
                            <Link to="/home/shopping/" className="btn btn-white"><i
                                className="fa fa-arrow-left"/> Continue shopping
                            </Link>

                        </div>
                    </div>
                </div>
                <CartSummary
                    total={Object.values(store.getState().cart).reduce((a, b) => a + b.price_cost * b.inStock, 0)}
                />
            </div>
        </div>
    )
}
export default CartListUI