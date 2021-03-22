import store from "../store";

export const storeToLocalStore = (keyName = "globalState", storeKey = 'globalState') => {
    try {
        localStorage.setItem(keyName, JSON.stringify(store.getState()[storeKey]));
    } catch (e) {
        console.error(e);
        storeToLocalStore(keyName, JSON.parse(localStorage.getItem(keyName)));
    }

};

export const localStoreToStore = (keyName = "store") => localStorage.getItem(keyName) ?
    JSON.parse(localStorage.getItem(keyName)) : localStorage.setItem(keyName,"");