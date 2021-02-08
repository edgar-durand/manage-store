import React from "react";
import {Link} from "react-router-dom";

const GoHomeButton = () => (
    <Link to="/login" className="btn btn-primary m-t"><i title="Back to Home" style={{
        fontSize: '50px'
    }} className="fa fa-home"/></Link>
);
export default GoHomeButton




