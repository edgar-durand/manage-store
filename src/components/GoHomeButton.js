import React from "react";
import {faHome} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";

const GoHomeButton = () => (
    <Link to="/login" className="btn btn-primary m-t">
        <FontAwesomeIcon icon={faHome} transform="grow-10" />
    </Link>
);
export default GoHomeButton




