import {createStore} from "redux";

const reducer = (state, action) => {
    switch (action.type) {

        case "ADD_TO_CART": {
            const ADD = state.cart.find(x => x.name === action.product.name);
            if (!ADD)
                return {
                    ...state, cart: [...state.cart, action.product]
                }
        }
            break;
        case "UPDATE_STATE": {
            return {
                ...state, globalState: {...state.globalState, action}
            }
        }
        case "GET_CATEGORIES": {
            return {
                ...state, categories: {...action}
            }
        }
        case "ADD_NEW_PRODUCT": {
            return {
                ...state, productList: {...state.productList, action}
            }
        }
        default :{

        }

    }
    return state
}

export default createStore(reducer, {cart: [], globalState: [], productList: [], categories: []})