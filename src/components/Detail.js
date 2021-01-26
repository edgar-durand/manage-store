import React, {useState, useEffect} from "react";
import DetailUI from "./DetailUI";
import send from "../js/send";
import authHelper from "../js/authHelper";
import mock_data from "../mock_data.json";
import store from "../store"

const Detail = (props) => {
    const [product, setProduct] = useState({product: {...mock_data}, load: true});
    const TOKEN = {token: authHelper()};
    const {name, image, description, category, inStock, _public,} = product.product;
    let price_vent;
    product.product.price_vent ? price_vent = `$ ${product.product.price_vent}` : price_vent = "RESERVED"
    const ID = props.match.params.id;


    useEffect(
        () => {
            send(TOKEN, "/api/product/" + ID, "get")
                .then(r => setProduct({
                    ...product, product: {...r}, load: false
                }));
        },
        []
    )


    const addToCart = () => {
        store.dispatch({
            type: "ADD_TO_CART",
            product: product.product
        })

    }

    return (
        <DetailUI
            photo={image}
            producName={name}
            category={category}
            small={`Owner`}
            author={`email@etecsa.cu`}
            price={price_vent}
            description={description}
            addToCart={() => addToCart()}
            load={product.load}
        />
    )
};
export default Detail