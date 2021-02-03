import React, {useState} from "react";
import store from "../../store";
import {Link} from "react-router-dom";
import CartSummary from "../CartSummary/CartSummary";
import msgNotification from "../../js/msgNotification";
import toastr from "toastr";

const CartList = () => {
    const [products, setProducts] = useState({...store.getState().cart})

    const handleChange = (e, product) => {
        if (e.target.value === "0") {
            e.target.value = 1
            toastr.warning("If you dont want this product here please 'Remove item' but 0 is not valid here", "WARNING !")
        }

        store.dispatch({
            type: "SET_PRODUCT_QUANTITY",
            product: {
                category: product.category,
                description: product.description,
                id: product.id,
                image: product.image,
                inStock: +e.target.value || 1,
                name: product.name,
                price_cost: product.price_cost,
                price_vent: product.price_vent,
                _public: product._public

            }
        })


    }

    const handleClick = (id) => {
        msgNotification("Confirm", "Are you sure of delete this item ?", "question", "OK", true, "CANCEL")
            .then((r) => {
                if (r.value) {
                    store.dispatch({
                        type: "DELETE_FROM_CART",
                        id
                    })
                }
            })
    }

    store.subscribe(() => {
        setProducts({...store.getState().cart})
    })


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
                            Object.values(products).sort((a, b) => a.id - b.id).map(product => {
                                return (
                                    <div className="ibox-content">
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
                                                    <td className="desc">
                                                        <h3>
                                                            <a href="#" className="text-navy">
                                                                {product.name}
                                                            </a>
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
                                                               defaultValue={product.inStock === 0 ? 1 : product.inStock}
                                                               className="form-control col-12"/>
                                                    </td>
                                                    <td>
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
export default CartList