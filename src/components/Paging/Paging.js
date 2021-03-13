import React, {useState} from "react";
import dataToPages from "../../js/dataToPages";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "../styles/fontawesome";
import store from "../../store";
import {uuidv4} from "../../js/uuidv4";
import {getPaginatedProducts, getPaginatedUsers, setPageNumber, setSearchField} from "../../actions/actionCreator";

const Paging = ({
                    data,
                    Component,
                    show,
                    showingField,
                    priceField,
                    col,
                    action,
                    page,
                    searField,
                    are_mine,
                    Paginated
                }) => {
    const [state, setState] = useState({
        searchField: searField || "",
        match: {active: false, value: 0},
        page: page || 1,
        show: +show || 20,
    });

    const {searchField, match} = state;

    let filtered = [];
    !match.active
        ? (filtered = {
            ...Object.values(data).filter(
                (x) =>
                    (x?.name &&
                        x?.name?.toUpperCase().indexOf(searchField.toUpperCase()) !==
                        -1) ||
                    (x?.category &&
                        x?.category?.toUpperCase().indexOf(searchField.toUpperCase()) !==
                        -1) ||
                    (x?.first_name &&
                        x?.first_name
                            ?.toUpperCase()
                            .indexOf(searchField.toUpperCase()) !== -1) ||
                    (x?.last_name &&
                        x?.last_name?.toUpperCase().indexOf(searchField.toUpperCase()) !==
                        -1) ||
                    (x?.email &&
                        x?.email?.toUpperCase().indexOf(searchField.toUpperCase()) !==
                        -1) ||
                    (x?.username &&
                        x?.username?.toUpperCase().indexOf(searchField.toUpperCase()) !==
                        -1) ||
                    (x?.phone && x?.phone?.toString().indexOf(searchField) !== -1) ||
                    (x?.description &&
                        x?.description
                            ?.toUpperCase()
                            .indexOf(searchField.toUpperCase()) !== -1)
            ),
        })
        : (filtered = {
            ...Object.values(data).filter(
                (x) =>
                    ((x?.name &&
                        x?.name?.toUpperCase().indexOf(searchField.toUpperCase()) !==
                        -1) ||
                        (x?.category &&
                            x?.category
                                ?.toUpperCase()
                                .indexOf(searchField.toUpperCase()) !== -1) ||
                        (x?.first_name &&
                            x?.first_name
                                ?.toUpperCase()
                                .indexOf(searchField.toUpperCase()) !== -1) ||
                        (x?.last_name &&
                            x?.last_name
                                ?.toUpperCase()
                                .indexOf(searchField.toUpperCase()) !== -1) ||
                        (x?.email &&
                            x?.email?.toUpperCase().indexOf(searchField.toUpperCase()) !==
                            -1) ||
                        (x?.username &&
                            x?.username
                                ?.toUpperCase()
                                .indexOf(searchField.toUpperCase()) !== -1) ||
                        (x?.phone && x?.phone?.toString().indexOf(searchField) !== -1) ||
                        (x?.description &&
                            x?.description
                                ?.toUpperCase()
                                .indexOf(searchField.toUpperCase()) !== -1)) &&
                    x?.price_cost <= match.value
            ),
        });

    let till = Paginated ?
        (Paginated === 'users' ? (store.getState().paginated_users.last_page) :
            (Paginated === 'products' ? store.getState().paginated_products.last_page : null)) :
        Math.ceil(Object.values(filtered).length / (state.show || 1));

    const FORMATED = Paginated ? filtered : dataToPages(filtered, state.show, store.getState().page - 1);

    const handleMatch = (e) => {
        setState({...state, match: {...state.match, value: e.target.value}});
    };
    const handleMatchControl = () => {
        match.active
            ? setState({...state, match: {...state.match, active: false}})
            : setState({...state, match: {...state.match, active: true}});
    };
    const handleChange = (e) => {
        store.dispatch(setPageNumber(1));
        if (Paginated && Paginated === 'users') {
            store.dispatch(setSearchField(e.target.value));
            clearTimeout();
            setTimeout(() => {
                store.dispatch(getPaginatedUsers(1, e.target.value));
            }, 100);

        } else
        if (Paginated && Paginated === 'products') {
            store.dispatch(setSearchField(e.target.value));
            clearTimeout();
            setTimeout(() => {
                store.dispatch(getPaginatedProducts(1, e.target.value));
            }, 100);

        }else
            setState({...state, [e.target.name]: e.target.value});
    };

    const xmPages = () => {
        let gather = [];
        for (
            let page = 1;
            page <= till;
            page++
        ) {
            page !== store.getState().page
                ? gather.push(
                <button
                    key={uuidv4()}
                    onClick={() => {
                        store.dispatch(setPageNumber(page));
                        if (Paginated) {
                            if (Paginated === 'users')
                                store.dispatch(getPaginatedUsers(store.getState().page, store.getState().searchField));
                            if (Paginated === 'products')
                                store.dispatch(getPaginatedProducts(store.getState().page, store.getState().searchField));
                        }
                        setState({...state, page: page});
                    }}
                    className="btn btn-xs btn-light pull-right "
                >
                    {page}
                </button>
                )
                : gather.push(
                <button
                    key={uuidv4()}
                    onClick={() => {
                        store.dispatch(setPageNumber(page));
                        if (Paginated) {
                            if (Paginated === 'users')
                                store.dispatch(getPaginatedUsers(store.getState().page, store.getState().searchField));
                            if (Paginated === 'products')
                                store.dispatch(getPaginatedProducts(store.getState().page, store.getState().searchField));
                        }
                        setState({...state, page: page});
                    }}
                    className="btn btn-sm btn-outline-info pull-right"
                    style={{backgroundColor: "white", color: "black"}}
                >
                    {page}
                </button>
                );
        }
        return gather;
    };
    const topPriceFieldSet = () => (
        <React.Fragment>
            <label className="col-1">Top price:</label>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input
                type="checkbox"
                name="matchControl"
                onChange={() => handleMatchControl()}
            />
            <label/>
            &nbsp;&nbsp;
            <FontAwesomeIcon icon={"dollar-sign"} size="2x"/>
            &nbsp;&nbsp;
            <input
                type="number"
                min="0"
                name="match"
                className="form-control col-2"
                disabled={match.active === false}
                onChange={(e) => handleMatch(e)}
            />
        </React.Fragment>
    );

    const showingFieldSet = () => (
        <React.Fragment>
            <label className="col-1">Show:</label>
            <input
                onChange={(event) =>
                    setState({...state, page: 0, show: +event.target.value || 1})
                }
                value={state.show}
                className="col-lg-1 form-control"
                type="number"
                min="1"
                max={Object.values(filtered).length}
            />
            &nbsp;&nbsp; / {Object.values(filtered).length}
            <label className="col-1"/>
        </React.Fragment>
    );

    return (
        <React.Fragment>
            <div className={"col-12"}>
                <div className="ibox-content form-inline ">
                    {showingField && showingFieldSet()}

                    <label>
                        <FontAwesomeIcon icon={"search"} size="2x"/> &nbsp;
                        <input
                            type="text"
                            name="searchField"
                            className="form-control"
                            onChange={(e) => handleChange(e)}
                        />
                    </label>

                    {priceField && topPriceFieldSet()}
                </div>
            </div>
            <div className={"wrapper wrapper-content col-" + col || 12}>
                <div className="row float-left col-12 ">
                    {Object.values(FORMATED).map((x, index) => {
                        return are_mine === true ? (
                            <Component {...x} are_mine={true} key={index} addToCart={(e) => action(x, e)}/>
                        ):(
                            <Component {...x} key={index} addToCart={(e) => action(x, e)}/>
                        )
                    })


                    }
                    <div className="ibox ibox-content social-footer col-12">
                        <button
                            onClick={() => {
                                if (store.getState().page > 0) {
                                    store.dispatch(setPageNumber(store.getState().page - 1));
                                    if (Paginated) {
                                        if (Paginated === 'users')
                                            store.dispatch(getPaginatedUsers(store.getState().page, store.getState().searchField));
                                        if (Paginated === 'products')
                                            store.dispatch(getPaginatedProducts(store.getState().page, store.getState().searchField));
                                    }
                                }

                            }
                            }
                            className="btn btn-light"
                            disabled={store.getState().page === 1}
                        >
                            <FontAwesomeIcon icon="backward"/> Prev
                        </button>
                        {xmPages()}
                        <button
                            onClick={() => {
                                store.dispatch(setPageNumber(store.getState().page + 1));
                                if (Paginated) {
                                    if (Paginated === 'users')
                                        store.dispatch(getPaginatedUsers(store.getState().page, store.getState().searchField));
                                    if (Paginated === 'products')
                                        store.dispatch(getPaginatedProducts(store.getState().page, store.getState().searchField));
                                }
                            }
                            }
                            className="btn btn-light"
                            disabled={
                                store.getState().page >= (till)
                            }
                        >
                            Next <FontAwesomeIcon icon="forward"/>
                        </button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );

};

export default Paging;
