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
    msgNotification(
      "Confirm !",
      `Do you really want to delete.`,
      "question",
      "ACEPTAR",
      true
    ).then((r) => {
      if (r.value) {
        send({ token: authHelper() }, `/api/accounts/${id}/`, "delete").then(
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
  return (dispatch) => {
    send({ token: authHelper() }, "/api/category/", "get").then((r) =>
      dispatch({
        type: "GET_CATEGORIES",
        categories: r,
      })
    );
  };
};

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
  return {
    type: "ADD_NEW_PRODUCT",
    product,
  };
};
// USERS
export const getUsers = () => {
  return (dispatch) => {
    send({}, "/api/user/", "get").then((r) =>
      dispatch({ type: "GET_USERS", users: r })
    );
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
  let data = new FormData();
  const {
    street,
    between,
    municipality,
    province,
    building,
    apto,

    facebook,
    twitter,
    instagram,

    photo,
    first_name,
    last_name,
    birth_date,
    status_message,
    username,
    email,
    phone,
    password
  } = profile;

  data.append("street", street);
  data.append("between", between);
  data.append("municipality", municipality);
  data.append("province", province);
  data.append("building", building);
  data.append("apto", apto);
  data.append("facebook", facebook);
  data.append("twitter", twitter);
  data.append("instagram", instagram);
  data.append("photo", photo || null);
  data.append("first_name", first_name);
  data.append("last_name", last_name);
  data.append("birth_date", birth_date);
  data.append("status_message", status_message);
  data.append("username", username);
  data.append("email", email);
  data.append("phone", phone);
  data.append("password", password);

  // const keys = Object.keys(profile).entries();
  // const values = Object.values(profile).entries();
  // for (let i = 0; i < Object.values(profile).length; i++) {
  //   data.append(JSON.stringify(keys.next().value[1]), values?.next()?.value[1]);
  // }
  return (dispatch) => {
    send(
      { token: authHelper(), form: data },
      "/api/user/" + profile.id + "/",
      "putFile"
    ).then((r) => {
      dispatch({
        type: "UPDATE_PROFILE",
        profile: r,
      });
      dispatch({
        type: "SET_LOAD",
        load: false,
      });
      r.detail ? toastr.info(r.detail) : toastr.success("Updated !");
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
    });
  };
};
