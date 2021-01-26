import React from "react";
import GoHomeButton from "../components/GoHomeButton";


const FatalError = () => {
    return (
        <div className="middle-box text-center animated fadeInDown">
            <h1 style={{
                color: "#bcbcbcbc"
            }}>500</h1>
            <h3 className="font-bold" style={{
                color: "#999999"
            }}>Internal Server Error</h3>
            <div className="error-desc" style={{
                color: "#ababab"
            }}>
                The server encountered something unexpected that didn't allow it to complete the request. We
                apologize.<br/>
                You can go back to main page: <br/>
                <GoHomeButton />
            </div>
        </div>
    )
}
export default FatalError