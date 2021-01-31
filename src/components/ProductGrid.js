import React from "react";
import "../components/styles/css/bootstrap.min.css";
import "../components/styles/font-awesome/css/font-awesome.min.css";
import "../components/styles/css/animate.css";
import "../components/styles/css/style.css";
import "../components/styles/css/textSpinners/spinners.css";
import {Link} from "react-router-dom";

const Product = (props) => {
    return (
        <div className="col-md-2">
            <div className="ibox">
                <div className="ibox-content product-box">

                    <div>
                        <img height="200" width="184" src={props.img} style={{
                                                        objectFit: "contain"
                        }} alt=""/>

                    </div>
                    <div className="product-desc">
                                <span className="product-price">
                                    {`$ ${props.price}` || "RESERVED"}
                                </span>
                        <small className="text-muted">{props.category || "Category"}</small>
                        <Link to="#" className="product-name"> {props.name.toUpperCase().substring(0,15)}</Link>

                        <div className="small m-t-xs">
                            {props.description.substring(0,25)}...
                        </div>
                        <div className="m-t text-right">

                            <Link to={`/home/detail/${props.productId}`}
                                  className="btn btn-xs btn-outline btn-primary">Info <i
                                className="fa fa-long-arrow-right"/></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Product