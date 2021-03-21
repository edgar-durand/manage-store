import toastr from "toastr";
import authHelper from "../js/authHelper";
import msgNotification from "../js/msgNotification";
import send from "../js/send";
import store from "../store";
import {storeToLocalStore} from "../js/storeHelper";
// CART
export const addToCart = (product) => {
    const isMy = store.getState().productList.find(x => x.id === product.id);

    return {
        type: "ADD_TO_CART",
        product: !isMy ? Object.assign(product, {price_cost: product.sales_price}) : product,
    };
};

export const setPageNumber = (page) => {
    return {
        type: "SET_PAGE_NUMBER",
        page,
    };
}
export const setSearchField = (searchField) => {
    return {
        type: "SET_SEARCH_FIELD",
        searchField,
    };
}

export const deleteFromCart = (id) => {
    return {
        type: "DELETE_FROM_CART",
        id,
    };
};

export const clearCart = () => {
    return {
        type: "CLEAR_CART",
    };
};

// ACCOUNTS
export const deleteAccounts = (id) => {
    return (dispatch) => {
        msgNotification(
            "Confirm !",
            `Do you really want to cancel account.`,
            "question",
            "ACEPTAR",
            true
        ).then((r) => {
            if (r.value) {
                send({token: authHelper()}, `/api/account/${id}/`, "delete").then(
                    (r) => {
                        if (r.error) {
                            toastr.error("Account is not empty, empty or transfer first.")
                        } else {
                            dispatch({
                                type: "DELETE_ACCOUNTS",
                                id,
                            });
                            dispatch(getAccounts());
                            toastr.success(`Account deleted.`, "DELETED !");
                        }

                    }
                );
            }
        })
        // .catch(err => toastr.error(err));
    };
};

export const getAccounts = () => {
    return (dispatch) => {
        send({token: authHelper()}, "/api/account", "get").then((res) => {
            dispatch({
                type: "GET_ACCOUNTS",
                accounts: res.response?.data?.accounts,
            });
            storeToLocalStore('accounts', 'accounts');

        })
            .catch(err => toastr.error(err));
    };
};

// CATEGORIES
export const getCategories = () => {
    return (dispatch) => {
        send({token: authHelper()}, "/api/category", "get").then((r) => {
                dispatch({
                    type: "GET_CATEGORIES",
                    categories: r.response.data,
                });
                storeToLocalStore('categories', 'categories');

            }
        )
            .catch(err => toastr.error(err));
    };
};

// PRODUCTS

export const setListProducts = () => {
    return (dispatch) => {
        send({token: authHelper()}, "/api/my_product", "get").then((r) => {
                dispatch({
                    type: "SET_LIST_PRODUCTS",
                    product: r.response.data,
                });
                storeToLocalStore('productList', 'productList');

            }
        )
            .catch(err => toastr.error(err));
    };
};

export const updateList = (id) => {
    toastr.success("Product deleted !");
    return {
        type: "UPDATE_LIST",
        id,
    };
};

export const setProductQuantity = (product) => {
    return {
        type: "SET_PRODUCT_QUANTITY",
        product,
    };
};

export const addNewProduct = (product) => {
    toastr.success(`Producto agregado correctamente`, "Exito !");
    return {
        type: "ADD_NEW_PRODUCT",
        product,
    };
};
// USERS
export const getUsers = () => {
    return (dispatch) => {
        send({}, "/api/user/", "get").then((r) => {
            if (r.response?.data) {
                dispatch({type: "GET_USERS", users: r.response.data});
                storeToLocalStore('users', 'users');
            } else toastr.error(`Can not connect with service.`);

        })
            .catch(err => toastr.error(`Can not connect with service. ${err}`));
    };
};
// GLOBAL STATE

