import React, {useEffect, useState} from "react";
import send from "../../js/send";
import authHelper from "../../js/authHelper";
import ProductGrid from "../ProductGrid";
import Contact from "../Contact/Contact";
import {uuidv4} from "../../js/uuidv4";

const MovementDetail = (props) => {
    const ID = props.match.params.id;
    const MOV = props.match.params.mov;
    const [detail, setDetail] = useState([]);
    useEffect(() => {
        send({token: authHelper(), movement_id: MOV}, `/api/purchase/${ID}`, 'post')
            .then(res => {
                setDetail(res.response.data);
            })
    }, [ID, MOV])
    return (
        <React.Fragment>
            <div className="row animated fadeInRight ">
                {detail.map(purchase => {
                    return (
                        <div key={uuidv4()} className="ibox ibox-content col-lg-6 table-responsive">
                            <table
                                className="table table-hover">
                                <thead>
                                <tr style={{display: "flex"}}>
                                    <th>TRANSACTION ID NO. <span
                                        className="label ml-2 label-info float-right"><h4>{purchase?.id}</h4></span>
                                    </th>
                                    <th className="ml-4">QUANTITY <span
                                        className="label label-primary ml-2 float-right"><h4>{purchase?.quantity}</h4></span>
                                    </th>
                                    <th className="ml-4">STATUS {
                                        purchase.confirmed === 1 ?
                                        (<span className="label label-success ml-2 float-right"><h4>Confirmed</h4></span>) :
                                        purchase.confirmed === 0 ?
                                            (<span className="label label-danger ml-2 float-right"><h4>Declined</h4></span>) :
                                            (<span className="label label-primary ml-2 float-right"><h4>Pending</h4></span>)}</th>
                                    <th className="ml-4">TOTAL AMOUNT <span
                                        className="label label-danger ml-2 float-right"><h4>$ {purchase.total * -1}</h4></span>
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td colSpan="3">
                                        <div className=" center-orientation col-12">
                                            <div className="row">

                                                <ProductGrid {...purchase.product}/>

                                                <div className="col-6">
                                                    <Contact col="auto" {...purchase.product.original_owner}/>
                                                </div>


                                            </div>
                                        </div>

                                    </td>
                                </tr>

                                </tbody>


                            </table>


                        </div>
                    )
                })}


            </div>

        </React.Fragment>
    )
}
export default MovementDetail