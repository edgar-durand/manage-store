import React from "react"

const ToastUI = () =>(

    `<div className="toast toast toast-bootstrap hide" role="alert" aria-live="assertive" aria-atomic="true" style={{
        position: "absolute",
        top:"20px",
        right:"20px" }}>
        <div className="toast-header">
            <i className="fa fa-square text-navy"> </i>
            <strong className="mr-auto m-l-sm">Notification</strong>
            <small>1 min ago</small>
            <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div className="toast-body">
            Welcome to <strong>INSPINIA</strong> - Responsive Admin Theme.
        </div>
    </div>`

)
export default ToastUI