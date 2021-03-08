import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import NewProductFormUI from "./NewProductFormUI";
import send from "../../js/send";
import authHelper from "../../js/authHelper";
import toastr from "toastr";
import msgNotification from "../../js/msgNotification";
import { connect } from "react-redux";
import { addNewProduct } from "../../actions/actionCreator";
import getBase64 from "../../js/getBase64";

const NewProductForm = ({ categories, addNewProduct }) => {
  const [state, setState] = useState({
    token: authHelper(),
    goBack: false,
    product: {
      name: "",
      description: "",
      price_cost: "",
      price_vent: "",
      inStock: 0,
      category_id: "",
      _public: false,
      image: null,
    },
  });
  const {
    name,
    description,
    price_cost,
    inStock,
    category_id,
    _public,
  } = state.product;

  const handleFile = (file) => {
    getBase64(file).then(res=>{
      setState({
      ...state,
      product: { ...state.product, image: res },
    });
    })
    
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && price_cost && category_id) {
      // let form = new FormData();
      // for (let [keys, values] of Object.entries(state.product))
      //   form.append(keys, values);

      send({ ...state.product, token: authHelper() }, "/api/product", "post").then((r) => {
        if (!r.error?.message) {
          console.log(r);
          addNewProduct(r.response?.data);
          msgNotification(
            "Confirmar",
            "desea agregar otro producto ?",
            "question",
            "AGREGAR OTRO",
            true
          ).then((r) => {
            if (!r.value) setState({ ...state, goBack: true });
          });
        } else {
          toastr.error(r.error.message, "ERROR");
        }
      });
    } else toastr.error("You must fill up all input fields.", "ERROR");
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

  if (state.goBack) return <Redirect to="/home/my_products/" />;

  return (
    <NewProductFormUI
      handlePublic={(e) => handlePublic(e)}
      handleFile={(file) => handleFile(file)}
      handleChange={(e) => handleChange(e)}
      category={categories}
      name={name}
      description={description}
      price_cost={price_cost}
      inStock={inStock}
      Product_category={category_id}
      _public={_public}
      handleSubmit={(e) => handleSubmit(e)}
      handleSelect={(e) => handleSelect(e)}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    categories: state.categories,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addNewProduct(product) {
      dispatch(addNewProduct(product));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(NewProductForm);
