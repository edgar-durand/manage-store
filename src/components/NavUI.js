import React from "react";
import {Link} from "react-router-dom";

const NavUI = ({logOut, image, last_name,status_message}) => (
    <nav className="navbar-default navbar-static-side" role="navigation">
        <div className="sidebar-collapse">
            <ul className="nav metismenu" id="side-menu">
                <li className="nav-header">
                    <div className="dropdown profile-element">
                        <img alt="User image" className="rounded-circle" src={image}/>
                        <span className="block m-t-xs font-bold">{last_name}</span>
                        <span className="text-muted text-xs block">{status_message}</span>
                    </div>
                    <div className="logo-element">
                        IN+
                    </div>
                </li>
                <li>
                    <Link to="/home"><i className="fa fa-th-large"/><span
                        className="nav-label"> Home </span></Link>
                </li>
                <li>
                    <Link to="/home/my_products/"><i className="fa fa-diamond"/> <span
                        className="nav-label">My store</span></Link>
                </li>
                <li>
                    <Link to="/home/categories/"><i className="fa fa-diamond"/> <span
                        className="nav-label">Categories</span></Link>
                </li>

                <li>
                    <a href="#"><i className="fa fa-shopping-cart"/> <span
                        className="nav-label">E-commerce</span><span className="fa arrow"/></a>
                </li>

                <li>
                    <a href=""><i className="fa fa-magic"/> <span className="nav-label">CSS Animations </span><span
                        className="label label-info float-right">62</span></a>
                </li>
                <li className="landing_link">
                    <Link to="/home/new_product/"><i className="fa fa-star"/> <span
                        className="nav-label">New product</span>
                        <span className="label label-warning float-right">NEW</span></Link>
                </li>
                <div className="fc-divider"/>
                <li className="special_link">
                    <Link onClick={() => logOut()} to="/home"><i className="fa fa-close"/> <span
                        className="nav-label">Logout</span></Link>
                </li>
            </ul>

        </div>
    </nav>
)


export default NavUI