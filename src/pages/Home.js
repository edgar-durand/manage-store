import React, {useState, useEffect} from "react";
import send from "../js/send";
import NavUI from "../components/NavUI";
import TopBarUI from "../components/TopBarUI";
import FooterUI from "../components/FooterUI";
import ProductList from "../components/ProductList";
import NewProductForm from "../components/NewProductForm/NewProductForm";
import MyAccounts from "../components/MyAccount/MyAccounts";
import "toastr/toastr.scss";
import toastr from "toastr";

import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
} from "react-router-dom";
import Detail from "../components/Detail/Detail";
import authHelper from "../js/authHelper";
import NotFound from "./NotFound";
import Edit from "../components/Edit/Edit";
//accounts
import NewAccountForm from "../components/NewAccount/NewAccountForm";

//Import Category
import CategoryList from '../components/Categories/CategoryList'
import CategoryEdit from '../components/Categories/CategoryEdit'
import CategoryNew from '../components/Categories/CategoryNew'
import CategoryShow from '../components/Categories/CategoryShow'
import msgNotification from "../js/msgNotification";
import store from "../store";


const Home = () => {
    const [state, setState] = useState({
        0: {
            username: "",
            prod_user: {},
        },
        token: authHelper(),
    });

    useEffect(() => {
        send(state, "/api/profile", "get").then((p) => {
            if (p[0]) {
                store.dispatch({
                    type:"UPDATE_STATE",
                    ...p
                })
                toastr.options.closeButton = true;
                toastr.options.closeHtml = '<button><i class="fa fa-close"></i></button>';
                toastr.info(`${p[0].username}`, "Bienvenido");
            }
            setState({...state, ...p});

            send({token: authHelper()}, "/api/accounts/", "get")
                .then(r => {
                    store.dispatch({
                        type:"GET_ACCOUNTS",
                        accounts: {...r}
                    })
                })

        });


    }, []);



    const logOut = () => {
        msgNotification(`Confirmar`, "Desea cerrar la sesion ?", "question", "ACEPTAR", true)
            .then(r => {
                if (r.value) {
                    send(state, "/api/logout", "get").then(() => msgNotification("LogOut",
                        "Su sesion ha cerrado con exito.", "success", "ACEPTAR", false));
                    localStorage.removeItem("token");
                    setState(null);
                    store.dispatch({
                        type: "UPDATE_STATE"
                    })
                    return <Redirect to="/login"/>;
                }
            })

    };

    document.body.classList.remove("gray-bg");

    if (authHelper()) {
        return (
            <div id="wrapper">
                <Router>
                    <NavUI
                        image={state[0].photo}
                        last_name={state[0].last_name}
                        status_message={state[0].status_message}
                        logOut={() => logOut()}
                    />
                    <div id="page-wrapper" className="gray-bg">
                        <TopBarUI logOut={() => logOut()}/>
                        <Switch>
                            {/* Routes of categories */}
                            <Route path="/home/categories/" component={CategoryList}/>
                            <Route path="/home/categories/new" component={CategoryNew}/>
                            <Route path="/home/categories/edit/:id" component={CategoryEdit}/>
                            <Route path="/home/categories/show/:id" component={CategoryShow}/>

                            {/* Routes of categories */}


                            {/*Routes of MyAccounts*/}
                            <Route path="/home/my_accounts/" component={MyAccounts}/>
                            <Route path="/home/new_account/" component={NewAccountForm}/>
                            {/*Routes of MyAccounts*/}

                            <Route path="/home/detail/:id" component={Detail}/>
                            <Route path="/home/edit/:id" component={Edit}/>
                            <Route path="/home/new_product/" component={NewProductForm}/>
                            <Route path="/home/my_products/" component={() => <ProductList {...state[0].prod_user} />}/>
                            {/*<Route exact path="/home" component={}/>*/}
                            <Route component={NotFound}/>
                        </Switch>
                        <FooterUI/>
                    </div>
                </Router>
            </div>
        );
    } else {
        document.body.classList.add("gray-bg");
        return <Redirect to="/login"/>;
    }
};
export default Home;