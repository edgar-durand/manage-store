import React, {useState, useEffect} from "react";
import FatalError from "./FatalError";
import send from "./../js/send";
import RegisterUI from "./RegisterUI";
import passwordRequirements from "../validation/passwordRequirements";

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {

    const [stat, setStat] = useState({
        agree: false, load: false, user: {
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
            number: null
        }, users: []
    });

    let users;

    useEffect(() => {
        send(stat, "/api/user", "get")
            .then(r => {
                setStat({...stat, users: {...r}})
            })
    }, [])

    users = Object.values(stat.users).find(x => x.email === stat.user.email);

    if (users)
        console.log(users.email, " in use, use another email address.")

    const handleSubmit = (e) => {
        setStat({...stat, load: true})
        e.preventDefault();
        passwordRequirements(stat.user.password) &&
        stat.user.username &&
        stat.user.password &&
        !users &&
        stat.agree ?
            send(stat.user, "/api/user/", "post")
                .then(r => {
                    setStat({...stat, ...r, load: false});
                })
            : e.preventDefault();
    }

    const handleClick = () => {
        if (stat.agree)
            setStat({
                ...stat,
                agree: false
            })
        else
            setStat({
                ...stat,
                agree: true
            })
    }

    const handleChange = (e) => {
        setStat({
            ...stat,
            user: { ...stat.user,
                [e.target.name]: e.target.value
            }
        });
    }

    console.log(stat.user)

    if (stat.id && !stat.error) {
        console.info(`User: ${stat.username} id: ${stat.id}  has been created successfully`);
        props.history.push("/login", stat);
    } else if (stat.error) {
        console.error(stat.error);
        return <FatalError/>
    }

    return (<RegisterUI
            handleChange={(event) => handleChange(event)}
            handleSubmit={(event) => handleSubmit(event)}
            handleClick={() => handleClick()}
            disable={stat.agree && passwordRequirements(stat.user.password) && !users &&
            stat.user.username !== ""}
            load={stat.load}
            {...stat.user}
        />

    )
}
