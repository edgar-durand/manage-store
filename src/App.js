import React, { useEffect, Suspense, lazy } from "react";
import "toastr/toastr.scss";
import "./components/styles/css/bootstrap.min.css";
import "./components/styles/css/animate.css";
import "./components/styles/css/style.css";
import "./components/styles/css/textSpinners/spinners.css";
import NotFound from "./pages/NotFound";
// import Login from "./pages/Login/Login";
// import Register from "./pages/Register/Register";
// import Home from "./pages/Home";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { storeToLocalStore } from "./js/storeHelper";
import store from "./store";
import { getUsers } from "./actions/actionCreator";
import Loading from "./components/Loading/Loading";
// const NotFound = lazy(() => import("./pages/NotFound"));
const Login = lazy(() => import("./pages/Login/Login"));
const Register = lazy(() => import("./pages/Register/Register"));
const Home = lazy(() => import("./pages/Home"));

function App() {
  useEffect(() => {
    if (
      !Object.values(JSON.parse(localStorage.getItem("store"))?.users || [])
        .length ||
      store.getState?.users?.error
    ) {
      store.dispatch(getUsers());      
    }

    let unsubscribe = store.subscribe(() => {
      storeToLocalStore();
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Router>
      <Suspense fallback={<Loading/>}>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route path="/home" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
