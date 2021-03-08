import React, {useRef, useEffect} from "react";
import {Link} from "react-router-dom";
import LoadingButton from "../../components/LoadingButton";

const LoginUI = ({handleChange, load, handleSubmit}) => {
    const DIV = useRef("div");
    useEffect(() => {
        if (load) {
            DIV.current.classList.add("sk-loading")
        } else {
            DIV.current.classList.remove("sk-loading")
        }
    }, [load, DIV])
    return (
        <React.Fragment>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <div ref={DIV} className="loginColumns animated fadeInDown ibox-content ">
                <div className="row">

                    <div className="col-md-6">
                        <h2 className="font-bold">Welcome to E-Store</h2>

                        <p style={{fontSize: "15px"}}>
                            Perfectly designed and precisely prepared for small business management.
                        </p>

                        <p style={{fontSize: "15px"}}>
                            This prompt new opportunities of sales and buys such like a trade new world at the reach of you.
                        </p>

                        <p style={{fontSize: "15px"}}>
                            Don't matter how, when and where we just care to serve you as high as you deserve.
                        </p>

                    </div>
                    <div className="col-md-6">
                        <div className="ibox-content ">
                            <form className="m-t" action="/"
                                  onSubmit={(event) => handleSubmit(event)}>
                                <div className="form-group">
                                    <input onChange={(event) => handleChange(event)} name="email" type="email"
                                           className="form-control" placeholder="Username (email)"
                                           required=""/>
                                </div>
                                <div className="form-group">
                                    <input onChange={(event) => handleChange(event)} name="password"
                                           type="password"
                                           className="form-control"
                                           placeholder="Password"
                                           required=""/>
                                </div>

                                <LoadingButton
                                    load={load}
                                    buttonText="Login"
                                />

                                <p style={{fontSize: "15px"}} className="text-muted text-center">
                                    Do not have an account?
                                </p>
                                <Link className="btn btn-sm btn-white btn-block" to="/register">Create an account</Link>
                            </form>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-md-6">
                       <h5> Copyright E-Store Trades Company </h5>
                    </div>
                    <div className="col-md-6 text-right">
                        <h5>© 2020-2021</h5>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
export default LoginUI;