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
            break;
        case "GET_CATEGORIES": {
            return {
                ...state, categories: {...action}
            }
        }
            break;
        case "ADD_NEW_PRODUCT": {
            return {
                ...state
            }
        }
            break;
        case "UPDATE_LIST": {
            const NEW_LIST = Object.values(state.productList).filter(product => product.id !== action.id)
            console.log(NEW_LIST)
            console.log(state.productList)
            return {
                ...state, productList: {...NEW_LIST}
            }
        }
        default : {

        }

    }
    return state
}

export default createStore(reducer, {cart: [], globalState: [], productList: [], categories: []})