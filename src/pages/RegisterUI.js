import React, {useRef} from "react";
import {Link} from "react-router-dom";
import LoadingButton from "../components/LoadingButton";

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
    const img = useRef('img');
    const file = useRef('file');
    const label = useRef('label');

    return(
    <div className="align-self-xl-center">

        <div className="float-left text-center col-lg-4">
            <h1 className="logo-name">IN+</h1>
            <p>Create account to see it in action.</p>
        </div>


        <div className="col-lg-6 float-left">

            <form onSubmit={(event) => props.handleSubmit(event)} className="m-t " action="register.js">
                <div className="form-group">
                    <input onChange={(event) => props.handleChange(event)} name="first_name" type="text"
                           className="form-control"
                           placeholder="First Name"
                           value={props.first_name}
                           required/>
                </div>
                <div className="form-group">
                    <input onChange={(event) => props.handleChange(event)} name="last_name" type="text"
                           className="form-control"
                           placeholder="Last Name"
                           value={props.last_name}
                           required/>
                </div>
                <div className="form-group">
                    <label className="col-lg-2 float-left">Birth date</label>
                    <input onChange={(event) => props.handleChange(event)} name="birth_date" type="date"
                           className="form-control col-lg-4"
                           value={props.birth_date}
                           required/>

                </div>
                <div className="form-group">
                    <input onChange={(event) => props.handleChange(event)} name="username" type="text"
                           className="form-control"
                           placeholder="User"
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
                    <input onChange={(event) => props.handleChange(event)} name="phone" type="phone"
                           className="form-control"
                           value={props.phone}
                           placeholder="Phone number" required/>
                </div>
                <div className="form-group">
                    <input onChange={(event) => props.handleChange(event)} name="password" type="password"
                           className="form-control"
                           value={props.password}
                           placeholder="Password*"
                           title="Min 5 characters, It must has at least a number, an special character and upperCase. "
                           required/>
                </div>

                <div className="form-group col-lg-auto">
                    <input ref={file} name="photo" id="logo" type="file" onChange={() => {
                        if (file.current.files[0]) {
                            img.current.src = URL.createObjectURL(file.current.files[0])
                            label.current.childNodes[0].textContent = file.current.files[0].name
                            props.handleFile(file.current.files[0])
                        } else {
                            img.current.src = null
                            label.current.childNodes[0].textContent = "Choose file..."
                            props.handleFile(file.current.files[0])
                        }

                    }} accept="image/*"
                           className="custom-file-input "/>
                    <label ref={label} htmlFor="logo" className="custom-file-label ">Choose
                        file...</label>
                </div>

                <div className="form-group" style={{
                    height: "auto"
                }}>
                    <img ref={img} width="200px" className="img-circle" name="showImg" alt="" style={{
                        objectFit: "contain"
                    }}/>
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
    </div>
)}