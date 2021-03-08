import React, {useEffect, useState} from "react";
import send from "../../js/send";
import authHelper from "../../js/authHelper";
import ProductGrid from "../ProductGrid";
import Contact from "../Contact/Contact";

const MovementDetail = (props) => {
    const ID = props.match.params.id;
    const DATE = props.match.params.date;
    const [detail, setDetail] = useState([]);
    useEffect(() => {
        send({token: authHelper(), date: DATE}, `/api/purchase/${ID}`, 'post')
            .then(res => {
                setDetail(res.response.data);
                console.log(res.response.data, res.response.message);
            })
    }, [ID, DATE])
    return (
        <React.Fragment>
            <div className="wrapper wrapper-content row animated fadeInRight ">
                {detail.map( purchase =>{
                    return (
                        <div className="ibox ibox-content col-lg-6" >
                            <table
                                className="table table-hover">
                                <thead>
                                <tr>
                                    <th>TRANSACTION ID NO. <span className="label label-info float-right">{purchase?.id}</span></th>
                                    <th>QUANTITY <span className="label label-primary float-right">{purchase?.quantity}</span></th>
                                    <th>TOTAL AMOUNT <span className="label label-danger float-right">$ {purchase.total}</span></th>
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