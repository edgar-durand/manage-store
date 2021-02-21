import React, { useEffect } from "react";
import send from "../js/send";
import msgNotification from "../js/msgNotification";
import "toastr/toastr.scss";
import toastr from "toastr";
import store from "../store";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import IndexHome from "./index/IndexHome";
import Detail from "../components/Detail/Detail";
import authHelper from "../js/authHelper";
import NotFound from "./NotFound";
import Edit from "../components/Edit/Edit";
import NavUI from "../components/NavUI";
import FooterUI from "../components/FooterUI";
import ProductList from "../components/ProductList";
import NewProductForm from "../components/NewProductForm/NewProductForm";
import MyAccounts from "../components/MyAccount/MyAccounts";
import NewAccountForm from "../components/NewAccount/NewAccountForm";
import CategoryList from "../components/Categories/CategoryList";
import CategoryEdit from "../components/Categories/CategoryEdit";
import CategoryNew from "../components/Categories/CategoryNew";
import CategoryShow from "../components/Categories/CategoryShow";
import GoForShopping from "../components/GoForShopping/GoForShopping";
import CartList from "../components/CartList/CartList";
import Checkout from "../components/Checkout/Checkout";
import Movement from "../components/MyAccount/Movement";
import { connect } from "react-redux";
import {
  clear,
  getAccounts,
  getCategories,
  load,
  setListProducts,
  updateState,
} from "../actions/actionCreator";
import { localStoreToStore } from "../js/storeHelper";
import Profile from "./Profile/Profile";

const Home = ({ cart, globalState }) => {
  useEffect(() => {
    if (localStoreToStore()) store.dispatch(load());
    else {
      store.dispatch(updateState());
      store.dispatch(getAccounts());
      store.dispatch(setListProducts());
      store.dispatch(getCategories());
    }
  }, []);

  const logOut = () => {
    let msg = "";
    Object.values(cart).length
      ? (msg =
          "You will lose the items in your shopping cart. Continue logging out ?")
      : (msg = "Desea cerrar la sesion ?");

    msgNotification(`Confirm`, msg, "question", "OK", true, "CANCEL").then(
      (r) => {
        if (r.value) {
          send({ token: authHelper() }, "/api/logout", "get").then(() => {
            toastr.options.closeButton = true;
            toastr.options.closeHtml =
              '<button><i class="fa fa-close"></i></button>';
            toastr.success(`Su sesion se ha cerrado con exito`, "LogOut");
          });

          localStorage.removeItem("token");

          store.dispatch(clear());
          localStorage.removeItem("store");

          return <Redirect to="/login" />;
        }
      }
    );
  };

  document.body.classList.remove("gray-bg");

  if (authHelper()) {
    return (
      <div id="wrapper">
        <Router>
          <NavUI
            image={globalState?.photo}
            last_name={globalState?.last_name}
            status_message={globalState?.status_message}
            logOut={() => logOut()}
          />
          <div id="page-wrapper" className="gray-bg">
            <Switch>
              {/* Routes of categories */}
              <Route
                path="/home/categories/"
                component={() => <CategoryList />}
              />
              <Route
                path="/home/categories/new"
                component={() => <CategoryNew />}
              />
              <Route
                path="/home/categories/edit/:id"
                component={() => <CategoryEdit />}
              />
              <Route
                path="/home/categories/show/:id"
                component={() => <CategoryShow />}
              />
              {/* Routes of categories */}
              {/*Routes of MyAccounts*/}
              <Route
                path="/home/my_accounts/"
                component={() => <MyAccounts />}
              />
              <Route path="/home/account/:id" component={() => <Movement />} />
              <Route
                path="/home/new_account/"
                component={() => <NewAccountForm />}
              />
              {/*Routes of MyAccounts*/}
              <Route path="/home/my_cart/" component={() => <CartList />} />
              <Route path="/home/checkout/" component={() => <Checkout />} />
              {/*Shopping*/}
              <Route
                path="/home/shopping/"
                component={() => <GoForShopping />}
              />
              {/*Shopping*/}
              <Route path="/home/detail/:id" component={Detail} />
              <Route path="/home/edit/:id" component={Edit} />
              <Route
                path="/home/new_product/"
                component={() => <NewProductForm />}
              />
              <Route
                path="/home/my_products/"
                component={() => <ProductList />}
              />
              {/* Profile */}
              <Route path="/home/profile/" component={() => <Profile />} />

              <Route exact path="/home" component={() => <IndexHome/>} />
              <Route component={() => <NotFound />} />
            </Switch>
            <FooterUI />
          </div>
        </Router>
      </div>
    );
  } else {
    document.body.classList.add("gray-bg");
    return <Redirect to="/login" />;
  }
};

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    globalState: state.globalState[0],
  };
};
export default connect(mapStateToProps)(Home);
