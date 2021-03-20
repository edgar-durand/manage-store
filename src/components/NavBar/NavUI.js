import React from "react";
import "../styles/fontawesome";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import NavHeader from "./NavHeader";
import NavLi from "./NavLi";
import {
    faAddressBook,
    faCreditCard,
    faHome,
    faShoppingBag,
    faShoppingBasket,
    faShoppingCart,
    faUserEdit
} from "@fortawesome/free-solid-svg-icons";

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
                <ul className="nav metismenu animated fadeIn" id="side-menu">
                    <NavHeader name={last_name} profile_small={image} status={status_message} />
                    <NavLi
                        title="Home"
                        icon={faHome}
                        to="/home"
                    />
                    <NavLi
                        title="My accounts"
                        icon={faCreditCard}
                        to="/home/my_accounts"
                    />
                    <NavLi
                        title="My products"
                        icon={faShoppingBasket}
                        to="/home/my_products"
                        span={<span className="label label-success float-right">{products}</span>}
                    />
                    <NavLi
                        title="Go for shopping"
                        icon={faShoppingCart}
                        to="/home/shopping"
                    />
                    <NavLi
                        title="Deals"
                        icon={faShoppingBag}
                        to="/home/deals"
                    />
                    <NavLi
                        title="Profile"
                        icon={faUserEdit}
                        to="/home/profile"
                    />
                    <NavLi
                        title="Contacts"
                        icon={faAddressBook}
                        to="/home/user-contact"
                        span={<span className="label label-success float-right">
                {contacts > 0 ? contacts : 0}
              </span>}
                    />

                    <li>
                        <Link onClick={() => logOut()} to={document.location.pathname}>
                            <FontAwesomeIcon icon={'sign-out-alt'} size="2x"/>{" "}
                            <span className="nav-label">Logout</span>
                        </Link>
                    </li>

                </ul>
            </div>
        </nav>
    );
};

const mapStateToProps = (state) => {
    return {
        products: Object.values(state?.productList || []
        ).length,
        contacts:
            Object.values(state?.users || []).length -
            1,
    };
};
export default connect(mapStateToProps)(NavUI);
