import React from "react";
import {Link} from "react-router-dom";
import LoadingButton from "../components/LoadingButton";

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => (
    <div className="middle-box text-center loginscreen animated fadeInDown">
        <div>
            <h1 className="logo-name">IN+</h1>
        </div>
        {/*<h3>Register to IN+</h3>*/}
        <p>Create account to see it in action.</p>

        <form onSubmit={(event) => props.handleSubmit(event)} className="m-t" action="register.js">
            <div className="form-group">
                <input onChange={(event) => props.handleChange(event)} name="username" type="text" className="form-control"
                       placeholder="User*"
                       value={props.username}
                       required/>
            </div>
            <div className="form-group">
                <input onChange={(event) => props.handleChange(event)} name="email" type="email"
                       className="form-control"
                       value={props.email}
                       placeholder="Email*" required/>
            </div>
            <div className="form-group">
                <input onChange={(event) => props.handleChange(event)} name="password" type="password"
                       className="form-control"
                       value={props.password}
                       placeholder="Password*"
                       title="5 - 10 length, It must has at least a number, an special character and upperCase. "
                       required/>
            </div>
            <div className="form-group">
                <div name="checkbox" onChange={(event) => props.handleClick(event)} className="checkbox i-checks">
                    <label> <input name="checkbox" type="checkbox"/> Agree the terms and
                        policy </label></div>
            </div>
            <LoadingButton
                load={props.load}
                buttonText="Register"
                disabled={props.disable === false}
            />
            {/*<button type="submit" className="btn btn-primary block full-width m-b"*/}
            {/*        disabled={props.disable === false}>Register*/}
            {/*</button>*/}

            <p className="text-muted text-center"><small>Already have an account?</small></p>
            <Link className="btn btn-sm btn-white btn-block" to="/login">Login</Link>
        </form>
        <p className="m-t"><small>Inspinia we app framework base on Bootstrap 3 &copy; 2014</small></p>
    </div>
)