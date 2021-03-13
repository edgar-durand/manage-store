import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import toastr from "toastr";
import {localStoreToStore} from "./js/storeHelper";

const reducer = (state, action) => {
    switch (action.type) {
        //CART ACTIONS
        case "ADD_TO_CART": {
            const ADD = Object.values(state.cart).find(
                (x) =>
                    x.name === action.product.name &&
                    x.price_cost === action.product.price_cost
            );
            if (!ADD) {
                toastr.options.closeButton = true;
                toastr.options.closeHtml =
                    '<button><i class="fa fa-close"></i></button>';
                toastr.success(
                    `${action.product.name} has been added successfully.`,
                    "Added !",
                    {timeOut: 500}
                );
                return {
                    ...state,
                    cart: Object.values(state.cart).concat(
                        Object.assign(action.product, {inStock: 1})
                    ),
                };
            } else {
                toastr.options.closeButton = true;
                toastr.options.closeHtml =
                    '<button><i class="fa fa-close"></i></button>';
                toastr.warning(
                    `${action.product.name} already exist, check your cart and type the quantity you wish.`,
                    "Error !"
                );
                return {
                    ...state,
                };
            }
        }

        case "SET_PRODUCT_QUANTITY":
            // eslint-disable-next-line no-lone-blocks
        {
            if (Object.values(action.product).length)
                return {
                    ...state,
                    cart: Object.values(state.cart)
                        .filter((x) => x.id !== action.product.id)
                        .concat(action.product),
                };
        }
            break;
        case "DELETE_FROM_CART": {
            return {
                ...state,
                cart: {
                    ...Object.values(state.cart).filter((x) => x.id !== action.id),
                },
            };
        }

        case "CLEAR_CART": {
            return {
                ...state,
                cart: [],
            };
        }

        //globalState actions
        case "SET_LOAD": {
            return {
                ...state,
                load: action.load,
            };
        }
        case "UPDATE_STATE": {
            return {
                ...state,
                globalState: action.state,
            };
        }

        case "UPDATE_PROFILE": {
            return {
                ...state,
                globalState: {
                    0: {
                        ...state.globalState[0],
                        ...action.profile,
                    },
                },
            };
        }

        //productList actions

        case "SET_LIST_PRODUCTS": {
            return {
                ...state,
                productList: action.product,
            };
        }

        case "ADD_NEW_PRODUCT": {
            return {
                ...state,
                productList: Object.values(state.productList || []).concat(action.product),
            };
        }

        case "UPDATE_LIST": {
            const NEW_LIST = Object.values(state.productList).filter(
                (product) => product.id !== action.id
            );
            return {
                ...state,
                productList: NEW_LIST,
            };
        }

        //Accounts actions
        case "GET_ACCOUNTS": {
            return {
                ...state,
                accounts: action.accounts,
            };
        }

        case "DELETE_ACCOUNTS": {
            return {
                ...state,
                accounts: {
                    ...Object.values(state.accounts).filter((x) => x.id !== action.id),
                },
            };
        }

        //movements
        case "GET_MOVEMENTS": {
            return {
                ...state,
                movements: {...action.movements},
            };
        }

        //Categories actions
        case "GET_CATEGORIES": {
            return {
                ...state,
                categories: {...action.categories},
            };
        }

        //Logout actions
        case "CLEAR": {
            return {
                ...state,
                cart: [],
                page: 0,
                searchField: "",
                globalState: [],
                accounts: [],
                movements: [],
                purchases:[],
                sales_requests:[],
                productList: [],
                categories: [],
                paginated_users: [],
                paginated_products: [],
                load: false,
            };
        }
        // USERS
        case "GET_USERS": {
            return {
                ...state,
                users: action.users,
            };
        }
        //PURCHASES
        case "GET_SALES_REQUESTS": {
            return {
                ...state,
                sales_requests: action.requests
            };
        }
        case "UPDATE_SALES_REQUESTS": {
            return {
                ...state,
                sales_requests: state.sales_requests.filter(x=>x.purchase_id !== action.id),
            };
        }
        case "GET_PURCHASES": {
            return {
                ...state,
                purchases: action.purchases
            };
        }
        //LocalStorage actions
        case "GET_PAGINATED_USERS": {
            return {
                ...state,
                paginated_users: {...action.response}
            };
        }
        case "GET_PAGINATED_PRODUCTS": {
            return {
                ...state,
                paginated_products: {...action.response}
            };
        }
        case "LOAD": {
            return {
                ...state,
                ...localStoreToStore(),
            };
        }
        case "SET_PAGE_NUMBER": {
            return {
                ...state,
                page: action.page,
            };
        }

        case "SET_SEARCH_FIELD": {
            return {
                ...state,
                searchField: action.searchField,
            };
        }
        default: {
            return state;
        }
    }
};
const logger = (store) => (next) => (action) => {
    console.log("dispatching ", action);
    let result = next(action);
    console.log("next state ", store.getState());
    return result;
};
export default createStore(
    reducer,
    {
        cart: [],
        page: 0,
        searchField: "",
        paginated_users: [],
        paginated_products: [],
        globalState: {},
        accounts: [],
        movements: [],
        purchases:[],
        sales_requests:[],
        productList: [],
        categories: [],
        users: [],
        load: false,
    },
    applyMiddleware(logger, thunk)
);
