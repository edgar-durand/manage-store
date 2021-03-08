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
export const setPageNumber = (page) =>{
  return {
    type: "SET_PAGE_NUMBER",
    page,
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
      `Do you really want to delete.`,
      "question",
      "ACEPTAR",
      true
    ).then((r) => {
      if (r.value) {
        send({ token: authHelper() }, `/api/account/${id}/`, "delete").then(
          () => {
            dispatch({
              type: "DELETE_ACCOUNTS",
              id,
            });
            toastr.options.closeButton = true;
            toastr.options.closeHtml =
              '<button><i class="fa fa-close"></i></button>';
            toastr.success(`Account deleted.`, "DELETED !");
          }
        );
      }
    });
  };
};

export const getAccounts = () => {
  return (dispatch) => {
    send({ token: authHelper() }, "/api/account", "get").then((res) => {
      dispatch({
        type: "GET_ACCOUNTS",
        accounts: res.response.data.accounts,
      });
    });
  };
};

// CATEGORIES
export const getCategories = () => {
  return (dispatch) => {
    send({ token: authHelper() }, "/api/category", "get").then((r) =>
      dispatch({
        type: "GET_CATEGORIES",
        categories: r.response.data,
      })
    );
  };
};

// PRODUCTS
export const getAllProducts = () => {
  return (dispatch) => {
    send({ token: authHelper() }, "/api/product", "get").then((r) => {
      dispatch({ type: "GET_ALL_PRODUCTS", products: r.response.data });
    });
  };
};
export const setListProducts = () => {
  return (dispatch) => {
    send({ token: authHelper() }, "/api/my_product", "get").then((r) =>
      dispatch({
        type: "SET_LIST_PRODUCTS",
        product: r.response.data,
      })
    );
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
      dispatch({ type: "GET_USERS", users: r?.response?.data });
    });
  };
};
// GLOBAL STATE
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
      { token: authHelper(), form: profile },
      "/api/user/" + profile.id,
      "patch"
    ).then((r) => {
      console.log(r);
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
    });
  };
};

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

export const updateState = () => {
  return (dispatch) => {
    send({ token: authHelper() }, "/api/profile", "get").then((p) => {
      if (p.response.data) {
        dispatch({
          type: "UPDATE_STATE",
          state: { ...p.response.data },
        });

        toastr.options.preventDuplicates = true;
        toastr.options.closeButton = true;
        toastr.options.closeHtml =
          '<button><i class="fa fa-close"></i></button>';
        toastr.info(`${p.response.data.username}`, "Bienvenido");
      }
    });
  };
};
