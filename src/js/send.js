import authHelper from "./authHelper";

const send = async (state, endPoint, method) => {

  const SERVER = "http://192.168.137.1:8000";
  // const SERVER = "http://localhost:8000";
  let result, res, dat;
  method = method.toUpperCase();

  try {
    if (state.token) {
      switch (method) {
        case "POST":
          {
            const config = {
              method: "POST",
              headers: {
                Accept: "application/json",
                "accept-encoding": "gzip, deflate, br",
                "Content-Type": "application/json",
                Authorization: "Bearer " + authHelper(),
              },
              body: JSON.stringify(state),
            };
            res = await fetch(SERVER + endPoint, config);
            dat = await res.json();
            result = { ...dat };
          }
          break;

        case "FILE":
          {
            const config = {
              method: "POST",
              headers: {
                Accept: "*/*",
                "accept-encoding": "gzip, deflate, br",
                Authorization: "Bearer " + authHelper(),
              },
              body: state.form,
            };
            res = await fetch(SERVER + endPoint, config);
            dat = await res.json();
            result = { ...dat };
          }
          break;
        case "GET":
          {
            const config = {
              method: "GET",
              mode: "cors",
              headers: {
                Accept: "application/json",
                "accept-encoding": "gzip, deflate, br",
                "Content-Type": "application/json",
                Authorization: `Bearer ${state.token}`,
              },
            };
            res = await fetch(SERVER + endPoint, config);
            dat = await res.json();
            result = { ...dat };
          }
          break;
        case "PUT":
          {
            const config = {
              method: "PUT",
              headers: {
                Accept: "application/json",
                "accept-encoding": "gzip, deflate, br",
                "Content-Type": "application/json",
                Authorization: "Bearer " + state.token,
              },
              body: JSON.stringify(state),
            };
            res = await fetch(SERVER + endPoint, config);
            dat = await res.json();
            result = { ...dat };
          }
          break;
        case "PUTFILE":
          {
            const config = {
              method: "PUT",
              headers: {
                Accept: "*/*",
                "accept-encoding": "gzip, deflate, br",
                // "Content-Type": "application/json",
                // "Content-Type": "multipart/form-data",
                Authorization: "Bearer " + state.token,
              },
              body: state.form,
            };
            res = await fetch(SERVER + endPoint, config);
            dat = await res.json();
            result = { ...dat };
          }
          break;
        case "PATCH":
          {
            const config = {
              method: "PATCH",
              headers: {
                Accept: "application/json",
                "accept-encoding": "gzip, deflate, br",
                "Content-Type": "application/json",
                // "Content-Type": "multipart/form-data",
                Authorization: "Bearer " + state.token,
              },
              body: JSON.stringify(state.form),
            };
            res = await fetch(SERVER + endPoint, config);
            dat = await res.json();
            result = { ...dat };
          }
          break;  
        case "DELETE":
          {
            const config = {
              method: "DELETE",
              headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
                Authorization: `Bearer ${state.token}`,
              },
            };
            res = await fetch(SERVER + endPoint, config);
            dat = await JSON.parse(res);
          }
          break;
        default:
          break;
      }
    } else {
      if (method === "FILE") {
        const config = {
          method: "POST",
          headers: {
            Accept: "*/*",
            "accept-encoding": "gzip, deflate, br",
            // "Content-Type": "application/json",
            // "Content-Type": "multipart/form-data",
          },
          // body: state
          body: state.form,
        };
        res = await fetch(SERVER + endPoint, config);
        dat = await res.json();
        result = { ...dat };
      } else if (method === "POST") {
        const config = {
          method: method,
          headers: {
            Accept: "application/json",
            "accept-encoding": "gzip, deflate, br",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(state),
        };
        res = await fetch(SERVER + endPoint, config);
        dat = await res.json();
        result = { ...dat };
      } else {
        const config = {
          method: method,
          headers: {
            Accept: "application/json",
            "accept-encoding": "gzip, deflate, br",
            "Content-Type": "application/json",
          },
        };
        res = await fetch(SERVER + endPoint, config);
        dat = await res.json();
        result = { ...dat };
      }
    }
  } catch (error) {
    // msgNotification("ERROR",error,"error","OK")
    //     .then(r=>{
    //         if (r.value)
    //             result = {error};
    //     })
    result = { error };
  }

  return result;
};
export default send;
