import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import NewProductFormUI from "./NewProductFormUI";
import send from "../../js/send";
import authHelper from "../../js/authHelper";
import toastr from "toastr";
import msgNotification from "../../js/msgNotification";
import { connect } from "react-redux";
import { addNewProduct, setListProducts } from "../../actions/actionCreator";

const NewProductForm = ({ categories, addNewProduct, setListProducts }) => {
  const [state, setState] = useState({
    token: authHelper(),
    goBack: false,
    product: {
      name: "",
      description: "",
      price_cost: "",
      price_vent: "",
      inStock: 0,
      category: "",
      _public: false,
      image: null,
    },
  });
  const {
    name,
    description,
    price_cost,
    price_vent,
    inStock,
    category,
    _public,
  } = state.product;

  const handleFile = (file) => {
    setState({
      ...state,
      product: { ...state.product, image: file },
    });
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

    let form = new FormData();
    form.append("image", state.product.image);
    form.append("name", name);
    form.append("description", description || "");
    form.append("_public", _public);
    form.append("price_cost", price_cost);
    form.append("price_vent", "0");
    form.append("inStock", "0");
    form.append("category", category);

    if (name && price_cost && category) {
      send({ form, token: authHelper() }, "/api/product/", "file").then((r) => {
        addNewProduct(r);
        toastr.options.closeButton = true;
        toastr.options.closeHtml =
          '<button><i class="fa fa-close"></i></button>';
        toastr.success(`Producto agregado correctamente`, "Exito !");
        msgNotification(
          "Confirmar",
          "desea agregar otro producto ?",
          "question",
          "AGREGAR OTRO",
          true
        ).then((r) => {
          if (!r.value) setState({ ...state, goBack: true });
        });
      });
    } else console.error("You must fill up all input fields.");
  };

  const handleSelect = (selected) => {
    if (selected)
      setState({
        ...state,
        product: {
          ...state.product,
          category: selected.value,
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
      price_vent={price_vent}
      inStock={inStock}
      Product_category={category}
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
    setListProducts(){
      dispatch(setListProducts());
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(NewProductForm);
