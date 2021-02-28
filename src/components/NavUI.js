import React from "react";
import "./styles/fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const NavUI = ({
  logOut,
  image,
  last_name,
  status_message,
  products,
  contacts,
}) => {
  return (
    <nav className="navbar-default navbar-static-side" role="navigation">
      <div className="sidebar-collapse">
        <ul className="nav metismenu" id="side-menu">
          <li className="nav-header">
            <div>
              {image ? (
                <img
                  style={{ objectFit: "contain" }}
                  alt=""
                  width="150"
                  height="150"
                  className="rounded-circle m-b-md"
                  src={image}
                />
              ) : (
                <FontAwesomeIcon icon={'user-circle'} style={{ fontSize: "150px" }} />
                
              )}

              <span
                className="block m-t-xs font-bold"
                style={{ color: "white" }}
              >
                {last_name}
              </span>
              <span className="text-muted text-xs block">{status_message}</span>
            </div>
            <div className="logo-element">ES+</div>
          </li>
          <li>
            <Link to="/home">
              <FontAwesomeIcon icon={'home'} size="2x" />
              <span className="nav-label active"> Home </span>
            </Link>
          </li>
          <li>
            <Link to="/home/my_accounts/">
              <FontAwesomeIcon icon={'credit-card'} size="2x" />{" "}
              <span className="nav-label"> My accounts</span>
            </Link>
          </li>
          <li>
            <Link to="/home/my_products/">
              <FontAwesomeIcon icon={'shopping-basket'} size="2x" />{" "}
              <span className="nav-label">My products </span>{" "}
              <span className="label label-success float-right">
                {" "}
                {products}
              </span>
            </Link>
          </li>

          <li>
            <Link to="/home/shopping/">
              <FontAwesomeIcon icon={'shopping-cart'} size="2x" />{" "}
              <span className="nav-label">Go for shopping</span>
            </Link>
          </li>

          <li>
            <Link to="/home/deals/">
              <FontAwesomeIcon icon={'shopping-bag'} size="2x" />{" "}
              <span className="nav-label">Deals</span>
            </Link>
          </li>

          {/*<li>*/}
          {/*    <a href=""><i className="fa fa-magic"/> <span className="nav-label">CSS Animations </span><span*/}
          {/*        className="label label-info float-right">62</span></a>*/}
          {/*</li>*/}
          <div className="fc-divider" />
          <li>
            <Link to="/home/profile">
              <FontAwesomeIcon icon={'user-edit'} size="2x" />
              <span className="nav-label"> Profile </span>
            </Link>
          </li>
          <li>
            <Link to="/home/user-contact/">
              <FontAwesomeIcon icon={'address-book'} size="2x" />{" "}
              <span className="nav-label">Contacts</span>
              <span className="label label-success float-right">
                {contacts}
              </span>
            </Link>
          </li>
          {/* <div className="fc-divider" /> */}
          <li>
            <Link onClick={() => logOut()} to={document.location.pathname}>
              <FontAwesomeIcon icon={'sign-out-alt'} size="2x" />{" "}
              <span className="nav-label">Logout</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

const mapStateToProps = () => {
  return {
    products: Object.values(
      JSON.parse(localStorage.getItem("store"))?.productList || []
    ).length,
    contacts:
      Object.values(JSON.parse(localStorage.getItem("store"))?.users || []).length -
      1,
  };
};
export default connect(mapStateToProps)(NavUI);
