import React from "react";
import {Link} from "react-router-dom";

const NavUI = (props) => (
    <nav className="navbar-default navbar-static-side" role="navigation">
        <div className="sidebar-collapse">
            <ul className="nav metismenu" id="side-menu">
                <li className="nav-header">
                    <div className="dropdown profile-element">
                        <img alt="image" className="rounded-circle" src="/img/profile_small.jpg"/>
                        <a data-toggle="dropdown" className="dropdown-toggle" href="#">
                            <span className="block m-t-xs font-bold">David Williams</span>
                            <span className="text-muted text-xs block">Art Director <b className="caret"></b></span>
                        </a>
                        <ul className="dropdown-menu animated fadeInRight m-t-xs">
                            <li><a className="dropdown-item" href="profile.html">Profile</a></li>
                            <li><a className="dropdown-item" href="contacts.html">Contacts</a></li>


                        </ul>
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
                    <Link to="/home/my_products/"><i className="fa fa-diamond"></i> <span className="nav-label">My store</span></Link>
                </li>

                <li>
                    <a href="#"><i className="fa fa-shopping-cart"></i> <span
                        className="nav-label">E-commerce</span><span className="fa arrow"></span></a>
                </li>

                <li>
                    <a href="css_animation.html"><i className="fa fa-magic"></i> <span className="nav-label">CSS Animations </span><span
                        className="label label-info float-right">62</span></a>
                </li>
                <li className="landing_link">
                    <Link to="/home/new_product/"><i className="fa fa-star"/> <span
                        className="nav-label">New product</span>
                        <span className="label label-warning float-right">NEW</span></Link>
                </li>
                <div className="fc-divider"/>
                <li className="special_link">
                    <Link onClick={() => props.logOut()} to="/home"><i className="fa fa-close"/> <span
                        className="nav-label">Logout</span></Link>
                </li>
            </ul>

        </div>
    </nav>
)


export default NavUI