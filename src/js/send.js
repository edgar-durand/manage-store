import authHelper from "./authHelper";
import msgNotification from "./msgNotification";

const send = async (state, endPoint, method) => {
    const SERVER = "http://localhost:8000";
    let result, res, config, dat;
    method = method.toUpperCase();

    try {
        if (state.token) {
            switch (method) {
                case "POST": {
                    config = {
                        method: method,
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json",
                            // "Content-Type": "multipart/form-data",
                            "Authorization": "token " + authHelper()
                        },
                        // body: state
                        body: JSON.stringify(state)
                    }
                }
                    break;
                case "FILE": {
                    config = {
                        method: "POST",
                        headers: {
                            "Accept": "*/*",
                            // "Content-Type": "application/json",
                            // "Content-Type": "multipart/form-data",
                            "Authorization": "token " + authHelper()
                        },
                        // body: state
                        body: state.form
                    }
                }
                    break;
                case "GET": {
                    config = {
                        method: method,
                        mode: "cors",
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json",
                            "Authorization": `token ${state.token}`
                        }
                    }
                }
                    break;
                case "PUT": {
                    config = {
                        method: method,
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json",
                            "Authorization": "token " + state.token
                        },
                        body: JSON.stringify(state)
                    }
                }
                    break;
                case "PUTFILE": {
                    config = {
                        method: "PUT",
                        headers: {
                            "Accept": "*/*",
                            // "Content-Type": "application/json",
                            "Authorization": "token " + state.token
                        },
                        body: state.form
                    }
                }
                    break;
                case "DELETE": {
                    config = {
                        method: method,
                        mode: "cors",
                        headers: {
                            "Accept": "*/*",
                            "Authorization": `token ${state.token}`
                        }
                    }
                    res = await fetch(SERVER + endPoint, config);
                    dat = await JSON.parse(res);
                }
            }
        } else {
            if (method==="FILE"){
                    config = {
                        method: "POST",
                        headers: {
                            "Accept": "*/*",
                            // "Content-Type": "application/json",
                            // "Content-Type": "multipart/form-data",
                        },
                        // body: state
                        body: state.form
                    }
            }else
            method === "POST" ?
                config = {
                    method: method,
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(state)
                } :
                config = {
                    method: method,
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    }
                }
        }


        if (method !== "DELETE") {
            res = await fetch(SERVER + endPoint, config);
            dat = await res.json();
        }

        result = {...dat};


    } catch (error) {
        msgNotification("ERROR",error,"error","OK")
            .then(r=>{
                if (r.value)
                    result = {error};
            })

    }

    return result

}
export default send;
