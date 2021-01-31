import React, {Fragment, useState} from "react";
import GoForShoppingUI from "./GoForShoppingUI";
import ProductGrid from "../ProductGrid";
import dataToPages from "../../js/dataToPages";
import store from "../../store";

const GoForShopping = () => {
    const [state, setState] = useState({show: 6, page: 0, products: {...store.getState().productList}})
    const MO = {...dataToPages(state.products, state.show, state.page)}

    // return <GoForShoppingUI/>

    return (
        <Fragment>
            <div className="col-md-12">
                <div className="ibox-content">
                    <label className="col-lg-2">Show:</label>
                    <input onChange={(event) => setState({...state, page: 0, show: +event.target.value})}
                           value={state.show}
                           className="col-lg-2"
                           type="number" min="0" max={Object.values(state.products).length}/>
                    <label className="col-lg-1"/>
                    <button onClick={() => state.page > 0 ? setState({...state, page: state.page - 1}) : null}
                            className="btn btn-outline-primary "><i className="fa fa-backward"/> Prev
                    </button>
                    <button onClick={() => state.page < (Object.values(state.products).length / state.show) - 1 ?
                        setState({...state, page: state.page + 1}) : null
                    } className="btn btn-outline-primary ">Next <i className="fa fa-forward"/></button>
                </div>
            </div>
            <div className="wrapper wrapper-content animated fadeInRight">
                <div className="row">
                    {
                        Object.values(MO).map((x,index) => {
                            return <ProductGrid
                                key={index}
                                img={x.image}
                                name={x.name}
                                price={x.price_vent}
                                category={x.category}
                                description={x.description}
                                productId={x.id}
                            />
                        })}
                </div>
            </div>
        </Fragment>
    )
}
export default GoForShopping