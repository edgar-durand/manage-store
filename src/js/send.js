const send = async (state, endPoint, method) => {
    const SERVER = "http://localhost:8000";
    let result, res, config;
    method = method.toUpperCase();

    try {
        if(state.token) {
            switch (method) {
                case "POST": {
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

                }
            }
        }else {

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
        // method === "POST" ?
        res = await fetch(SERVER + endPoint, config) ;
        // res = await fetch(SERVER + endPoint);

        let dat = await res.json();

        result =  {...dat}  ;


    } catch (error) {
       console.log(error)
        result={error};
    }

return result

}
export default send;
