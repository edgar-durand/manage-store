import React, {useState} from "react";
import {connect} from "react-redux";
import {uuidv4} from "../../js/uuidv4";
import {Link} from "react-router-dom";
import toastr from "toastr";
import store from "../../store";
import {
    confirmPurchase, declinePurchase,
    getConfirmedPurchases,
    getDeclinedPurchases,
    getPendingPurchases,
    setLoad
} from "../../actions/actionCreator";
import Loading from "../../components/Loading/Loading";
import Contact from "../../components/Contact/Contact";
import ProductGrid from "../../components/ProductGrid";
import Select from "react-select";

const IndexHome = ({purchases, loading, sales_requests, accounts}) => {
    const [state, setState] = useState(null);
    const handleSelect = (selected) => {
        if (selected)
            setState(selected.value);
    };
    return (
        <React.Fragment>
            <div className="row">
                <div className="col-lg-2">
                    <div className="ibox ">
                        <div className="ibox-title">
                            <div className="ibox-tools">
                                <span className="label label-success float-right">Monthly</span>
                            </div>
                            <h5>Views</h5>
                        </div>
                        <div className="ibox-content">
                            <h1 className="no-margins">386,200</h1>
                            <div className="stat-percent font-bold text-success">
                                98% <i className="fa fa-bolt"></i>
                            </div>
                            <small>Total views</small>
                        </div>
                    </div>
                </div>
                <div className="col-lg-2">
                    <div className="ibox ">
                        <div className="ibox-title">
                            <div className="ibox-tools">
                                <span className="label label-info float-right">Annual</span>
                            </div>
                            <h5>Orders</h5>
                        </div>
                        <div className="ibox-content">
                            <h1 className="no-margins">80,800</h1>
                            <div className="stat-percent font-bold text-info">
                                20% <i className="fa fa-level-up"></i>
                            </div>
                            <small>New orders</small>
                        </div>
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="ibox ">
                        <div className="ibox-title">
                            <div className="ibox-tools">
                                <span className="label label-primary float-right">Today</span>
                            </div>
                            <h5>visits</h5>
                        </div>
                        <div className="ibox-content">
                            <div className="row">
                                <div className="col-md-6">
                                    <h1 className="no-margins">406,42</h1>
                                    <div className="font-bold text-navy">
                                        44% <i className="fa fa-level-up"></i>{" "}
                                        <small>Rapid pace</small>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <h1 className="no-margins">206,12</h1>
                                    <div className="font-bold text-navy">
                                        22% <i className="fa fa-level-up"></i>{" "}
                                        <small>Slow pace</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="ibox ">
                        <div className="ibox-title">
                            <h5>Monthly income</h5>
                            <div className="ibox-tools">
                                <span className="label label-primary">Updated 12.2015</span>
                            </div>
                        </div>
                        <div className="ibox-content no-padding">
                            <div className="flot-chart m-t-lg" style={{height: "55px"}}>
                                <div className="flot-chart-content" id="flot-chart1"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-8">
                    <div className="ibox ">
                        <div className="ibox-content">
                            <div>
                  <span className="float-right text-right">
                    <small>
                      Average value of sales in the past month in:{" "}
                        <strong>United states</strong>
                    </small>
                    <br/>
                    All sales: 162,862
                  </span>
                                <h3 className="font-bold no-margins">Half-year revenue margin</h3>
                                <small>Sales marketing.</small>
                            </div>

                            <div className="m-t-sm">
                                <div className="row">
                                    <div className="col-md-8">
                                        <div className="widget navy-bg no-padding">
                                            <div className="p-m">
                                                <h1 className="m-xs">$ 1,540</h1>

                                                <h3 className="font-bold no-margins">
                                                    Annual income
                                                </h3>
                                                <small>Income form project Alpha.</small>
                                            </div>
                                            <div className="flot-chart">
                                                <div className="flot-chart-content" id="flot-chart1"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <ul className="stat-list m-t-lg">
                                            <li>
                                                <h2 className="no-margins">2,346</h2>
                                                <small>Total orders in period</small>
                                                <div className="progress progress-mini">
                                                    <div className="progress-bar" style={{width: "48%"}}></div>
                                                </div>
                                            </li>
                                            <li>
                                                <h2 className="no-margins ">4,422</h2>
                                                <small>Orders in last month</small>
                                                <div className="progress progress-mini">
                                                    <div className="progress-bar" style={{width: "60%"}}></div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="m-t-md">
                                <small className="float-right">
                                    <i className="fa fa-clock-o"> </i>
                                    Update on 16.07.2015
                                </small>
                                <small>
                                    <strong>Analysis of sales:</strong> The value has been
                                    changed over time, and last month reached a level over
                                    $50,000.
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="ibox ">
                        <div className="ibox-title">
                <span className="label label-warning float-right">
                  Data has changed
                </span>
                            <h5>User activity</h5>
                        </div>
                        <div className="ibox-content">
                            <div className="row">
                                <div className="col-4">
                                    <small className="stats-label">Pages / Visit</small>
                                    <h4>236 321.80</h4>
                                </div>

                                <div className="col-4">
                                    <small className="stats-label">% New Visits</small>
                                    <h4>46.11%</h4>
                                </div>
                                <div className="col-4">
                                    <small className="stats-label">Last week</small>
                                    <h4>432.021</h4>
                                </div>
                            </div>
                        </div>
                        <div className="ibox-content">
                            <div className="row">
                                <div className="col-4">
                                    <small className="stats-label">Pages / Visit</small>
                                    <h4>643 321.10</h4>
                                </div>

                                <div className="col-4">
                                    <small className="stats-label">% New Visits</small>
                                    <h4>92.43%</h4>
                                </div>
                                <div className="col-4">
                                    <small className="stats-label">Last week</small>
                                    <h4>564.554</h4>
                                </div>
                            </div>
                        </div>
                        <div className="ibox-content">
                            <div className="row">
                                <div className="col-4">
                                    <small className="stats-label">Pages / Visit</small>
                                    <h4>436 547.20</h4>
                                </div>

                                <div className="col-4">
                                    <small className="stats-label">% New Visits</small>
                                    <h4>150.23%</h4>
                                </div>
                                <div className="col-4">
                                    <small className="stats-label">Last week</small>
                                    <h4>124.990</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-12">
                    <div className="ibox ">
                        <div className="ibox-title">
                            <h5>Shopping and Deals</h5>

                        </div>
                        <div className="ibox-content">
                            <div className="row">
                                <div className="col-sm-9 m-b-xs">
                                    <div
                                        data-toggle="buttons"
                                        className="btn-group btn-group-toggle"
                                    >
                                        <label className="btn btn-sm btn-success">
                                            {" "}
                                            <input
                                                onClick={() => {
                                                    store.dispatch(setLoad(true));
                                                    store.dispatch(getPendingPurchases());
                                                }}
                                                type="radio"
                                                id="option1"
                                                name="options"
                                            /> Pending{" "}
                                        </label>
                                        <label className="btn btn-sm btn-primary">
                                            {" "}
                                            <input
                                                onClick={() => {
                                                    store.dispatch(setLoad(true));
                                                    store.dispatch(getConfirmedPurchases());
                                                }}
                                                type="radio"
                                                id="option2"
                                                name="options"
                                            /> Confirmed{" "}
                                        </label>
                                        <label className="btn btn-sm btn-danger">
                                            {" "}
                                            <input
                                                onClick={() => {
                                                    store.dispatch(setLoad(true));
                                                    store.dispatch(getDeclinedPurchases());
                                                }}
                                                type="radio"
                                                id="option3"
                                                name="options"
                                            /> Declined{" "}
                                        </label>
                                    </div>
                                </div>

                            </div>
                            <div className="table-responsive">
                                <table className="table-hover text-center col-12">
                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Product</th>
                                        <th>Account</th>
                                        <th>Date</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                        <th>Status</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {(!loading && purchases && purchases.map(purchase => {
                                        return (
                                            <tr key={uuidv4()}>
                                                <th>{purchase.id}</th>
                                                <th><Link
                                                    to={"/home/detail/" + purchase.product.id}>{purchase.product.name}</Link>
                                                </th>
                                                <th><Link to={"/home/my_accounts"}>{purchase.account.name}</Link></th>
                                                <th>{purchase.date}</th>
                                                <th>{purchase.quantity}</th>
                                                <th>{purchase.total}</th>
                                                <th>
                                                    {purchase.confirmed === null ?
                                                        <span className="label label-success ">Pending</span> :
                                                        purchase.confirmed === 1 ?
                                                            <span className="label label-primary ">Confirmed</span> :
                                                            <span className="label label-danger "> Declined</span>}
                                                </th>
                                            </tr>
                                        )
                                    })) || <Loading/>

                                    }


                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-12">
                    <div className="ibox ">
                        <div className="ibox-title">
                            <h5>Sales Request</h5>

                        </div>
                        <div className="ibox-content">
                            <div className="table-responsive">
                                <table className="col-12 table-hover text-center">
                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Product</th>
                                        <th>User</th>
                                        <th>Date</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                        <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {(sales_requests && sales_requests.map(request => {
                                        return (
                                            <tr key={uuidv4()}>
                                                <td className="align-middle ">{request.purchase_id}</td>
                                                <td className="align-middle " width="20px">
                                                    <ProductGrid {...request.product} /></td>
                                                <td className="align-middle " width="250px"><Contact
                                                    col="12" {...request.user_requesting} /></td>
                                                <td className="align-middle "> {request.date}</td>
                                                <td className="align-middle ">{request.quantity}</td>
                                                <td className="align-middle ">{request.total}</td>
                                                <td className="align-middle ">
                                                    <Select
                                                        name="account_id"
                                                        options={accounts.map(x => ({
                                                            value: x.id,
                                                            label: x.name
                                                        }))}
                                                        isClearable={true}
                                                        placeholder="Account to enhance."
                                                        onChange={(e) => handleSelect(e)}
                                                    />
                                                    <div
                                                        data-toggle="buttons"
                                                        className="btn-group btn-group-toggle"
                                                    >

                                                        <label className="btn btn-sm btn-success">
                                                            {" "}
                                                            <input
                                                                onClick={() => {
                                                                    state ?
                                                                    store.dispatch(confirmPurchase(Object.assign(request, {my_account_id: state}))):
                                                                        toastr.info("You have to select an account.");
                                                                }}
                                                                type="radio"
                                                                id="option1"
                                                                name="options"
                                                            /> Confirm{" "}
                                                        </label>
                                                        <label className="btn btn-sm btn-danger">
                                                            {" "}
                                                            <input
                                                                onClick={() => store.dispatch(declinePurchase(request))}
                                                                type="radio"
                                                                id="option2"
                                                                name="options"
                                                            /> Decline{" "}
                                                        </label>

                                                    </div>

                                                </td>
                                            </tr>
                                        )
                                    }))

                                    }


                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </React.Fragment>


    );
};
const mapStateToProps = (state) => {
    return {
        purchases: state.purchases,
        loading: state.load,
        sales_requests: state.sales_requests,
        accounts: state.accounts
    }
}
export default connect(mapStateToProps)(IndexHome);
