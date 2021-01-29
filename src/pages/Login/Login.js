import React, {useState, useEffect} from "react";
import LoginUI from "./LoginUI";
import send from "../../js/send";
import {Redirect} from "react-router-dom"


const Login = () => {

    const [data, setData] = useState({
        token: null,
        error: null,
        load: false
    });

    useEffect(() => {
        if (localStorage.getItem("token"))
            setData({...data, token: localStorage.getItem("token")})
    }, [])

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (data.username !== "" && data.password !== "") {
            setData({
                ...data,
                load: true
            })
            send(data, "/api/login", "post")
                .then((r) => {
                    setData({
                        ...data,
                        ...r,
                        load: false
                    });

                });
        }


    };

    if (data.token && !data.error) {
        localStorage.setItem("token", data.token);
        console.log("Session logged in successfully.")
        return <Redirect to="/home/"/>
    }
    return (<LoginUI
            handleSubmit={(event) => handleSubmit(event)}
            handleChange={(event) => handleChange(event)}
            load={data.load}
        />
    )

};
export default Login;