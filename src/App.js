import React from "react";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register"
import Home from "./pages/Home"

import {BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
            return (
            <Router>
                <Switch>
                    <Route exact path="/login"><Login/></Route>
                    <Route exact path="/register" ><Register/></Route>
                    <Route path="/home"><Home/></Route>
                    <Route><NotFound/></Route>
                </Switch>
            </Router>

            );
            }

            export default App;
