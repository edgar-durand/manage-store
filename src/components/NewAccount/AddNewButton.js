import React,{useRef} from "react";


const AddNewButton =()=> {
    const i = useRef("i");
    const h = useRef("h");
   return (
        <div onMouseOver={()=> {
            i.current.classList.add("text-primary")
            h.current.classList.remove("text-muted")
            h.current.classList.add("text-success")
        }} onMouseOut={()=> {
            i.current.classList.remove("text-primary")
            h.current.classList.remove("text-success")
            h.current.classList.add("text-muted")
        }} className="col-auto">
            <div className="payment-card text-center">
                <i ref={i} className="fa fa-plus-circle payment-icon-big  col-auto"/>
                <h4 ref={h} className="text-muted">New account</h4>


            </div>
        </div>
    )
}
export default AddNewButton