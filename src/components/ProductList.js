import React from "react";
import Status from "./Status";
import authHelper from "../js/authHelper";
import send from "../js/send";
import msgNotification from "../js/msgNotification";
import NewProductForm from "./NewProductForm/NewProductForm";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const ProductList = ({ products, handleClick }) => {
  return Object.values(products).length ? (
    <React.Fragment>
      <div className="ibox-content col-12 text-right">
        <Link to="/home/new_product/" className="btn btn-primary card">
          Add new
        </Link>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="ibox">
            <div className="ibox-content">
              <table className="table-condensed table-hover table-striped col-lg-12">
                <thead>
                  <tr>
                    <th data-toggle="true">Product Name</th>
                    <th data-hide="phone">Category</th>
                    <th data-hide="phone">Price</th>
                    <th data-hide="phone">Status</th>
                    <th className="text-right" data-sort-ignore="true">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.values(products).map((product, index) => {
                    if (product) {
                      const {
                        name,
                        category,
                        price_cost,
                        _public,
                        id,
                        inStock,
                      } = product;

                      return (
                        <tr key={index}>
                          <td>
                            {name}{" "}
                            <span className="label label-success text-right ">
                              {" "}
                              {inStock}
                            </span>
                          </td>
                          <td>{category}</td>
                          <td>{price_cost}</td>
                          <td>
                            <Status status={_public} />
                          </td>
                          <td className="text-right">
                            <div className="btn-group">
                              <Link
                                to={"/home/detail/" + id}
                                className="btn-white btn btn-xs"
                              >
                                View
                              </Link>
                              <Link
                                to={"/home/edit/" + id}
                                className="btn-white btn btn-xs"
                              >
                                <i
                                  title="Edit"
                                  style={{ fontSize: "20px" }}
                                  className="fa fa-pencil"
                                />
                              </Link>
                              <button
                                title="Delete"
                                style={{ fontSize: "15px" }}
                                onClick={() => handleClick(id)}
                                className="btn-white btn btn-xs"
                              >
                                <i className="fa fa-trash" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    }
                    return null;
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="6">
                      <ul className="pagination float-right" />
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  ) : (
    <div className="row">
      <div className="col-lg-12">
        <div className="ibox">
          <div className="ibox-content">
            <h1>There are not products</h1>
            <small>Add some product to the store.</small>
            <NewProductForm token={authHelper()} />
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    products: state.productList,
  };
};
const mapDispatchToProps = (dispatch) => {
    return{
         handleClick (id) {
        msgNotification("Confirmar", "Realmente desea eliminar el producto de su lista ?", "question", "ACEPTAR", true)
            .then(r => {
                if (r.value) {
                    send({token: authHelper()}, `/api/product/${id}`, "delete")
                        .then(() => dispatch({
                            type: "UPDATE_LIST",
                            id
                        }))
                }
            })

    }}
};
export default connect(mapStateToProps,mapDispatchToProps)(ProductList);
