import React, { useRef } from "react";
import "../styles/fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AddNewButton = () => {
  const h = useRef("h");
  return (
    <div
      onMouseOver={() => {
        h.current.classList.remove("text-muted");
        h.current.classList.add("text-success");
      }}
      onMouseOut={() => {
        h.current.classList.remove("text-success");
        h.current.classList.add("text-muted");
      }}
      className="card"
      style={{height:"20px"}}
    >
      <div className="ibox-content payment-card text-center col-12">
        <FontAwesomeIcon icon={"plus"} size="6x" transform="grow-7 down-2" />
        <div className="ibox"></div>
        <h2 ref={h} className="text-muted">
          New account
        </h2>
      </div>
      
        
     
    </div>
  );
};
export default AddNewButton;
