import toastr from "toastr";
import authHelper from "../js/authHelper";
import msgNotification from "../js/msgNotification";
import send from "../js/send";
import store from "../store";
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
                        if (r.error.message)
                            toastr.error(r.error.message)
                        else {
                            dispatch({
                                type: "DELETE_ACCOUNTS",
                                id,
                            });
                            toastr.success(`Account deleted.`, "DELETED !");
                        }

                    }
                );
            }
        })
            .catch(err => toastr.error(err));
    };
};

export const getAccounts = () => {
    return (dispatch) => {
        send({token: authHelper()}, "/api/account", "get").then((res) => {
            dispatch({
                type: "GET_ACCOUNTS",
                accounts: res.response?.data?.accounts,
            });

        })
        // .catch(err => toastr.error(err));
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
            dispatch({type: "GET_USERS", users: r?.response?.data});

        })
            .catch(err => toastr.error(err));
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

                    }
                })
                .catch(err => toastr.error(err));

    };
};
export const getPaginatedProducts = (page = 1, search , perPage = 20) => {
    return (dispatch) => {
        // search ?
            send({token: authHelper()}, `/api/product/${perPage}?page=${page}&search=${search}`, 'get')
                .then(res => {
                        dispatch({
                            type: "GET_PAGINATED_PRODUCTS",
                            response: res.response

                        });



                })
                .catch(err => toastr.error(err));
            // :
            // send({token: authHelper()}, `/api/product/${perPage}?page=${page}`, 'get')
            //     .then(res => {
            //             dispatch({
            //                 type: "GET_PAGINATED_PRODUCTS",
            //                 response: res.response
            //             });
            //
            //
            //     });
                // .catch(err => toastr.error(err))

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

            if (!r.error?.message) {
                dispatch(updateState());
            }
            dispatch({
                type: "SET_LOAD",
                load: false,
            });
            r.error?.message
                ? toastr.info(r.error.message)
                : toastr.success("Updated !");
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
            if (res.response.data) {
                dispatch({
                    type: "GET_PURCHASES",
                    purchases: res.response.data
                });
                dispatch(setLoad(false));

            } else {
                dispatch(setLoad(false));
                toastr.error(res.response.message);
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
                dispatch(setLoad(false));

            } else {
                dispatch(setLoad(false));

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
                dispatch(setLoad(false));

            } else {
                dispatch(setLoad(false));

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
                dispatch(setLoad(false));

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
            }
            else toastr.error(res.response.message);

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

export const load = () => {
    return {
        type: "LOAD",
    };
};

export const clear = () => {
    return {
        type: "CLEAR",
    };
};
export const getMovements = (id) =>{
    return dispatch =>{
        send({token: authHelper()}, "/api/account/" + id, "get").then((r) => {

            dispatch({
                type: "GET_MOVEMENTS",
                movements: r.response.data,
            });


        });
    }
}
export const updateState = () => {
    return (dispatch) => {
        send({token: authHelper()}, "/api/profile", "get").then((p) => {
            if (p.response?.data) {
                dispatch({
                    type: "UPDATE_STATE",
                    state: {...p.response.data},
                });


                toastr.options.preventDuplicates = true;
                toastr.info(`${p.response.data.username}`, "Bienvenido");
            }
        })
            .catch(err => toastr.error(err));
    };
};
