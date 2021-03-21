import React, {useState} from "react";
import DetailUI from "./DetailUI";
import send from "../../js/send";
import authHelper from "../../js/authHelper";
import store from "../../store";
import {addToCart} from "../../actions/actionCreator";
import {storeToLocalStore} from "../../js/storeHelper";

const Detail = (props) => {
    const [product, setProduct] = useState({product: {}, load: true});
    const TOKEN = {token: authHelper()};
    const {name, image, description, category, _public, price_cost, sales_price} = product.product;

    const ID = props.match.params.id;

    if (!Object.values(product.product).length)
        send(TOKEN, "/api/product_detail/" + ID, "get").then((r) =>
            setProduct({
                ...product,
                product: r.response.data,
                load: false,
            })
        );
    const isMy = store.getState().productList.find(x => x.id === product.product.id);
    return (
        <DetailUI
            {..._public}
            photo={image}
            producName={name}
            category={category}
            author={`${
                JSON.parse(localStorage.getItem("globalState"))?.email
            }`}
            price={isMy ? price_cost : (sales_price ?? "RESERVED")}
            description={description}
            addToCart={() => {
                store.dispatch(addToCart(product.product));
                storeToLocalStore('cart','cart');
            }}
            load={product.load}
        />
    );
};


export default Detail;
