import React, {useRef, useEffect} from "react";
import "../styles/css/bootstrap.min.css";
import "../styles/font-awesome/css/font-awesome.min.css";
import "../styles/css/animate.css";
import "../styles/css/style.css";
import "../styles/css/textSpinners/spinners.css";
import {Link} from "react-router-dom";

const DetailUI = (props) => {
    let div = useRef("div");
    let div2 = useRef("div2");

    useEffect(() => {
        if (props.load) {
            div.current.classList.add("sk-spinner");
            div.current.classList.add("sk-spinner-wave");
            div2.current.classList.add("sk-loading");
        } else {
            div.current.classList.remove("sk-spinner-wave");
            div.current.classList.remove("sk-spinner");
            div2.current.classList.remove("sk-loading");

        }
    }, [div, props])

    return (
        <div className="ibox">
            <div className="ibox-content">

                <div className="row">

                    <div className="col-md-5">

                        <div ref={div} className="img-container">
                            <img className="img-thumbnail " src={props.photo} alt=""/>
                            <div className="sk-rect1"/>
                            <div className="sk-rect2"/>
                            <div className="sk-rect3"/>
                            <div className="sk-rect4"/>
                            <div className="sk-rect5"/>
                        </div>

                    </div>

                    <div ref={div2} className="col-md-7 ibox-content">

                        <h2 className="font-bold m-b-xs">
                            {props.producName || "NOT PROVIDED"}
                        </h2>
                        <div className="m-t-md">
                            <h2 className="product-main-price">{props.price || "RESERVED"} <small
                                className="text-muted">Exclude Tax</small>
                            </h2>
                        </div>
                        <hr/>

                        <h4>Product description</h4>
                        <h5>{props.category || "NOT SET"}</h5>
                        <div className="small text-muted">
                            {props.description || ""}
                        </div>
                        <hr/>
                        <div>
                            <div className="btn-group">
                                <button onClick={props.addToCart} className="btn btn-primary btn-sm"><i
                                    className="fa fa-cart-plus"/> Add
                                    to cart
                                </button>
                                <button className="btn btn-white btn-sm"><i className="fa fa-star"/> Add to
                                    wishlist
                                </button>
                                <a href={`mailto: ${props.author}`} className="btn btn-white btn-sm"><i
                                    className="fa fa-envelope"/> Contact
                                    with author
                                </a>
                                <Link to="/home/my_products/" className="btn btn-white btn-sm"><i
                                    className="fa fa-home"/> Products
                                </Link>
                            </div>
                        </div>


                    </div>
                </div>

            </div>
        </div>
    )

}

export default DetailUI