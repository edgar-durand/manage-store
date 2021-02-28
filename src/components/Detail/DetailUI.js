import React, {useRef, useEffect} from "react";
import {Link} from "react-router-dom";

const DetailUI = ({load,photo,producName,price,category,description,author,addToCart}) => {
    let div = useRef("div");
    let div2 = useRef("div2");

    useEffect(() => {
        if (load) {
            div.current.classList.add("sk-spinner");
            div.current.classList.add("sk-spinner-wave");
            div2.current.classList.add("sk-loading");
        } else {
            div.current.classList.remove("sk-spinner-wave");
            div.current.classList.remove("sk-spinner");
            div2.current.classList.remove("sk-loading");

        }
    }, [div, load])

    return (
        <div className="ibox">
            <div className="ibox-content">

                <div className="row">

                    <div className="col-md-5">

                        <div ref={div} className="img-container">
                            <a target="blank" href={photo}><img className="img-thumbnail " src={photo} alt=""/></a>
                            <div className="sk-rect1"/>
                            <div className="sk-rect2"/>
                            <div className="sk-rect3"/>
                            <div className="sk-rect4"/>
                            <div className="sk-rect5"/>
                        </div>

                    </div>

                    <div ref={div2} className="col-md-7 ibox-content">

                        <h2 className="font-bold m-b-xs">
                            {producName || "NOT PROVIDED"}
                        </h2>
                        <div className="m-t-md">
                            <h2 className="product-main-price">{price || "RESERVED"} <small
                                className="text-muted">Exclude Tax</small>
                            </h2>
                        </div>
                        <hr/>

                        <h4>Product description</h4>
                        <h5>{category || "NOT SET"}</h5>
                        <div className="small text-muted">
                            {description || ""}
                        </div>
                        <hr/>
                        <div>
                            <div className="btn-group">
                                <button onClick={()=>addToCart()} className="btn btn-primary btn-sm"><i
                                    className="fa fa-cart-plus"/> Add
                                    to cart
                                </button>
                                <button className="btn btn-white btn-sm"><i className="fa fa-star"/> Add to
                                    wishlist
                                </button>
                                <a href={`mailto: ${author}`} className="btn btn-white btn-sm"><i
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