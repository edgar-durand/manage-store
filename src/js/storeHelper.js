import store from "../store";

export const storeToLocalStore = () =>{
 if (localStorage.getItem("store")) {
     localStorage.removeItem("store")
     localStorage.setItem("store",JSON.stringify(store.getState()))
 }else
     localStorage.setItem("store",JSON.stringify(store.getState()))
}

export const localStoreToStore = () =>{
    if (localStorage.getItem("store"))
        return {...JSON.parse(localStorage.getItem("store"))}
}