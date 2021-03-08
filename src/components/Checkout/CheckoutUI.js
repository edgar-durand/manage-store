import React, { useRef } from "react";
import Select from "react-select";
import { Link } from "react-router-dom";
import CartSummary from "../CartSummary/CartSummary";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/fontawesome";

const CheckoutUI = ({
  credit,
  total,
  handleSelect,
  handleCheckout,
  items,
  accounts,
}) => {
  const label = useRef("label");
  

  if (label.current.classList)
    if (credit >= total) {
      label.current.classList.remove("text-warning");
      label.current.classList.add("text-success");
    } else {
      label.current.classList.remove("text-success");
      label.current.classList.add("text-warning");
    }

  return (
    <div className="wrapper wrapper-content">
      <div className="row">
        <div className="col-md-9 animated fadeInRight">
          <div className="ibox">
            <div className="ibox-title">
              <span className="float-right">
                (<strong>{items}</strong>) items purchased
              </span>
              <h5>Checkout</h5>
            </div>
            <div className="ibox-content">
              <label className="col-12 form-inline">
                {" "}
                Account credit:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                <h5 className="text-center" ref={label}>
                  {" "}
                  $ {credit?.toFixed(2) || 0}{" "}
                </h5>
                <p>
                  {credit >= total ? (
                    <FontAwesomeIcon icon={"check"} size="2x" />
                  ) : (
                    <FontAwesomeIcon icon={"angry"} size="2x" />
                  )}
                </p>
              </label>
              <div className="col-12">
                <Select
                  options={Object.values(accounts).map((x) => ({
                    value: x.id,
                    label: `${x.name} ${x.description}`,
                  }))}
                  isClearable={true}
                  placeholder="Select account"
                  name="accounts"
                  onChange={(e) => handleSelect(e)}
                />
              </div>              
            </div>
            <div className="ibox-content">
              <button
                onClick={() => handleCheckout()}
                className="btn btn-primary float-right col-auto"
              >
                <i style={{ fontSize: "20px" }} className="fa fa-check" />{" "}
                Checkout
              </button>
              <Link to="/home/shopping/" className="btn btn-white">
                <i className="fa fa-arrow-left" /> Continue shopping
              </Link>
            </div>
          </div>
        </div>
        <CartSummary total={total} />
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    items: +Object.values(state.cart).length,
    accounts: state.accounts,
  };
};
export default connect(mapStateToProps)(CheckoutUI);
