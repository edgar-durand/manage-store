import React, {useEffect, Suspense, lazy} from "react";
import {
    Redirect,
    Route,
    Switch,
} from "react-router-dom";
import { connect,useDispatch } from "react-redux";
import {
    clear,
    getAccounts,
    getAllPurchases,
    getCategories, getPaginatedProducts, getPaginatedUsers, getSalesRequests,
    load,
    setListProducts,
    updateState,
} from "../actions/actionCreator";
import toastr from "toastr";
import send from "../js/send";
import msgNotification from "../js/msgNotification";
import authHelper from "../js/authHelper";
import Loading from "../components/Loading/Loading";
import NavUI from "../components/NavBar/NavUI";
import MovementDetail from "../components/MyAccount/MovementDetail";
import NavBar from "../components/NavBar";

const IndexHome = lazy(() => import("./index/IndexHome"));
const Detail = lazy(() => import("../components/Detail/Detail"));
const NotFound = lazy(() => import("./NotFound"));
const Edit = lazy(() => import("../components/Edit/Edit"));
const ProductList = lazy(() => import("../components/ProductList"));
const NewProductForm = lazy(() =>
    import("../components/NewProductForm/NewProductForm")
);
const MyAccounts = lazy(() => import("../components/MyAccount/MyAccounts"));
const NewAccountForm = lazy(() =>
    import("../components/NewAccount/NewAccountForm")
);
const CategoryList = lazy(() =>
    import("../components/Categories/CategoryList")
);
const CategoryEdit = lazy(() =>
    import("../components/Categories/CategoryEdit")
);
const CategoryNew = lazy(() => import("../components/Categories/CategoryNew"));
const CategoryShow = lazy(() =>
    import("../components/Categories/CategoryShow")
);
const GoForShopping = lazy(() =>
    import("../components/GoForShopping/GoForShopping")
);
const CartList = lazy(() => import("../components/CartList/CartList"));
const Checkout = lazy(() => import("../components/Checkout/Checkout"));
const Profile = lazy(() => import("./Profile/Profile"));
const Deals = lazy(() => import("./Deals/Deals"));
const Section = lazy(() => import("./Deals/Section"));
const UsersContatc = lazy(() => import("./Deals/UsersContact"));


