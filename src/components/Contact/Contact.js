import React from "react";
import {Link} from "react-router-dom";
import bg from "../../static/css/patterns/3.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "../styles/fontawesome";
import "../../components/styles/css/plugins/jasny/jasny-bootstrap.min.css";
import "../../components/styles/css/plugins/bootstrapSocial/bootstrap-social.css";

const Contact = ({
                     first_name,
                     last_name,
                     status_message,
                     street,
                     between,
                     number,
                     building,
                     apto,
                     municipality,
                     province,
                     phone,
                     email,
                     id,
                     photo,
                     facebook,
                     twitter,
                     instagram,
                     col
                 }) => {
    return (
        <React.Fragment>
            <div className={`col-${col || 3}`}>
                <div className="contact-box center-version">
                    <Link
                        to={"/home/deals/" + id}
                        className="btn btn-xs btn-outline-light"
                    >
                        {photo ? (
                            <img
                                alt=""
                                width="100px"
                                style={{objectFit: "contain"}}
                                height="100px"
                                className="rounded-circle"
                                src={photo}
                            />
                        ) : (
                            <FontAwesomeIcon icon={"user-circle"} size="9x"/>
                        )}

                        <h3 className="m-b-xs">
                            <strong>{`${first_name?.replace(/\b\s.*\b/, "") || "First &"} ${
                                last_name || "Last Name"
                            }`}</strong>
                        </h3>
                        <div className="font-bold">
                            {status_message || "No status message"}
                        </div>
                        <address className="m-t-md">
                            {`${street || "No street"}, %: ${between || "No address"} ${
                                number || "No number"
                            },
             ${building || "No building"} ${apto || "No apto"}, ${
                                municipality || "No municipality"
                            } - ${province || "No province"} `.substr(0, 95)}
                            <br/>
                            <abbr title="Phone">P:</abbr> {phone || "No phone"}
                        </address>
                    </Link>
                    <div
                        className="contact-box-footer"
                        style={{backgroundImage: `url(${bg})`}}
                    >
                        <div className="m-t-xs btn-group">
                            {facebook ? (
                                <a
                                    target="blank"
                                    href={"http://www.facebook.com/" + facebook}
                                    className="btn btn-social-icon btn-sm btn-facebook"
                                >
                                    Facebook
                                </a>
                            ) : null}
                            {twitter ? (
                                <a
                                    target="blank"
                                    href={"http://www.twitter.com/" + twitter}
                                    className="btn btn-social-icon btn-sm btn-twitter"
                                >
                                    twitter
                                </a>
                            ) : null}
                            {instagram ? (
                                <a
                                    target="blank"
                                    href={"http://www.instagram.com/" + instagram}
                                    className="btn btn-social-icon btn-sm btn-instagram"
                                >
                                    Instagram
                                </a>
                            ) : null}

                            <a
                                href={"mailto:" + (email || "")}
                                className="btn btn-sm btn-outline-light"
                            >
                                <i className="fa fa-envelope"/> Email
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Contact;
