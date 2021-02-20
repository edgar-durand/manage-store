import React, {Fragment} from "react";
import "../components/styles/css/bootstrap.min.css";
import "../components/styles/font-awesome/css/font-awesome.min.css";
import "../components/styles/css/animate.css";
import "../components/styles/css/style.css";
import "../components/styles/css/textSpinners/spinners.css";
import {Link} from "react-router-dom";

const Product = ({addToCart,image,description,price_cost,category,name,id}) => {
    return (
        <Fragment>
            <div className="col-3 float-left" style={{
                display: "contents",
            }}>
                <div className="ibox">
                    <div className="ibox-content product-box">
                        <div>
                            <img height="200" width="184" src={image}
                                 style={{
                                     objectFit: "contain"
                                 }} alt=""/>

                        </div>
                        <div className="product-desc">
                                <span className="product-price">
                                    {`$ ${price_cost}` || "RESERVED"}
                                </span>
                            <small className="text-muted">{category || "Category"}</small>
                            <Link to="#" className="product-name"> {name.toUpperCase().substring(0, 15)}</Link>

                            <div className="small m-t-xs">
                                {description.substring(0, 25)}...
                            </div>
                            <div className="m-t text-left">
                                <button onClick={(event) => addToCart(event)}
                                   className="btn btn-outline btn-primary">Add <i
                                    className="fa fa-shopping-cart"/></button>


                                <Link to={`/home/detail/${id}`}
                                      className="btn btn-outline btn-primary">Info <i
                                    className="fa fa-long-arrow-right"/></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-auto"/>
        </Fragment>
    )
}
export default Product