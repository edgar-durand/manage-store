import React, { useEffect } from "react";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home";

import {HashRouter as Router, Route, Switch } from "react-router-dom";
import { storeToLocalStore } from "./js/storeHelper";
import store from "./store";
import { getUsers } from "./actions/actionCreator";

function App() {
  useEffect(() => {
    if (      
      !Object.values(store.getState()?.users || []).length ||
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
      <Switch>
        <Route exact path="/login" component={() => <Login />} />
        <Route exact path="/register" component={() => <Register />} />
        <Route path="/home" component={() => <Home />} />
        <Route component={() => <NotFound />} />
      </Switch>
    </Router>
  );
}

export default App;
