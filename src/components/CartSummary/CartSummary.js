import React, {useState} from "react";
import {Link} from "react-router-dom";
import store from "../../store";

const CartSummary = () => {
    const [total, setTotal] = useState(+Object.values(store.getState().cart).reduce((a, b) => a + (b.price_cost * (b.inStock === 0 ? 1 : b.inStock)), 0))

    store.subscribe(() => {
        setTotal(+Object.values(store.getState().cart).reduce((a, b) => a + (b.price_cost * (b.inStock === 0 ? 1 : b.inStock)), 0))
    });

    return (
        <div className="row col-3 float-right">

            <div className="ibox">
                <div className="ibox-title" >
                    <h5 className="pull-left">Cart Summary</h5>
                    <Link to="/home/my_cart/" className="btn btn-white btn-sm pull-right"><i
                        className="fa fa-shopping-cart"/> My Cart</Link>
                </div>

                <div className="ibox-content">
                            <span>
                                Total
                            </span>
                    <h2 className="font-bold">$
                        {
                            total.toFixed(2)
                        }
                    </h2>

                    <hr/>
                    <span className="text-muted small">
                                *Tax are excluded
                            </span>
                    <div className="m-t-sm">
                        <div className="btn-group" style={{display: "contents"}}>
                            <Link to="/home/checkout/" className="btn btn-primary btn-sm"><i
                                className="fa fa-check-square"/> Checkout
                            </Link>
                            &nbsp;
                            <button className="btn btn-default btn-sm"> Cancel</button>


                        </div>
                    </div>
                </div>
            </div>

            <div className="ibox">
                <div className="ibox-title">
                    <h5>Support</h5>
                </div>
                <div className="ibox-content text-center">


                    <h3><i className="fa fa-phone"/> +43 100 783 001</h3>
                    <span className="small">
                                Please contact with us if you have any questions. We are avalible 24h.
                            </span>


                </div>
            </div>

            <div className="ibox">
                <div className="ibox-content">

                    <p className="font-bold">
                        Other products you may be interested
                    </p>

                    <hr/>
                    <div>
                        <a href="#" className="product-name"> Product 1</a>
                        <div className="small m-t-xs">
                            Many desktop publishing packages and web page editors now.
                        </div>
                        <div className="m-t text-right">

                            <a href="#" className="btn btn-xs btn-outline btn-primary">Info <i
                                className="fa fa-long-arrow-right"/> </a>
                        </div>
                    </div>
                    <hr/>
                    <div>
                        <a href="#" className="product-name"> Product 2</a>
                        <div className="small m-t-xs">
                            Many desktop publishing packages and web page editors now.
                        </div>
                        <div className="m-t text-right">

                            <a href="#" className="btn btn-xs btn-outline btn-primary">Info <i
                                className="fa fa-long-arrow-right"/> </a>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}
export default CartSummary