export const getPaginatedUsers = (page = 1, search, perPage = 20) => {
    return (dispatch) => {
        search ?
            send({token: authHelper()}, `/api/user/${perPage}?page=${page}&search=${search}`, 'get')
                .then(res => {
                    if (res.error?.message)
                        toastr.error(res.error.message)
                    else {
                        dispatch({
                            type: "GET_PAGINATED_USERS",
                            response: res.response
                        });
                        storeToLocalStore('paginated_users', 'paginated_users');

                    }
                })
                .catch(err => toastr.error(err)) :
            send({token: authHelper()}, `/api/user/${perPage}?page=${page}`, 'get')
                .then(res => {
                    if (res.error?.message)
                        toastr.error(res.error.message)
                    else {
                        dispatch({
                            type: "GET_PAGINATED_USERS",
                            response: res.response
                        });
                        storeToLocalStore('paginated_users', 'paginated_users');

                    }
                })
                .catch(err => toastr.error(err));

    };
};
export const getPaginatedProducts = (page = 1, search, perPage = 20) => {
    return (dispatch) => {
        search ?
            (send({token: authHelper()}, `/api/product/${perPage}?page=${page}&search=${search}`, 'get')
                .then(res => {
                    dispatch({
                        type: "GET_PAGINATED_PRODUCTS",
                        response: res.response
                    });
                    storeToLocalStore('paginated_products', 'paginated_products');


                })
                .catch(err => toastr.error(err)))
            :
            (send({token: authHelper()}, `/api/product/${perPage}?page=${page}`, 'get')
                .then(res => {
                    dispatch({
                        type: "GET_PAGINATED_PRODUCTS",
                        response: res.response
                    });
                    storeToLocalStore('paginated_products', 'paginated_products');

                })
                .catch(err => toastr.error(err)))

    };
};

export const setLoad = (load) => {
    return {
        type: "SET_LOAD",
        load,
    };
};

export const updateProfile = (profile) => {
    // let data = new FormData();
    // for (let [keys, values] of Object.entries(profile)) {
    //   data.append(keys, values);
    // }

    return (dispatch) => {
        send(
            {token: authHelper(), form: profile},
            "/api/user/" + profile.id,
            "patch"
        ).then((r) => {

            if (!r.error) {
                dispatch(updateState());
            }
            dispatch(setLoad(false));
            r.error?.message
                ? toastr.info(r.error.message)
                : toastr.success(r.response.message);
        })
            .catch(err => toastr.error(err));
    };
};
//PURCHASES
//ALL
export const getAllPurchases = () => {
    return (dispatch) => {
        send(
            {token: authHelper()},
            "/api/purchase/get_all",
            "get"
        ).then(res => {
            if (res.response.data) {
                dispatch({
                    type: "GET_PURCHASES",
                    purchases: res.response.data
                });
                storeToLocalStore('purchases', 'purchases');

            } else toastr.error(res.response.message);

        })
            .catch(err => toastr.error(err));
    }
}

//CONFIRMED
export const getConfirmedPurchases = () => {
    return (dispatch) => {
        send(
            {token: authHelper()},
            "/api/purchase/get_confirmed",
            "get"
        ).then(res => {
            if (res.response?.data) {
                dispatch({
                    type: "GET_PURCHASES",
                    purchases: res.response?.data
                });
                storeToLocalStore('purchases', 'purchases');
                dispatch(setLoad(false));
                storeToLocalStore('load', 'load');

            } else {
                dispatch(setLoad(false));
                storeToLocalStore('load', 'load');
                toastr.error(res.response?.message);
            }

        })
            .catch(err => toastr.error(err));

    }
}

//PENDING
export const getPendingPurchases = () => {
    return (dispatch) => {
        send(
            {token: authHelper()},
            "/api/purchase/get_pending",
            "get"
        ).then(res => {
            if (res.response.data) {
                dispatch({
                    type: "GET_PURCHASES",
                    purchases: res.response.data
                });
                storeToLocalStore('purchases', 'purchases');
                dispatch(setLoad(false));
                storeToLocalStore('load', 'load');

            } else {
                dispatch(setLoad(false));
                storeToLocalStore('load', 'load');
                toastr.error(res.response.message);
            }

        })
            .catch(err => toastr.error(err));

    }
}

