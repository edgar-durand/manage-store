import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import EditUI from "./EditUI";
import send from "../../js/send";
import authHelper from "../../js/authHelper";
import store from "../../store";
import { setListProducts } from "../../actions/actionCreator";
import toastr from "toastr";
import getBase64 from "../../js/getBase64";
const Edit = (props) => {
  const [state, setState] = useState({
    back: false,
    category: [],
    product: {
      name:"",
      description:"",
      price_cost:"",
      sales_price:"",
      inStock:"",
      category_id:"",
      _public:"",
      image:"",
    },
    load: true,
  });
  const {
    name,
    description,
    price_cost,
    sales_price,
    inStock,
    category_id,
    _public,
    image,
  } = state?.product;
  const ID = props.match.params.id;
  const TOKEN = { token: authHelper() };

  if (!name)
    send({ ...TOKEN }, "/api/product_detail/" + ID, "get").then((r) =>
      setState({
        ...state,
        product: r.response?.data,
        load: false,
      })
    );

  const handlePublic = (e) => {
    setState({
      ...state,
      product: {
        ...state.product,
        [e.target.name]: e.target.checked,
      },
    });
  };

  const handleChange = (e) => {
    setState({
      ...state,
      product: {
        ...state.product,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleFile = (file) => {
    getBase64(file).then(res=>{
      setState({
      ...state,
      product: {
        ...state.product,
        image: res,
      },
    });
    })
    
  };

  const handleSelect = (selected) => {
    if (selected)
      setState({
        ...state,
        product: {
          ...state.product,
          category_id: selected.value,
        },
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && description && price_cost && category_id) {
      // let form = new FormData();
      // (image?.size && form.append("image", image));
      // form.append("name", name);
      // form.append("description", description);
      // form.append("_public", _public);
      // form.append("price_cost", price_cost);
      // form.append("price_vent", "0");
      // form.append("inStock", inStock);
      // form.append("category", category);
      send(
        { form: state.product, token: authHelper() },
        "/api/product/" + ID + "/",
        "patch"
      ).then((r) => {
        if (r.error?.message) {
          toastr.error(r.error.message, "ERROR");
        }else{
          
          toastr.success(r.response.message);
        store.dispatch(setListProducts());
        setState({ ...state, back: true });}
      });
    } else toastr.error("You must fill up all input fields.");
  };

  if (state.back) return <Redirect to="/home/my_products" />;

  return (
    <EditUI
      image={image}
      handlePublic={(e) => handlePublic(e)}
      handleFile={(file) => handleFile(file)}
      handleChange={(e) => handleChange(e)}
      handleSelect={(e) => handleSelect(e)}
      name={name}
      description={description}
      category_id={category_id}
      price_cost={price_cost}
      sales_price={sales_price}
      inStock={inStock}
      _public={_public}
      handleSubmit={(e) => handleSubmit(e)}
    />
  );
};
export default Edit;
