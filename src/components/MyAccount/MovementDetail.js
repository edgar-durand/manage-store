import React, {useEffect} from "react";
import send from "../../js/send";
import authHelper from "../../js/authHelper";

const MovementDetail = (props) =>{
    const ID = props.match.params.id;
    const DATE = props.match.params.date;
    useEffect(()=>{
        send({token:authHelper(),date:DATE},`/api/purchase/${ID}`,'post')
            .then(res=>{
                console.log(res.response.data,res.response.message);
            })
    },[ID,DATE])
    return <div>{`${ID} ${DATE}`}</div>
}
export default MovementDetail