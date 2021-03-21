import React, { useEffect, Suspense, lazy } from "react";

import { Route, Switch, Redirect } from "react-router-dom";
import store from "./store";
import { getUsers } from "./actions/actionCreator";
import Loading from "./components/Loading/Loading";
import 'toastr/toastr.scss';
const Login = lazy(() => import("./pages/Login/Login"));
const Register = lazy(() => import("./pages/Register/Register"));
const Home = lazy(() => import("./pages/Home"));



export default () => {  
    useEffect(() => {
        if (
          !localStorage.getItem("users")?.length ||
          store.getState()?.users?.error
        ) {
          store.dispatch(getUsers());
        }
      }, []);
    return (
        <Suspense fallback={<Loading/>}>
        <Switch>
            {/* Root Path */}
          {/* <Route exact path='/' component={Landing} /> */}
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route path="/home" component={Home} />
          <Route>
                <Redirect to='/login' />
          </Route>
        </Switch>
      </Suspense>
        // <div id='wrapper'>
        //     <Nav />
        //     <div id='page-wrapper' className='gray-bg dashbard-1'>
        //         <NavBar />
        //         <Switch>
        //             {/* Root Path */}
        //             <Route exact path='/' component={Home} />
        //             <Route>
        //                 <Redirect to='/' />
        //             </Route>
        //         </Switch>
        //         <Footer />
        //     </div>
        // </div>
    )
};
