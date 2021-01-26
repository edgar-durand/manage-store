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
                            "Authorization": "token " + state.token
                        },
                        // body: state
                        body: JSON.stringify(state)
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
        console.log(error)
        result = {error};
    }

    return result

}
export default send;
