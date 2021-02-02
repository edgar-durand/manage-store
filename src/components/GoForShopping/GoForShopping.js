import React, {Fragment, useState} from "react";
import GoForShoppingUI from "./GoForShoppingUI";
import ProductGrid from "../ProductGrid";
import dataToPages from "../../js/dataToPages";
// import "bootstrap";
import store from "../../store";
import toastr from "toastr";

const GoForShopping = () => {
    const [state, setState] = useState({
        total: 0,
        searchField: "",
        match: {active: false, value: 0},
        show: 6,
        page: 0,
        products: {...store.getState().productList}
    })


    const {searchField, match} = state;

    let filtered = [];
    !match.active ?
        filtered = {...Object.values(state.products).filter(x => (x.name.toUpperCase().indexOf(searchField.toUpperCase()) !== -1) || (x.description.toUpperCase().indexOf(searchField.toUpperCase()) !== -1))} :
        filtered = {...Object.values(state.products).filter(x => ((x.name.toUpperCase().indexOf(searchField.toUpperCase()) !== -1) || (x.description.toUpperCase().indexOf(searchField.toUpperCase()) !== -1)) && x.price_vent <= match.value)}
    const MO = {...dataToPages(filtered, state.show, state.page)}

    store.subscribe(() => {

        if (Object.values(store.getState().cart).length)
            setState({
                ...state, total: +Object.values(store.getState().cart).reduce((a,b)=>a+b.price_vent,0)
            })

    })
    console.log(store.getState().cart)
    const handleMatch = (e) => {
        setState({...state, match: {...state.match, value: e.target.value}})
    }
    const handleMatchControl = () => {
        match.active ? setState({...state, match: {...state.match, active: false}}) :
            setState({...state, match: {...state.match, active: true}})
    }
    const handleChange = e => {
        setState({...state, [e.target.name]: e.target.value})
    }

    const addToCart = (id, e) => {
        e.preventDefault();
        store.dispatch({
            type: "ADD_TO_CART",
            product: {...Object.values(state.products).find(x => x.id === id)}
        })

    }
    // return <GoForShoppingUI/>

    return (
        <Fragment>
            <div className="col-12">
                <div className="ibox-content form-inline">
                    <label className="col-1">Show:</label>
                    <input onChange={(event) => setState({...state, page: 0, show: +event.target.value})}
                           value={state.show}
                           className="col-lg-1 form-control"
                           type="number" min="0"
                           max={Object.values(filtered).length}/>&nbsp;&nbsp; / {Object.values(filtered).length}
                    <label className="col-1"/>
                    <button onClick={() => state.page > 0 ? setState({...state, page: state.page - 1}) : null}
                            className="btn btn-outline-primary "><i className="fa fa-backward"/> Prev
                    </button>
                    <button onClick={() => state.page < (Object.values(filtered).length / state.show) - 1 ?
                        setState({...state, page: state.page + 1}) : null
                    } className="btn btn-outline-primary ">Next <i className="fa fa-forward"/></button>
                    <label className="col-1">Search</label>
                    <input type="text" name="searchField" className="form-control" onChange={(e) => handleChange(e)}/>
                    <label className="col-2">Match top price:</label>
                    <input type="checkbox" name="matchControl" onChange={() => handleMatchControl()}/>
                    <label/> &nbsp;&nbsp; $ &nbsp;&nbsp;
                    <input type="number" min="0" name="match" className="form-control col-1"
                           disabled={match.active === false}
                           onChange={(e) => handleMatch(e)}/>
                </div>
            </div>
            <div className="wrapper wrapper-content animated fadeInRight col-12">
                <div className="row float-left col-9">
                    {
                        Object.values(MO).map((x, index) => {
                            return <ProductGrid
                                key={index}
                                img={x.image}
                                name={x.name}
                                price={x.price_vent}
                                category={x.category}
                                description={x.description}
                                addToCart={(id, e) => addToCart(id, e)}
                                productId={x.id}
                            />
                        })}


                </div>
                <div className="row col-3 float-right">

                    <div className="ibox">
                        <div className="ibox-title">
                            <h5>Cart Summary</h5>
                        </div>
                        <div className="ibox-content">
                            <span>
                                Total
                            </span>
                            <h2 className="font-bold">
                                {
                                    state.total
                                }
                            </h2>

                            <hr/>
                            <span className="text-muted small">
                                *For United States, France and Germany applicable sales tax will be applied
                            </span>
                            <div className="m-t-sm">
                                <div className="btn-group">
                                    <a href="#" className="btn btn-primary btn-sm"><i
                                        className="fa fa-shopping-cart"></i> Checkout</a>
                                    <a href="#" className="btn btn-white btn-sm"> Cancel</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="ibox">
                        <div className="ibox-title">
                            <h5>Support</h5>
                        </div>
                        <div className="ibox-content text-center">


                            <h3><i className="fa fa-phone"></i> +43 100 783 001</h3>
                            <span className="small">
                                Please contact with us if you have any questions. We are avalible 24h.
                            </span>


                        </div>
                    </div>

                    <div className="ibox">
                        <div className="ibox-content">

                            <p className="font-bold">
                                Other products you may be interested
                            </p>

                            <hr/>
                            <div>
                                <a href="#" className="product-name"> Product 1</a>
                                <div className="small m-t-xs">
                                    Many desktop publishing packages and web page editors now.
                                </div>
                                <div className="m-t text-righ">

                                    <a href="#" className="btn btn-xs btn-outline btn-primary">Info <i
                                        className="fa fa-long-arrow-right"></i> </a>
                                </div>
                            </div>
                            <hr/>
                            <div>
                                <a href="#" className="product-name"> Product 2</a>
                                <div className="small m-t-xs">
                                    Many desktop publishing packages and web page editors now.
                                </div>
                                <div className="m-t text-righ">

                                    <a href="#" className="btn btn-xs btn-outline btn-primary">Info <i
                                        className="fa fa-long-arrow-right"></i> </a>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>


        </Fragment>
    )
}
export default GoForShopping