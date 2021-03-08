import React, { useState } from "react";
import DetailUI from "./DetailUI";
import send from "../../js/send";
import authHelper from "../../js/authHelper";
import store from "../../store";
import { addToCart } from "../../actions/actionCreator";

const Detail = (props) => {
  const [product, setProduct] = useState({ product: {}, load: true });
  const TOKEN = { token: authHelper() };
  const { name, image, description, category, _public } = product.product;
  let price_cost;
  product.product.price_cost
    ? (price_cost = `$ ${product.product.price_cost}`)
    : (price_cost = "RESERVED");
  const ID = props.match.params.id;

  if (!Object.values(product.product).length)
    send(TOKEN, "/api/product/" + ID, "get").then((r) => 
      setProduct({
        ...product,
        product: r.response.data[0],
        load: false,
      })
    ); 

  return (
    <DetailUI
      {..._public}
      photo={image}
      producName={name}
      category={category}
      author={`${
        JSON.parse(localStorage.getItem("store"))?.globalState?.email
      }`}
      price={price_cost}
      description={description}
      addToCart={() => store.dispatch(addToCart(product.product))}
      load={product.load}
    />
  );
};


export default Detail;
