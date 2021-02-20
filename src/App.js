import React, { useEffect } from "react";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { storeToLocalStore } from "./js/storeHelper";
import store from "./store";

function App() {
  useEffect(() => {
    
    
    let unsubscribe = store.subscribe(() => {
      if (store && Object.values(store.getState()).length) {
        storeToLocalStore();
        return unsubscribe;
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={()=><Login/>} />
        <Route exact path="/register" component={()=><Register />} />
        <Route path="/home" component={()=><Home />} />
        <Route component={()=> <NotFound />} />
      </Switch>
    </Router>
  );
}

export default App;
