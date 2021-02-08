import React from "react";
import {Link} from "react-router-dom";

const TopBarUI = (props) => (
    <div className="row border-bottom">
        <nav className="navbar navbar-static-top" role="navigation" style={{marginBottom: 0}}>
            <div className="navbar-header">
                <button className="navbar-minimalize minimalize-styl-2 btn btn-primary "><i
                    className="fa fa-bars"/></button>
                <form role="search" className="navbar-form-custom" action="">
                    <div className="form-group">
                        <input type="text" placeholder="Search for something..." className="form-control"
                               name="top-search" id="top-search"/>
                    </div>
                </form>
            </div>
            <ul className="nav navbar-top-links navbar-right">
                <li style={{padding: "20px"}}>
                    <span className="m-r-sm text-muted welcome-message">Welcome to INSPINIA+ Admin Theme.</span>
                </li>
                <li>
                    <Link to={document.location.pathname} onClick={() => props.logOut()}>
                        <i className="fa fa-sign-out"/> Log out
                    </Link>
                </li>
            </ul>
        </nav>
    </div>
)
export default TopBarUI