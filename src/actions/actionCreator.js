import toastr from "toastr";
import authHelper from "../js/authHelper";
import msgNotification from "../js/msgNotification";
import send from "../js/send";
// CART
export const addToCart = (product) => {
  return {
    type: "ADD_TO_CART",
    product,
  };
};

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
    msgNotification("Confirm !",`Do you really want to delete.`,"question","ACEPTAR",true)
            .then(r=>{
                if (r.value) {
                    send({token: authHelper()},`/api/accounts/${id}/`,"delete")
                        .then(()=>{
                            dispatch({
                                type: "DELETE_ACCOUNTS",
                                id
                            })
                            toastr.options.closeButton = true;
                            toastr.options.closeHtml = '<button><i class="fa fa-close"></i></button>';
                            toastr.success(`Account deleted.`, "DELETED !");
                        })
                }
            })
  };
};

export const getAccounts = () => {
  return (dispatch) => {
    send({ token: authHelper() }, "/api/accounts", "get").then((res) => {
      dispatch({
        type: "GET_ACCOUNTS",
        accounts: res,
      });
      
    });
  };
};

// CATEGORIES
export const getCategories = () => {
  return dispatch =>{
    send({ token: authHelper() }, "/api/category/", "get").then((r) =>
      dispatch({
        type: "GET_CATEGORIES",
        categories: r,
      })
    );
  }
}

// PRODUCTS
export const setListProducts = () => {
  return (dispatch) => {
    send({ token: authHelper() }, "/api/product/", "get").then((r) =>
      dispatch({
        type: "SET_LIST_PRODUCTS",
        product: r,
      })
    );
  };
};

export const updateList = (id) => {
  toastr.success("Product deleted !")
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
  return{
    type: "ADD_NEW_PRODUCT",
    product
  }  
}

// GENERAL
export const load = () => {
  return{
    type: "LOAD",
  }
}

export const clear = () => {
  return{
    type: "CLEAR",
  }
}

export const updateState = () => {
  return dispatch => {
    send({ token: authHelper() }, "/api/profile", "get").then((p) => {
      if (p[0]) {
        dispatch({
          type: "UPDATE_STATE",
          state: { ...p },
        });

        toastr.options.preventDuplicates = true;
        toastr.options.closeButton = true;
        toastr.options.closeHtml =
          '<button><i class="fa fa-close"></i></button>';
        toastr.info(`${p[0].username}`, "Bienvenido");
      }
  

    })
  }
};