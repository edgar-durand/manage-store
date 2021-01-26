import React from "react";
import {Link} from "react-router-dom";
import LoadingButton from "../components/LoadingButton";

const LoginUI = (props) => {
    let load = props.load;

    return (

            <div className="loginColumns animated fadeInDown">
                <div className="row">

                    <div className="col-md-6">
                        <h2 className="font-bold">Welcome to IN+</h2>

                        <p>
                            Perfectly designed and precisely prepared admin theme with over 50 pages with extra new web
                            app
                            views.
                        </p>

                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                            been
                            the
                            industry's standard dummy text ever since the 1500s.
                        </p>

                        <p>
                            When an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        </p>

                        <p>
                            <small>It has survived not only five centuries, but also the leap into electronic
                                typesetting,
                                remaining essentially unchanged.</small>
                        </p>

                    </div>
                    <div className="col-md-6">
                        <div className="ibox-content">
                            <form className="m-t" action="/"
                                  onSubmit={(event) => props.handleSubmit(event)}>
                                <div className="form-group">
                                    <input onChange={(event) => props.handleChange(event)} name="username" type="email"
                                           className="form-control" placeholder="Username (email)"
                                           required=""/>
                                </div>
                                <div className="form-group">
                                    <input onChange={(event) => props.handleChange(event)} name="password"
                                           type="password"
                                           className="form-control"
                                           placeholder="Password"
                                           required=""/>
                                </div>

                                <LoadingButton
                                    load={load}
                                    buttonText="Login"
                                />

                                <p className="text-muted text-center">
                                    <small>Do not have an account?</small>
                                </p>
                                <Link className="btn btn-sm btn-white btn-block" to="/register">Create an account</Link>
                            </form>
                            <p className="m-t">
                                <small>Inspinia we app framework base on Bootstrap 3 &copy; 2014</small>
                            </p>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-md-6">
                        Copyright Example Company
                    </div>
                    <div className="col-md-6 text-right">
                        <small>© 2014-2015</small>
                    </div>
                </div>
            </div>

    )
}
export default LoginUI;