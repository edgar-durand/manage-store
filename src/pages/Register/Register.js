import React, {useState} from "react";
import {Redirect} from "react-router-dom";
import FatalError from "../FatalError";
import send from "../../js/send";
import RegisterUI from "./RegisterUI";
import passwordRequirements from "../../validation/passwordRequirements";
import toastr from "toastr";
import store from "../../store";
import {getUsers} from "../../actions/actionCreator";
import getBase64 from "../../js/getBase64";
import Compresor from "compressorjs";

const Register = () => {
    const [stat, setStat] = useState({
        agree: false,
        load: false,
        user: {
            username: "",
            password: "",
            email: "",
            is_superuser: false,
            first_name: "",
            last_name: "",
            birth_date: null,
            photo: null,
            phone: null,
            status_message: null,
            street: null,
            number: null,
        },
        users: JSON.parse(localStorage.getItem("users")),
    });
    let users = stat.users?.find(
        (x) => x.email === stat.user.email
    );

    if (users) {
        toastr.options.preventDuplicates = true;
        toastr.warning(
            `This email address is already in use, please provide a different one `,
            "Info"
        );
    }

    const handleFile = (file) => {
        // if (file.size > 30000)
        //   toastr.warning("You should set a picture that size is bellow 30 kb.");
        // else
        new Compresor(file, {
            quality: 0.2,

            success(file) {

                getBase64(file).then(f => {
                    setStat({
                        ...stat,
                        user: {...stat.user, photo: f},
                    })
                })
                    .catch(err=>toastr.error(err));

            },
            error(error) {
                toastr.error(error);
            }
        });

    };

    const handleSubmit = (e) => {
        setStat({...stat, load: true});
        e.preventDefault();
        // let form = new FormData();
        // for (let [keys, values] of Object.entries(stat.user))
        //   if (keys !== "photo") form.append(keys, values);
        // if (stat.user.photo?.size <= 30000) form.append("photo", stat.user.photo);

        passwordRequirements(stat.user.password) &&
        stat.user.username &&
        stat.user.password &&
        !users &&
        stat.agree
            ? send({...stat.user}, "/api/user/", "post")
                .then((r) => {
                    setStat({...stat, ...r, load: false});
                    store.dispatch(getUsers());
                })
                .catch((r) => toastr.error(r.error.message))
            : toastr.warning("Debe llenar todos los campos");
    };

    const handleClick = () => {
        if (stat.agree)
            setStat({
                ...stat,
                agree: false,
            });
        else
            setStat({
                ...stat,
                agree: true,
            });
    };

    const handleChange = (e) => {
        setStat({
            ...stat,
            user: {
                ...stat.user,
                [e.target.name]: e.target.value,
            },
        });
    };

    if (!stat.error?.message && stat?.status === 201) {
        toastr.success('User has been created successfully');

        return <Redirect to="/login"/>;
        // props.history.push("/login", stat);
    } else if (stat.error) {
        console.error(stat.error);
        return <FatalError/>;
    }

    return (
        <RegisterUI
            handleChange={(event) => handleChange(event)}
            handleSubmit={(event) => handleSubmit(event)}
            handleClick={() => handleClick()}
            handleFile={(file) => handleFile(file)}
            disable={
                stat.agree &&
                passwordRequirements(stat.user.password) &&
                !users &&
                stat.user.username !== ""
            }
            load={stat.load}
            {...stat.user}
        />
    );
};

export default Register;
