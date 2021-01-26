import React from "react";
import "./styles/css/bootstrap.min.css";
import "./styles/font-awesome/css/font-awesome.min.css";
import "./styles/css/animate.css";
import "./styles/css/style.css";
import "./styles/css/textSpinners/spinners.css";
import {Link} from "react-router-dom";

const DetailUI = (props) => {
    if (props.load)
        return (
            <div className="ibox-content">
                <div className="row">
                    <div className="col-md-5 ">
                        <div className="">
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <div className="sk-spinner sk-spinner-wave">
                                <div className="sk-rect1"/>
                                <div className="sk-rect2"/>
                                <div className="sk-rect3"/>
                                <div className="sk-rect4"/>
                                <div className="sk-rect5"/>
                            </div>

                            {/*<div className="sk-spinner sk-spinner-double-bounce">*/}
                            {/*    <div className="sk-double-bounce1"/>*/}
                            {/*    <div className="sk-double-bounce2"/>*/}
                            {/*</div>*/}
                        </div>

                    </div>
                    <div className="col-md-7 sk-loading ibox-content">

                        <h2 className="font-bold m-b-xs">
                            {props.producName || "NOT PROVIDED"}
                        </h2>
                        <small>{props.small}</small>
                        <div className="m-t-md">
                            <h2 className="product-main-price">{props.price || "RESERVED"} <small
                                className="text-muted">Exclude Tax</small>
                            </h2>
                        </div>
                        <hr/>

                        <h4>Product description</h4>
                        <h5>{props.category}</h5>
                        <div className="small text-muted">
                            {props.description}
                        </div>
                        <hr/>
                        <div>
                            <div className="btn-group">
                                <button onClick={() => props.addToCart()} className="btn btn-primary btn-sm"><i
                                    className="fa fa-cart-plus"/> Add
                                    to cart
                                </button>
                                <button className="btn btn-white btn-sm"><i className="fa fa-star" /> Add to
                                    wishlist
                                </button>
                                <a href={`mailto: ${props.author.email}`} className="btn btn-white btn-sm"><i className="fa fa-envelope"/> Contact
                                    with author
                                </a>
                                <Link to="/" className="btn btn-white btn-sm"><i className="fa fa-home"/> Home
                                </Link>
                            </div>
                        </div>


                    </div>
                </div>

            </div>
        )
    else
        return (
            <div className="ibox-content">

                <div className="row">
                    <div className="col-md-5">
                        <div className="img-container">
                            <img className="img-thumbnail" src={props.photo} alt=""/>
                        </div>

                    </div>
                    <div className="col-md-7 ibox-content">

                        <h2 className="font-bold m-b-xs">
                            {props.producName || "NOT PROVIDED"}
                        </h2>
                        <small>{props.small}</small>
                        <div className="m-t-md">
                            <h2 className="product-main-price">{ props.price } <small
                                className="text-muted">Exclude Tax</small>
                            </h2>
                        </div>
                        <hr/>

                        <h4>Product description</h4>
                        <h5>{props.category}</h5>
                        <div className="small text-muted">
                            {props.description}
                        </div>
                        <hr/>
                        <div>
                            <div className="btn-group">
                                <button onClick={props.addToCart} className="btn btn-primary btn-sm"><i
                                    className="fa fa-cart-plus"/> Add
                                    to cart
                                </button>
                                <button className="btn btn-white btn-sm"><i className="fa fa-star" /> Add to
                                    wishlist
                                </button>
                                <a href={`mailto: ${props.author.email}`} className="btn btn-white btn-sm"><i className="fa fa-envelope"/> Contact
                                    with author
                                </a>
                                <Link to="/home/my_products/" className="btn btn-white btn-sm"><i className="fa fa-home"/> Products
                                </Link>
                            </div>
                        </div>


                    </div>
                </div>

            </div>
        )
}

export default DetailUI