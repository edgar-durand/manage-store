import React from "react";
import {Link} from "react-router-dom";

const CategoryListUI = ({categories, handleClick}) => {
  
  if (Object.values(categories).length)
    return (
      <div className="row">
        <div className="col-lg-12">
          <div className="ibox">
            <div className="ibox-content">
              <table className="table-condensed table-hover table-striped col-lg-12">
                <thead>
                  <tr>
                    <th data-toggle="true">Category Name</th>
                    <th data-hide="phone">Description</th>
                    <th className="text-right" data-sort-ignore="true">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.values(categories).map((category, index) => {
                    if (category) {
                      const { name, description, id } = category;

                      return (
                        <tr key={index}>
                          <td>{name}</td>
                          <td>{description}</td>
                          <td className="text-right">
                            <div className="btn-group">
                              <Link
                                to={"/home/categories/show/" + id}
                                className="btn-white btn btn-xs"
                              >
                                View
                              </Link>
                              <Link
                                to={"/home/categories/edit/" + id}
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
                                className="btn-white btn btn-xs"
                                onClick={()=>handleClick(id)}

                              >
                                <i className="fa fa-trash" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    }
                    return null
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
    );
  else
    return (
      <div className="row">
        <div className="col-lg-12">
          <div className="ibox">
            <div className="ibox-content">
              <h1>There are not categories</h1>
              <small>Add some category to the sytem.</small>
             {// <NewProductForm token={authHelper()} />
             }
            </div>
          </div>
        </div>
      </div>
    );
};

export default CategoryListUI;
