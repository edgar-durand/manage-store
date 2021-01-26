import React from "react";
import Status from "./Status";
import authHelper from "../js/authHelper";
import NewProductForm from "./NewProductForm";
import "./styles/css/plugins/footable/footable.core.css"
import {Link} from "react-router-dom";

const ProductList = (props) => {
    const token = {token: authHelper()}
    if (Object.values(props).length > 1)
        return (
            <div className="row">
                <div className="col-lg-12">
                    <div className="ibox">
                        <div className="ibox-content">

                            <table className="footable table table-stripped toggle-arrow-tiny" data-page-size="15">
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
                                    Object.values(props).map((product, index) => {
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

                                            if (product.name !== "handleClick")
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
                                                                        onClick={() => props.handleClick(id)}
                                                                        className="btn-danger btn btn-xs"><i
                                                                    className="fa fa-close"/>
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
                                {...token}
                            />

                        </div>
                    </div>
                </div>
            </div>
        )
}
export default ProductList