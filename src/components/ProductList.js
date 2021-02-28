import React from "react";
import Status from "./Status";
import authHelper from "../js/authHelper";
import send from "../js/send";
import msgNotification from "../js/msgNotification";
import NewProductForm from "./NewProductForm/NewProductForm";
import "./treeTableReact/treeTable.css";
import { TreeTable } from "./treeTableReact/treeTable";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { updateList } from "../actions/actionCreator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styles/fontawesome";
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
              <TreeTable
                columns={[
                  {
                    data: "name",
                    render: (data, row) =>
                      data && (
                        <React.Fragment>
                          {row.name}
                          {row.action && (
                            <span className="label label-success text-right ">
                              {`${row.inStock}`}
                            </span>
                          )}
                        </React.Fragment>
                      ),
                    title: "Name",
                  },
                  {
                    data: "category",
                    title: "Category",
                  },
                  {
                    data: "price",
                    title: "Price",
                  },
                  {
                    data: "status",
                    render: (data) => <Status status={data} />,
                    title: "Status",
                  },
                  {
                    data: "action",
                    render: (data, row) =>
                      data && (
                        <div className="btn-group">
                          <Link
                            to={"/home/detail/" + row.id}
                            className="btn-white btn btn-xs"
                            title="View"
                          >
                            <FontAwesomeIcon
                              icon={"glasses"}
                              transform="grow-9x down-3"
                              size="1x"
                            />
                          </Link>
                          <Link
                            to={"/home/edit/" + row.id}
                            className="btn-white btn btn-xs"
                            title="Edit"
                          >
                            <FontAwesomeIcon
                              icon={"pencil-alt"}
                              transform="grow-9x down-3"
                              size="1x"
                            />
                          </Link>
                          <button
                            title="Delete"
                            style={{ fontSize: "15px" }}
                            onClick={() => handleClick(row.id)}
                            className="btn-white btn btn-xs"
                          >
                            <FontAwesomeIcon
                              icon={"trash"}
                              transform="grow-6x"
                              size="1x"
                            />
                          </button>
                        </div>
                      ),
                    title: "Action",
                  },
                ]}
                data={Object.values(products).map((x) => ({
                  name: x.name,
                  category: x.category,
                  price: x.price_cost,
                  status: x._public,
                  id: x.id,
                  inStock: x.inStock,
                  action: true,
                  children: [
                    {
                      name: "Description: " + x.description,
                    },
                  ],
                }))}
              />
              
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
  return {
    handleClick(id) {
      msgNotification(
        "Confirmar",
        "Realmente desea eliminar el producto de su lista ?",
        "question",
        "ACEPTAR",
        true
      ).then((r) => {
        if (r.value) {
          send(
            { token: authHelper() },
            `/api/product/${id}`,
            "delete"
          ).then(() => dispatch(updateList(id)));
        }
      });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