const Home = ({cart, globalState}) => {
    const dispatch = useDispatch();
    useEffect(() => {
        if (JSON.parse(localStorage.getItem('globalState'))?.email.length
        ) {
            dispatch(load('globalState'));
            dispatch(load('cart'));
            dispatch(load('page'));
            dispatch(load('searchField'));
            dispatch(load('accounts'));
            dispatch(load('movements'));
            dispatch(load('purchases'));
            dispatch(load('sales_requests'));
            dispatch(load('productList'));
            dispatch(load('categories'));
            dispatch(load('paginated_users'));
            dispatch(load('paginated_products'));
            dispatch(load('load'));
            dispatch(load('users'));
        } else {
            dispatch(setListProducts());
            dispatch(updateState());
            dispatch(getAllPurchases());
            dispatch(getSalesRequests());
            dispatch(getAccounts());
            dispatch(getCategories());
            dispatch(getPaginatedUsers());
            dispatch(getPaginatedProducts());
        }

        // eslint-disable-next-line
    }, []);

    const logOut = () => {
        let msg = "";
        Object.values(cart || []).length
            ? (msg =
                "You will lose the items in your shopping cart. Continue logging out ?")
            : (msg = "Desea cerrar la sesion ?");

        msgNotification(`Confirm`, msg, "question", "OK", true, "CANCEL").then(
            (r) => {
                if (r.value) {
                    send({token: authHelper()}, "/api/logout", "post").then(() => {
                        toastr.options.closeButton = true;
                        toastr.options.closeHtml =
                            '<button><i class="fa fa-close"></i></button>';
                        toastr.success(`Su sesion se ha cerrado con exito`, "LogOut");
                    });

                    localStorage.removeItem("token");
                    localStorage.removeItem('globalState');
                    localStorage.removeItem('cart');
                    localStorage.removeItem('page');
                    localStorage.removeItem('searchField');
                    localStorage.removeItem('accounts');
                    localStorage.removeItem('movements');
                    localStorage.removeItem('purchases');
                    localStorage.removeItem('sales_requests');
                    localStorage.removeItem('productList');
                    localStorage.removeItem('categories');
                    localStorage.removeItem('paginated_users');
                    localStorage.removeItem('paginated_products');
                    localStorage.removeItem('load');
                    localStorage.removeItem('account_id');
                    dispatch(clear());
                    return <Redirect to="/login"/>;
                }
            }
        );
    };

    document.body.classList.remove("gray-bg");

    if (authHelper()) {
        return (
            <div id="wrapper" >
                <NavUI
                    image={globalState?.photo}
                    last_name={globalState?.last_name}
                    status_message={globalState?.status_message}
                    logOut={() => logOut()}
                />

                <div id='page-wrapper' className='gray-bg dashboard-1'>
                    <NavBar/>
                    <Suspense fallback={<Loading/>}>
                        <Switch>
                            {/* Routes of categories */}
                            <Route
                                path="/home/categories/"
                                exact
                                component={() => <CategoryList/>}
                            />
                            <Route
                                path="/home/categories/new"
                                exact
                                component={() => <CategoryNew/>}
                            />
                            <Route
                                path="/home/categories/edit/:id"
                                exact
                                component={() => <CategoryEdit/>}
                            />
                            <Route
                                path="/home/categories/show/:id"
                                exact
                                component={() => <CategoryShow/>}
                            />
                            {/* Routes of categories */}
                            {/*Routes of MyAccounts*/}
                            <Route
                                path="/home/my_accounts/"
                                exact
                                component={() => <MyAccounts/>}
                            />
                            <Route exact path="/home/movement_detail/:id/:mov" component={MovementDetail}/>
                            <Route
                                path="/home/new_account/"
                                component={() => <NewAccountForm/>}
                            />
                            {/*Routes of MyAccounts*/}
                            <Route path="/home/my_cart/" component={() => <CartList/>}/>
                            <Route path="/home/checkout/" component={() => <Checkout/>}/>
                            {/*Shopping*/}
                            <Route
                                path="/home/shopping/"
                                component={() => <GoForShopping/>}
                            />
                            {/*Shopping*/}
                            <Route path="/home/detail/:id" component={Detail}/>
                            <Route path="/home/edit/:id" component={Edit}/>
                            {/* Products */}
                            <Route
                                path="/home/new_product/"
                                component={() => <NewProductForm/>}
                            />
                            <Route
                                path="/home/my_products/"
                                component={() => <ProductList/>}
                            />
                            {/* Deals */}
                            <Route exact path="/home/deals/" component={() => <Deals/>}/>
                            <Route
                                exact
                                path="/home/user-contact/"
                                component={() => <UsersContatc/>}
                            />
                            <Route exact path="/home/deals/:id" component={Section}/>

                            {/* Profile */}
                            <Route path="/home/profile/" component={() => <Profile/>}/>

                            <Route exact path="/home" component={() => <IndexHome/>}/>
                            <Route component={NotFound}/>
                        </Switch>
                    </Suspense>
                    {/* <FooterUI /> */}
                </div>
            </div>
        );
    } else {
        document.body.classList.add("gray-bg");
        return <Redirect to="/login"/>;
    }
};

const mapStateToProps = (state) => {
    return {
        cart: state?.cart,
        // cart: JSON.parse(localStorage.getItem("store"))?.cart,
        // globalState: state?.globalState,
        globalState: JSON.parse(localStorage.getItem("globalState")),
    };
};
export default connect(mapStateToProps)(Home);
