import React, {Fragment} from "react";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "./styles/fontawesome";

const Product = ({
                     addToCart,
                     image,
                     description,
                     price_cost,
                     sales_price,
                     are_mine,
                     category,
                     name,
                     id,
                 }) => {
    return (
        <Fragment>
            <div
                className="col-3 float-left"
                style={{
                    display: "contents",
                }}
            >
                <div className="ibox">
                    <div className="ibox-content product-box">
                        <div>
                            <img
                                height="200"
                                width="184"
                                src={image}
                                style={{
                                    objectFit: "contain",
                                }}
                                alt=""
                            />
                        </div>
                        <div className="product-desc">
              <span className="product-price">
                {are_mine === true ? `$ ${price_cost?.toFixed(2)}`: sales_price === 0 ? "RESERVED" : `$ ${sales_price?.toFixed(2) }` }
              </span>
                            <small className="text-muted">{category || "Category"}</small>
                            <Link to="#" className="product-name">
                                {" "}
                                {name?.toUpperCase()?.substring(0, 15)}
                            </Link>

                            <div className="small m-t-xs">
                                {description?.substring(0, 25)}...
                            </div>
                            <div className="m-t text-left">
                                <button
                                    onClick={(event) => addToCart(event)}
                                    className="btn btn-outline btn-primary"
                                >
                                    Add <FontAwesomeIcon icon={"shopping-cart"}/>
                                </button>

                                <Link
                                    to={`/home/detail/${id}`}
                                    className="btn btn-outline btn-primary"
                                >
                                    Info <i className="fa fa-long-arrow-right"/>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-auto"/>
        </Fragment>
    );
};
export default Product;
