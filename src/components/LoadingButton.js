import React from "react";
const LoadingButton = (props) => {

    if (!props.load)
        return <button type="submit" disabled={props.disabled}
                       className="btn btn-primary block full-width m-b">{props.buttonText}</button>
    else
        return (
            <button type="submit"
                    className="btn btn-default block full-width m-b text-dark" disabled={true}>Loading <span
                className="loading dots"/>
            </button>
        )
}
export default LoadingButton;