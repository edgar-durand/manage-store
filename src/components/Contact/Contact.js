import React from "react";
import { Link } from "react-router-dom";
import bg from "../../images/patterns/3.png";
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
}) => {
  return (
    <React.Fragment>
      <div className="col-lg-3">
        <div className="contact-box center-version">
        <Link to={"/home/deals/" + id} className="btn btn-xs btn-outline-light">
            {photo ? (
              <img
                alt=""
                width="100px"
                style={{ objectFit: "contain" }}
                height="100px"
                className="rounded-circle"
                src={photo}
              />
            ) : (
              <i style={{ fontSize: "100px" }} className="fa fa-user-circle" />
            )}

            <h3 className="m-b-xs">
              <strong>{`${first_name || "First &"} ${last_name || "Last Name"}`}</strong>
            </h3>
            <div className="font-bold">{status_message || "No status message"}</div>
            <address className="m-t-md">
            
              {`${street || "No street"}, %: ${between || "No address"} ${number || "No number"},
             ${building || "No building"} ${apto || "No apto"}, ${municipality || "No municipality"} - ${
                province || "No province"
              } `.substr(0,95)}
              <br/>
              <abbr title="Phone">P:</abbr> {phone || "No phone"}
            </address>
          </Link>
          <div className="contact-box-footer"  style={{backgroundImage: `url(${bg})`}}>
            <div className="m-t-xs btn-group" >              
              <a
                href={"mailto:" + (email || "")}
                className="btn btn-xs btn-white"
              >
                <i className="fa fa-envelope" /> Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Contact;