//DECLINED
export const getDeclinedPurchases = () => {
    return (dispatch) => {
        send(
            {token: authHelper()},
            "/api/purchase/get_declined",
            "get"
        ).then(res => {
            if (res.response.data) {
                dispatch({
                    type: "GET_PURCHASES",
                    purchases: res.response.data
                });
                storeToLocalStore('purchases', 'purchases');
                dispatch(setLoad(false));

            } else {
                dispatch(setLoad(false));
                storeToLocalStore('load', 'load');
                toastr.error(res.response.message);
            }

        })
            .catch(err => toastr.error(err));

    }
}


//GET_SALES_REQUESTS
export const getSalesRequests = () => {
    return (dispatch) => {
        send(
            {token: authHelper()},
            "/api/purchase/sale_request",
            "get"
        ).then(res => {
            if (res.response.data) {
                dispatch({
                    type: "GET_SALES_REQUESTS",
                    requests: res.response.data
                });
                storeToLocalStore('sales_requests', 'sales_requests');
                dispatch(setLoad(false));
                storeToLocalStore('load', 'load');
            } else toastr.error(res.response.message);

        })
            .catch(err => toastr.error(err));

    }
}
export const confirmPurchase = (purchase) => {
    return (dispatch) => {
        send(
            {
                token: authHelper(),
                data: [{
                    id: purchase.purchase_id,
                    product_id: purchase.product.id,
                    user_id: purchase.user_requesting.id,
                    account_id: purchase.account_id,
                    my_account_id: purchase.my_account_id,
                    movement_id: purchase.movement_id,
                    quantity: purchase.quantity,
                    total: purchase.total
                }]

            },
            "/api/purchase/confirm",
            "post"
        ).then(res => {
            if (res.response?.status === 200) {
                dispatch({
                    type: "UPDATE_SALES_REQUESTS",
                    id: purchase.purchase_id
                });
                dispatch(getAllPurchases());
                toastr.success(res.response.message);
            } else toastr.error(res.response.message);

        })
            .catch(err => toastr.error(err));

    }
}
export const declinePurchase = (purchase) => {
    return (dispatch) => {
        send(
            {
                token: authHelper(),
                data: [{
                    id: purchase.purchase_id,
                    product_id: purchase.product.id,
                    user_id: purchase.user_requesting.id,
                    account_id: purchase.account_id,
                    movement_id: purchase.movement_id,
                    quantity: purchase.quantity,
                    total: purchase.total
                }]

            },
            "/api/purchase/decline",
            "post"
        )
            .then(res => {
                if (res.response.data) {
                    dispatch({
                        type: "UPDATE_SALES_REQUESTS",
                        id: purchase.purchase_id
                    });
                    toastr.options.preventDuplicates = true;
                    toastr.success(res.response.message);
                    dispatch(getAllPurchases());
                } else {
                    toastr.options.preventDuplicates = true;
                    toastr.error(res.response.message);
                }

            })
            .catch(err => {
                toastr.options.preventDuplicates = true;
                toastr.error(err)
            });

    }
}
// GENERAL

export const load = (keyName) => {
    return {
        type: "LOAD",
        keyName
    };
};

export const clear = () => {
    return {
        type: "CLEAR",
    };
};
export const getMovements = (id) => {
    return dispatch => {
        send({token: authHelper()}, "/api/account/" + id, "get").then((r) => {

            dispatch({
                type: "GET_MOVEMENTS",
                movements: r.response?.data,
            });

            storeToLocalStore('movements', 'movements');
        });
    }
}
export const updateState = () => {
    return (dispatch) => {
        send({token: authHelper()}, "/api/profile", "get").then((p) => {
            if (p.response?.data) {
                dispatch({
                    type: "UPDATE_STATE",
                    state: p.response.data,
                });

                storeToLocalStore('globalState', 'globalState');

                toastr.options.preventDuplicates = true;
                toastr.info(`${p.response.data.username}`, "Bienvenido");
            }
        })
            .catch(err => toastr.error(err));
    };
};
