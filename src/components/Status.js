import React from "react"

const Status = ({status}) => {
   if (status)
    return <span className="label label-primary">Public</span>
else
    return <span className="label label-danger">Reserved</span>
}
export default Status