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
                            <img width="300px" height="300px" style={{ objectFit: "contain" }} className="img-thumbnail " src={photo} alt=""/>
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
                            <h2 className="product-main-price">{price || "RESERVED"}</h2> <h4
                                className="text-muted">(Exclude Tax)</h4>
                            
                        </div>
                        <hr/>

                        <h4>Product description</h4>
                        <h5>{category || "NOT SET"}</h5>
                        <div className="text-muted">
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