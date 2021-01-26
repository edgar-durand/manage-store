import React, {useState, useEffect} from "react";
import send from "../js/send"
import NavUI from "../components/NavUI";
import TopBarUI from "../components/TopBarUI";
import FooterUI from "../components/FooterUI";
import ProductList from "../components/ProductList";
import NewProductForm from "../components/NewProductForm";
import store from "../store";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
// import Register from "./register";
import Detail from "../components/Detail";
// import NotFound from "./NotFound";
import authHelper from "../js/authHelper";
import NotFound from "./NotFound";
import Edit from "../components/Edit";

const Home = () => {
    const [state, setState] = useState({
        0: {
            username: "",
            prod_user: {}
        },
        token: authHelper()
    });

    useEffect(() => {
        send(state, "/api/profile", "get")
            .then(p => {
                setState({...state, ...p});
            })
        // send(state, "/api/category", "get")
        //     .then(r => {
        //         if (!store.getState().categories.length)
        //             store.dispatch({
        //                 type: "GET_CATEGORIES",
        //                 ...r
        //             })
        //     })
    }, [])


    store.subscribe(() => {
        send(state, "/api/profile", "get")
            .then(p => {
                setState({...state, ...p});
            })

    })

    const logOut = () => {
        send(state, "/api/logout", "get")
            .then(r => console.log(r))
        localStorage.removeItem("token");
        setState({});
        return <Redirect to="/login"/>
    }

    const handleClick = (id) => {
        send({token: authHelper()}, `/api/product/${id}`, "delete")
            .then(r=>setState({...state,0:{prod_user:{...Object.values(state[0].prod_user).filter(x=>x.id !== id) }}}))


    }

    document.body.classList.remove('gray-bg');


    if (authHelper()) {

        return (
            <div id="wrapper">
                <Router>
                    <NavUI
                        logOut={() => logOut()}
                    />
                    <div id="page-wrapper" className="gray-bg">
                        <TopBarUI
                            logOut={() => logOut()}
                        />
                        <Switch>
                            <Route path="/home/detail/:id" component={Detail}/>
                            <Route path="/home/edit/:id" component={Edit}/>
                            <Route path="/home/new_product/" component={NewProductForm}/>
                            <Route path="/home/my_products/" component={() => <ProductList
                                handleClick={(id) => handleClick(id)}
                                {...state[0].prod_user}
                            />
                            }/>/>
                            {/*<Route exact path="/home" component={}/>*/}
                            <Route component={NotFound}/>
                        </Switch>
                        <FooterUI/>
                    </div>
                </Router>


            </div>
        )
    } else {
        document.body.classList.add('gray-bg');
        return <Redirect to="/login"/>
    }


}
export default Home