import React, {useState, useEffect} from "react";
import Status from "./Status";
import authHelper from "../js/authHelper";
import NewProductForm from "./NewProductForm/NewProductForm";
import {Link} from "react-router-dom";
import send from "../js/send";
import store from "../store";
import msgNotification from "../js/msgNotification";

const ProductList = (props) => {
    const [products, setProducts] = useState({...props})

    useEffect(() => {
        send({token: authHelper()}, "/api/product/", "get")
            .then(r => setProducts({...r}))
    }, [])

    store.subscribe(() => {
        send({token: authHelper()}, "/api/product", "get")
            .then(p => {
                setProducts({...p});
            })

    })


    const handleClick = (id) => {
        msgNotification("Confirmar","Realmente desea eliminar el producto de su lista ?","question","ACEPTAR",true)
            .then(r=>{
                if (r.value){
                    send({token: authHelper()}, `/api/product/${id}`, "delete")
                        .then(() => store.dispatch({
                            type: "ADD_NEW_PRODUCT"
                        }))
                }
            })

    }


    if (Object.values(products).length)
        return (
            <div className="row">
                <div className="col-lg-12">
                    <div className="ibox">
                        <div className="ibox-content">

                            <table className="table-condensed table-hover table-striped col-lg-12">
                                <thead>
                                <tr>

                                    <th data-toggle="true">Product Name</th>
                                    <th data-hide="phone">Category</th>
                                    <th data-hide="phone">Prior Price</th>
                                    <th data-hide="phone">Sales Price</th>
                                    <th data-hide="phone,tablet">Quantity</th>
                                    <th data-hide="phone">Status</th>
                                    <th className="text-right" data-sort-ignore="true">Action</th>

                                </tr>
                                </thead>
                                <tbody>
                                {
                                    Object.values(products).map((product, index) => {
                                        if (product) {
                                            const {
                                                name,
                                                category,
                                                price_cost,
                                                price_vent,
                                                inStock,
                                                _public,
                                                id
                                            } = product

                                            return (
                                                <tr key={index}>
                                                    <td>
                                                        {name}
                                                    </td>
                                                    <td>
                                                        {category}
                                                    </td>
                                                    <td>
                                                        {price_cost}
                                                    </td>
                                                    <td>
                                                        {price_vent}
                                                    </td>
                                                    <td>
                                                        {inStock}
                                                    </td>
                                                    <td>
                                                        <Status
                                                            status={_public}
                                                        />
                                                    </td>
                                                    <td className="text-right">
                                                        <div className="btn-group">
                                                            <Link to={"/home/detail/" + id}
                                                                  className="btn-white btn btn-xs">View</Link>
                                                            <Link to={"/home/edit/" + id}
                                                                  className="btn-white btn btn-xs"><i title="Edit"
                                                                                                      style={{fontSize: "20px"}}
                                                                                                      className="fa fa-pencil"/></Link>
                                                            <button title="Delete"
                                                                    style={{fontSize: "15px"}}
                                                                    onClick={() => handleClick(id)}
                                                                    className="btn-white btn btn-xs"><i
                                                                className="fa fa-trash"/>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    })
                                }

                                </tbody>
                                <tfoot>
                                <tr>
                                    <td colSpan="6">
                                        <ul className="pagination float-right"/>
                                    </td>
                                </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    else
        return (
            <div className="row">
                <div className="col-lg-12">
                    <div className="ibox">
                        <div className="ibox-content">
                            <h1>There are not products</h1>
                            <small>Add some product to the store.</small>
                            <NewProductForm
                                token={authHelper()}
                            />

                        </div>
                    </div>
                </div>
            </div>
        )
}
export default ProductList