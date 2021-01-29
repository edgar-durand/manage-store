import React from "react";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/register"
import Home from "./pages/Home"

import {BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
            return (
            <Router>
                <Switch>
                    {/*<Route path="/" component={Anonymous}/>*/}
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/register" component={Register}/>
                    <Route path="/home" component={Home}/>
                    <Route component={NotFound}/>
                </Switch>
            </Router>

            );
            }

            export default App;
