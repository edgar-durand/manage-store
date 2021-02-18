import React, { useState } from "react";
import ProductGrid from "../ProductGrid";
import dataToPages from "../../js/dataToPages";
import { connect } from "react-redux";
import CartSummary from "../CartSummary/CartSummary";
import NewProductForm from "../NewProductForm/NewProductForm";

const GoForShopping = ({ products, cart, addToCart }) => {
  const [state, setState] = useState({
    total: 0,
    searchField: "",
    match: { active: false, value: 0 },
    show: 6,
    page: 0,
  });

  if (state.total === 0)
    if (Object.values(cart).length)
      setState({
        ...state,
        total: +Object.values(cart).reduce((a, b) => a + b.price_cost, 0),
      });

  const { searchField, match } = state;

  let filtered = [];
  !match.active
    ? (filtered = {
        ...Object.values(products).filter(
          (x) =>
            x.name.toUpperCase().indexOf(searchField.toUpperCase()) !== -1 ||
            x.description.toUpperCase().indexOf(searchField.toUpperCase()) !==
              -1
        ),
      })
    : (filtered = {
        ...Object.values(products).filter(
          (x) =>
            (x.name.toUpperCase().indexOf(searchField.toUpperCase()) !== -1 ||
              x.description.toUpperCase().indexOf(searchField.toUpperCase()) !==
                -1) &&
            x.price_cost <= match.value
        ),
      });
  const MO = { ...dataToPages(filtered, state.show, state.page) };

  const handleMatch = (e) => {
    setState({ ...state, match: { ...state.match, value: e.target.value } });
  };
  const handleMatchControl = () => {
    match.active
      ? setState({ ...state, match: { ...state.match, active: false } })
      : setState({ ...state, match: { ...state.match, active: true } });
  };
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  if (Object.values(products).length) {
    return (
      <React.Fragment>
        <div className="col-12 ">
          <div className="ibox-content form-inline ">
            <label className="col-1">Show:</label>
            <input
              onChange={(event) =>
                setState({ ...state, page: 0, show: +event.target.value })
              }
              value={state.show}
              className="col-lg-1 form-control"
              type="number"
              min="0"
              max={Object.values(filtered).length}
            />
            &nbsp;&nbsp; / {Object.values(filtered).length}
            <label className="col-1" />
            <button
              onClick={() =>
                state.page > 0
                  ? setState({ ...state, page: state.page - 1 })
                  : null
              }
              className="btn btn-outline-primary "
            >
              <i className="fa fa-backward" /> Prev
            </button>
            <button
              onClick={() =>
                state.page < Object.values(filtered).length / state.show - 1
                  ? setState({ ...state, page: state.page + 1 })
                  : null
              }
              className="btn btn-outline-primary "
            >
              Next <i className="fa fa-forward" />
            </button>
            <label className="col-1">Search</label>
            <input
              type="text"
              name="searchField"
              className="form-control"
              onChange={(e) => handleChange(e)}
            />
            <label className="col-1">Top price:</label>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input
              type="checkbox"
              name="matchControl"
              onChange={() => handleMatchControl()}
            />
            <label /> &nbsp;&nbsp; $ &nbsp;&nbsp;
            <input
              type="number"
              min="0"
              name="match"
              className="form-control col-2"
              disabled={match.active === false}
              onChange={(e) => handleMatch(e)}
            />
          </div>
        </div>
        <div className="wrapper wrapper-content col-12 ">
          <div className="row float-left col-9 animated fadeInRight ">
            {Object.values(MO).map((x, index) => {
              return (
                <ProductGrid
                  key={index}
                  img={x.image}
                  name={x.name}
                  price={x.price_cost}
                  category={x.category}
                  description={x.description}
                  addToCart={(id, e) => addToCart(id, e)}
                  productId={x.id}
                />
              );
            })}
          </div>
          <CartSummary />
        </div>
      </React.Fragment>
    );
  }
  return <NewProductForm />;
};
const mapStateToProps = (state) => {
  return {
    products: state.productList,
    cart: state.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart(id, e) {
      e.preventDefault();
      dispatch({
        type: "ADD_TO_CART",
        product: {
          ...Object.values(JSON.parse(localStorage.getItem("store")).productList).find(
            (x) => x.id === id
          ),
        },
      });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(GoForShopping);
